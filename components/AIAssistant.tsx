
import React, { useState, useRef, useEffect } from 'react';
import { Tournament, Location } from '../types';
import { askWithGrounding, askWithThinking } from '../services/geminiService';
import { BotIcon, SendIcon, CloseIcon, LoadingIcon, SearchIcon, BrainIcon } from './Icons';

interface AIAssistantProps {
  selectedTournament: Tournament | null;
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
  sources?: { web?: { uri: string; title: string; }; maps?: { uri: string; title: string; }; }[];
}

const AIAssistant: React.FC<AIAssistantProps> = ({ selectedTournament }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinkingMode, setIsThinkingMode] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  useEffect(() => {
    if (isOpen) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            },
            (error) => {
                console.warn("Could not get user location:", error.message);
            }
        );
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let response;
      if (isThinkingMode) {
        response = await askWithThinking(input);
      } else {
        const location = selectedTournament?.location ?? currentLocation;
        response = await askWithGrounding(input, location);
      }
      
      const botMessage: Message = { sender: 'bot', text: response.text, sources: response.sources };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("Gemini API error:", error);
      const errorMessage: Message = { sender: 'bot', text: 'Sorry, I encountered an error. Please try again.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };
  
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110 z-50"
        aria-label="Open AI Assistant"
      >
        <BotIcon className="w-8 h-8" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-full max-w-md h-[70vh] bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl flex flex-col z-50">
      <header className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
            <BotIcon className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="p-1 rounded-full text-gray-400 hover:bg-gray-700"><CloseIcon className="w-5 h-5"/></button>
      </header>
      
      <div className="flex items-center justify-center p-2 bg-gray-900/50 space-x-4">
        <span className="text-sm font-medium text-gray-200">Mode:</span>
        <div className="flex items-center space-x-2 p-1 bg-gray-700 rounded-full">
            <button onClick={() => setIsThinkingMode(false)} className={`px-3 py-1 text-xs rounded-full flex items-center space-x-1 transition-colors ${!isThinkingMode ? 'bg-green-500 text-white' : 'text-gray-300 hover:bg-gray-600'}`}>
                <SearchIcon className="w-4 h-4" />
                <span>Grounding</span>
            </button>
            <button onClick={() => setIsThinkingMode(true)} className={`px-3 py-1 text-xs rounded-full flex items-center space-x-1 transition-colors ${isThinkingMode ? 'bg-purple-500 text-white' : 'text-gray-300 hover:bg-gray-600'}`}>
                <BrainIcon className="w-4 h-4" />
                <span>Thinking</span>
            </button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-green-600 text-white rounded-br-lg' : 'bg-gray-700 text-white rounded-bl-lg'}`}>
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
               {msg.sources && msg.sources.length > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-600">
                  <h4 className="text-xs font-semibold mb-1 text-gray-300">Sources:</h4>
                  <ul className="space-y-1">
                    {msg.sources.map((source, i) => (
                      <li key={i}>
                        <a href={source.web?.uri || source.maps?.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-green-400 hover:underline break-all">
                          {source.web?.title || source.maps?.title || 'Source Link'}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                <div className="max-w-xs md:max-w-sm px-4 py-2 rounded-2xl bg-gray-700 rounded-bl-lg flex items-center space-x-2">
                    <LoadingIcon className="w-5 h-5 text-green-400 animate-spin" />
                    <span className="text-sm text-gray-300">Thinking...</span>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-700 flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isThinkingMode ? "Ask a complex question..." : "Ask about tournaments, players..."}
          className="flex-1 bg-gray-700 border border-gray-600 rounded-full px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-green-500 p-3 rounded-full text-white disabled:bg-gray-600 hover:bg-green-600 transition-colors">
          <SendIcon className="w-5 h-5"/>
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;
