
import { GoogleGenAI } from "@google/genai";
import { Location } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

interface GroundingChunk {
  web?: { uri: string; title: string; };
  maps?: { uri: string; title: string; };
}

interface GeminiResponse {
    text: string;
    sources: GroundingChunk[];
}

export const askWithGrounding = async (prompt: string, location?: Location | null): Promise<GeminiResponse> => {
    const tools: any[] = [{ googleSearch: {} }];
    const toolConfig: any = {};

    if (location) {
        tools.push({ googleMaps: {} });
        toolConfig.retrievalConfig = {
            latLng: {
                latitude: location.lat,
                longitude: location.lon,
            },
        };
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: tools,
                ...(Object.keys(toolConfig).length > 0 && { toolConfig: toolConfig }),
            },
        });
        
        const text = response.text;
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

        return { text, sources };

    } catch (error) {
        console.error("Error calling Gemini API with grounding:", error);
        throw new Error("Failed to get response from AI service.");
    }
};

export const askWithThinking = async (prompt: string): Promise<GeminiResponse> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                thinkingConfig: { thinkingBudget: 32768 }
            },
        });

        const text = response.text;
        
        return { text, sources: [] }; // No grounding sources in thinking mode

    } catch (error) {
        console.error("Error calling Gemini API with thinking mode:", error);
        throw new Error("Failed to get response from AI service.");
    }
};
