import { Tournament, Player } from '../types';

// Helper data and functions for creating player objects from strings
const playerCountryMap: { [name: string]: string } = {
  'Jannik Sinner': 'ITA',
  'Alexander Zverev': 'GER',
  'Ben Shelton': 'USA',
  'Novak Djokovic': 'SRB',
  'Alex de Minaur': 'AUS',
  'Lorenzo Sonego': 'ITA',
  'Carlos Alcaraz': 'ESP',
  'Tommy Paul': 'USA',
  'Lorenzo Musetti': 'ITA',
  'Alexander Bublik': 'KAZ',
  'Frances Tiafoe': 'USA',
  'Taylor Fritz': 'USA',
  'Flavio Cobolli': 'ITA',
  'Karen Khachanov': 'RUS',
  'Cameron Norrie': 'GBR',
  'Félix Auger-Aliassime': 'CAN',
  'Jiří Lehečka': 'CZE',
  'Daniil Medvedev': 'RUS',
  'Andrey Rublev': 'RUS',
  'Casper Ruud': 'NOR',
  'Hubert Hurkacz': 'POL',
  'Grigor Dimitrov': 'BUL',
  'Stefanos Tsitsipas': 'GRE',
  'Roman Safiullin': 'RUS',
  'Felix Auger-Aliassime': 'CAN', // Alias
  'Nicolas Jarry': 'CHI',
  'Holger Rune': 'DEN',
  'Sebastian Baez': 'ARG',
  'Ugo Humbert': 'FRA',
  'Jan-Lennard Struff': 'GER',
  'Arthur Fils': 'FRA',
  'Alejandro Tabilo': 'CHI',
  'Luciano Darderi': 'ITA',
  'Facundo Diaz Acosta': 'ARG',
  'Matteo Berrettini': 'ITA',
  'Márton Fucsovics': 'HUN',
  'Giovanni Mpetshi Perricard': 'FRA',
  'Jack Draper': 'GBR',
  // New players from masters 1000 data
  'Francisco Cerúndolo': 'ARG',
  'Jakub Menšík': 'CZE',
  'Sebastian Korda': 'USA',
  'Alejandro Davidovich Fokina': 'ESP',
  'Alexei Popyrin': 'AUS',
  'Matteo Arnaldi': 'ITA',
  'Gabriel Diallo': 'CAN',
  'Alex Michelsen': 'USA',
  'Térence Atmane': 'FRA',
  'Valentin Vacherot': 'MON',
  'Arthur Rinderknech': 'FRA',
  'Zizou Bergs': 'BEL',
  // New players from atp 500 data
  'Denis Shapovalov': 'CAN',
  'Jaume Munar': 'ESP',
  'Tomáš Macháč': 'CZE',
  'Reilly Opelka': 'USA',
  'Yoshihito Nishioka': 'JPN',
  'Mattia Bellucci': 'ITA',
  'Pedro Martínez': 'ESP',
  'Daniel Altmaier': 'GER',
  'Alexandre Müller': 'FRA',
  'Francisco Comesaña': 'ARG',
  'Camilo Ugo Carabelli': 'ARG',
  'Tseng Chun-hsin': 'TPE',
  'Jaime Faria': 'POR',
  'Tallon Griekspoor': 'NED',
  'Quentin Halys': 'FRA',
  'Luca Nardi': 'ITA',
  'Marin Čilić': 'CRO',
  'Brandon Nakashima': 'USA',
  'Learner Tien': 'USA',
  'David Goffin': 'BEL',
  'Marcos Giron': 'USA',
  'Rodrigo Pacheco Méndez': 'MEX',
  'Fábián Marozsán': 'HUN',
  'Tomás Martín Etcheverry': 'ARG',
  'Roberto Bautista Agut': 'ESP',
  'Jacob Fearnley': 'GBR',
  'Corentin Moutet': 'FRA',
  'Jenson Brooksby': 'USA',
  'Aleksandar Vukic': 'AUS',
  'João Fonseca': 'BRA',
  'Sebastián Báez': 'ARG',
  // New players from atp 250 data
  'Kei Nishikori': 'JPN',
  'Miomir Kecmanović': 'SRB',
  'Gaël Monfils': 'FRA',
  'Nuno Borges': 'POR',
  'Nishesh Basavareddy': 'USA',
  'Hamad Medjedovic': 'SRB',
  'Laslo Djere': 'SRB',
  'Zachary Svajda': 'USA',
  'Adrian Mannarino': 'FRA',
  'Jesper de Jong': 'NED',
  'Juan Manuel Cerúndolo': 'ARG',
  'Arthur Cazaux': 'FRA',
  'Carlos Taberner': 'ESP',
  'Aleksandar Kovacevic': 'USA',
  'Botic van de Zandschulp': 'NED'
};

const parsePlayerString = (playerString: string): Player => {
  const match = playerString.match(/(.+) \((\d+|Q|WC|LL|PR)\)/);
  let name: string;
  let seed: number | undefined;

  if (match) {
    name = match[1].trim();
    if (!isNaN(parseInt(match[2], 10))) {
        seed = parseInt(match[2], 10);
    }
  } else {
    name = playerString.trim();
  }
  
  const country = playerCountryMap[name] || 'N/A';

  return { name, seed, country };
};

const players = {
  sinner: parsePlayerString('Jannik Sinner (1)'),
  alcaraz: parsePlayerString('Carlos Alcaraz (2)'),
  djokovic: parsePlayerString('Novak Djokovic (7)'),
  zverev: parsePlayerString('Alexander Zverev (2)'),
  medvedev: parsePlayerString('Daniil Medvedev'),
  rublev: parsePlayerString('Andrey Rublev'),
  ruud: parsePlayerString('Casper Ruud'),
  hurkacz: parsePlayerString('Hubert Hurkacz'),
  dimitrov: parsePlayerString('Grigor Dimitrov'),
  tsitsipas: parsePlayerString('Stefanos Tsitsipas'),
  fritz: parsePlayerString('Taylor Fritz (5)'),
  paul: parsePlayerString('Tommy Paul (12)'),
  shelton: parsePlayerString('Ben Shelton (21)'),
};

export const tournaments: Tournament[] = [
  // Grand Slams
  {
    id: 'ao2025',
    name: 'Australian Open',
    locationName: 'Melbourne, Australia',
    startDate: '2025-01-12',
    endDate: '2025-01-26',
    points: 2000,
    winner: parsePlayerString('Jannik Sinner (1)').name,
    location: { lat: -37.82, lon: 144.97 },
    draw: [
      { id: 'ao-qf1', round: 3, player1: parsePlayerString("Jannik Sinner (1)"), player2: parsePlayerString("Alex de Minaur (8)"), winner: parsePlayerString("Jannik Sinner (1)").name, score: "6-3, 6-2, 6-1" },
      { id: 'ao-qf2', round: 3, player1: parsePlayerString("Ben Shelton (21)"), player2: parsePlayerString("Lorenzo Sonego"), winner: parsePlayerString("Ben Shelton (21)").name, score: "6-4, 7-5, 4-6, 7-6(4)" },
      { id: 'ao-qf3', round: 3, player1: parsePlayerString("Novak Djokovic (7)"), player2: parsePlayerString("Carlos Alcaraz (3)"), winner: parsePlayerString("Novak Djokovic (7)").name, score: "4-6, 6-4, 6-3, 6-4" },
      { id: 'ao-qf4', round: 3, player1: parsePlayerString("Alexander Zverev (2)"), player2: parsePlayerString("Tommy Paul (12)"), winner: parsePlayerString("Alexander Zverev (2)").name, score: "7-6(1), 7-6(0), 2-6, 6-1" },
      { id: 'ao-sf1', round: 2, player1: parsePlayerString("Jannik Sinner (1)"), player2: parsePlayerString("Ben Shelton (21)"), winner: parsePlayerString("Jannik Sinner (1)").name, score: "7-6(2), 6-2, 6-2" },
      { id: 'ao-sf2', round: 2, player1: parsePlayerString("Alexander Zverev (2)"), player2: parsePlayerString("Novak Djokovic (7)"), winner: parsePlayerString("Alexander Zverev (2)").name, score: "7-6(5), Retired" },
      { id: 'ao-f1', round: 1, player1: parsePlayerString("Jannik Sinner (1)"), player2: parsePlayerString("Alexander Zverev (2)"), winner: parsePlayerString("Jannik Sinner (1)").name, score: "6–3, 7–6, 6–3" },
    ],
  },
  {
    id: 'rg2025',
    name: 'Roland-Garros',
    locationName: 'Paris, France',
    startDate: '2025-05-25',
    endDate: '2025-06-08',
    points: 2000,
    winner: parsePlayerString('Carlos Alcaraz (2)').name,
    location: { lat: 48.84, lon: 2.24 },
    draw: [
        { id: 'rg-qf1', round: 3, player1: parsePlayerString("Jannik Sinner (1)"), player2: parsePlayerString("Alexander Bublik"), winner: parsePlayerString("Jannik Sinner (1)").name, score: "6-1, 7-5, 6-0" },
        { id: 'rg-qf2', round: 3, player1: parsePlayerString("Novak Djokovic (6)"), player2: parsePlayerString("Alexander Zverev (3)"), winner: parsePlayerString("Novak Djokovic (6)").name, score: "4-6, 6-3, 6-2, 6-4" },
        { id: 'rg-qf3', round: 3, player1: parsePlayerString("Lorenzo Musetti (8)"), player2: parsePlayerString("Frances Tiafoe (15)"), winner: parsePlayerString("Lorenzo Musetti (8)").name, score: "6-2, 4-6, 7-5, 6-2" },
        { id: 'rg-qf4', round: 3, player1: parsePlayerString("Carlos Alcaraz (2)"), player2: parsePlayerString("Tommy Paul (12)"), winner: parsePlayerString("Carlos Alcaraz (2)").name, score: "6-0, 6-1, 6-4" },
        { id: 'rg-sf1', round: 2, player1: parsePlayerString("Jannik Sinner (1)"), player2: parsePlayerString("Novak Djokovic (6)"), winner: parsePlayerString("Jannik Sinner (1)").name, score: "6-4, 7-5, 7-6" },
        { id: 'rg-sf2', round: 2, player1: parsePlayerString("Carlos Alcaraz (2)"), player2: parsePlayerString("Lorenzo Musetti (8)"), winner: parsePlayerString("Carlos Alcaraz (2)").name, score: "4-6, 7-6, 6-0, 2-0 (Walkover)" },
        { id: 'rg-f1', round: 1, player1: parsePlayerString("Carlos Alcaraz (2)"), player2: parsePlayerString("Jannik Sinner (1)"), winner: parsePlayerString("Carlos Alcaraz (2)").name, score: "4–6, 6–7, 6–4, 7–6, 7–6" },
    ],
  },
  {
    id: 'wim2025',
    name: 'Wimbledon',
    locationName: 'London, UK',
    startDate: '2025-06-30',
    endDate: '2025-07-13',
    points: 2000,
    winner: parsePlayerString('Jannik Sinner (1)').name,
    location: { lat: 51.43, lon: -0.21 },
    draw: [
        { id: 'wim-qf1', round: 3, player1: parsePlayerString("Jannik Sinner (1)"), player2: parsePlayerString("Ben Shelton (10)"), winner: parsePlayerString("Jannik Sinner (1)").name, score: "7-6(2), 6-4, 6-4" },
        { id: 'wim-qf2', round: 3, player1: parsePlayerString("Novak Djokovic (6)"), player2: parsePlayerString("Flavio Cobolli (22)"), winner: parsePlayerString("Novak Djokovic (6)").name, score: "6-7(6), 6-2, 7-5, 6-4" },
        { id: 'wim-qf3', round: 3, player1: parsePlayerString("Taylor Fritz (5)"), player2: parsePlayerString("Karen Khachanov (17)"), winner: parsePlayerString("Taylor Fritz (5)").name, score: "6-3, 6-4, 1-6, 7-6(4)" },
        { id: 'wim-qf4', round: 3, player1: parsePlayerString("Carlos Alcaraz (2)"), player2: parsePlayerString("Cameron Norrie"), winner: parsePlayerString("Carlos Alcaraz (2)").name, score: "6-2, 6-3, 6-3" },
        { id: 'wim-sf1', round: 2, player1: parsePlayerString("Jannik Sinner (1)"), player2: parsePlayerString("Novak Djokovic (6)"), winner: parsePlayerString("Jannik Sinner (1)").name, score: "6-3, 6-3, 6-4" },
        { id: 'wim-sf2', round: 2, player1: parsePlayerString("Carlos Alcaraz (2)"), player2: parsePlayerString("Taylor Fritz (5)"), winner: parsePlayerString("Carlos Alcaraz (2)").name, score: "6-4, 5-7, 6-3, 7-6(6)" },
        { id: 'wim-f1', round: 1, player1: parsePlayerString("Jannik Sinner (1)"), player2: parsePlayerString("Carlos Alcaraz (2)"), winner: parsePlayerString("Jannik Sinner (1)").name, score: "4-6, 6-4, 6-4, 6-4" },
    ],
  },
  {
    id: 'us2025',
    name: 'US Open',
    locationName: 'New York, USA',
    startDate: '2025-08-25',
    endDate: '2025-09-07',
    points: 2000,
    winner: parsePlayerString('Carlos Alcaraz (2)').name,
    location: { lat: 40.75, lon: -73.84 },
    draw: [
        { id: 'us-qf1', round: 3, player1: parsePlayerString("Jannik Sinner (1)"), player2: parsePlayerString("Lorenzo Musetti (10)"), winner: parsePlayerString("Jannik Sinner (1)").name, score: "6-1, 6-4, 6-2" },
        { id: 'us-qf2', round: 3, player1: parsePlayerString("Félix Auger-Aliassime (25)"), player2: parsePlayerString("Alex de Minaur (8)"), winner: parsePlayerString("Félix Auger-Aliassime (25)").name, score: "4-6, 7-6(7), 7-5, 7-6(4)" },
        { id: 'us-qf3', round: 3, player1: parsePlayerString("Novak Djokovic (7)"), player2: parsePlayerString("Taylor Fritz (4)"), winner: parsePlayerString("Novak Djokovic (7)").name, score: "6-3, 7-5, 3-6, 6-4" },
        { id: 'us-qf4', round: 3, player1: parsePlayerString("Carlos Alcaraz (2)"), player2: parsePlayerString("Jiří Lehečka (20)"), winner: parsePlayerString("Carlos Alcaraz (2)").name, score: "6-4, 6-2, 6-4" },
        { id: 'us-sf1', round: 2, player1: parsePlayerString("Jannik Sinner (1)"), player2: parsePlayerString("Félix Auger-Aliassime (25)"), winner: parsePlayerString("Jannik Sinner (1)").name, score: "6-1, 3-6, 6-3, 6-4" },
        { id: 'us-sf2', round: 2, player1: parsePlayerString("Carlos Alcaraz (2)"), player2: parsePlayerString("Novak Djokovic (7)"), winner: parsePlayerString("Carlos Alcaraz (2)").name, score: "6-4, 7-6(4), 6-2" },
        { id: 'us-f1', round: 1, player1: parsePlayerString("Carlos Alcaraz (2)"), player2: parsePlayerString("Jannik Sinner (1)"), winner: parsePlayerString("Carlos Alcaraz (2)").name, score: "6–2, 3–6, 6–1, 6–4" },
    ],
  },
  // ATP Masters 1000
  {
    id: 'iw2025',
    name: 'BNP Paribas Open',
    locationName: 'Indian Wells, USA',
    startDate: '2025-03-05',
    endDate: '2025-03-16',
    points: 1000,
    winner: parsePlayerString('Jack Draper (13)').name,
    location: { lat: 33.72, lon: -116.30 },
    draw: [
      { id: 'iw-qf1', round: 3, player1: parsePlayerString('Jack Draper (13)'), player2: parsePlayerString('Ben Shelton (11)'), winner: parsePlayerString('Jack Draper (13)').name, score: '6-4, 6-3' },
      { id: 'iw-qf2', round: 3, player1: parsePlayerString('Carlos Alcaraz (2)'), player2: parsePlayerString('Francisco Cerúndolo (25)'), winner: parsePlayerString('Carlos Alcaraz (2)').name, score: '6-2, 6-1' },
      { id: 'iw-qf3', round: 3, player1: parsePlayerString('Holger Rune (12)'), player2: parsePlayerString('Arthur Fils (20)'), winner: parsePlayerString('Holger Rune (12)').name, score: '6-4, 6-7(7), 6-4' },
      { id: 'iw-qf4', round: 3, player1: parsePlayerString('Daniil Medvedev (5)'), player2: parsePlayerString('Tommy Paul (10)'), winner: parsePlayerString('Daniil Medvedev (5)').name, score: '6-4, 2-6, 7-6(7)' },
      { id: 'iw-sf1', round: 2, player1: parsePlayerString('Jack Draper (13)'), player2: parsePlayerString('Carlos Alcaraz (2)'), winner: parsePlayerString('Jack Draper (13)').name, score: '7-6(5), 6-4' },
      { id: 'iw-sf2', round: 2, player1: parsePlayerString('Holger Rune (12)'), player2: parsePlayerString('Daniil Medvedev (5)'), winner: parsePlayerString('Holger Rune (12)').name, score: '7-5, 6-2' },
      { id: 'iw-f1', round: 1, player1: parsePlayerString('Jack Draper (13)'), player2: parsePlayerString('Holger Rune (12)'), winner: parsePlayerString('Jack Draper (13)').name, score: '6–2, 6–2' },
    ],
  },
  {
    id: 'mo2025',
    name: 'Miami Open',
    locationName: 'Miami, USA',
    startDate: '2025-03-19',
    endDate: '2025-03-30',
    points: 1000,
    winner: parsePlayerString('Jakub Menšík').name,
    location: { lat: 25.95, lon: -80.23 },
    draw: [
        { id: 'mo-qf1', round: 3, player1: parsePlayerString('Jakub Menšík'), player2: parsePlayerString('Arthur Fils (17)'), winner: parsePlayerString('Jakub Menšík').name, score: '7-5, 6-4' },
        { id: 'mo-qf2', round: 3, player1: parsePlayerString('Taylor Fritz (3)'), player2: parsePlayerString('Matteo Berrettini (29)'), winner: parsePlayerString('Taylor Fritz (3)').name, score: '5-7, 7-6(4), 7-5' },
        { id: 'mo-qf3', round: 3, player1: parsePlayerString('Novak Djokovic (4)'), player2: parsePlayerString('Francisco Cerúndolo (23)'), winner: parsePlayerString('Novak Djokovic (4)').name, score: '7-5, 4-6, 6-4' },
        { id: 'mo-qf4', round: 3, player1: parsePlayerString('Grigor Dimitrov (14)'), player2: parsePlayerString('Sebastian Korda (24)'), winner: parsePlayerString('Grigor Dimitrov (14)').name, score: '6-3, 6-7(4), 7-6(5)' },
        { id: 'mo-sf1', round: 2, player1: parsePlayerString('Jakub Menšík'), player2: parsePlayerString('Taylor Fritz (3)'), winner: parsePlayerString('Jakub Menšík').name, score: '7-6(4), 4-6, 7-6(4)' },
        { id: 'mo-sf2', round: 2, player1: parsePlayerString('Novak Djokovic (4)'), player2: parsePlayerString('Grigor Dimitrov (14)'), winner: parsePlayerString('Novak Djokovic (4)').name, score: '6-2, 6-3' },
        { id: 'mo-f1', round: 1, player1: parsePlayerString('Jakub Menšík'), player2: parsePlayerString('Novak Djokovic (4)'), winner: parsePlayerString('Jakub Menšík').name, score: '7–6(4), 7–6(4)' },
    ],
  },
  {
    id: 'mc2025',
    name: 'Rolex Monte-Carlo Masters',
    locationName: 'Monte Carlo, Monaco',
    startDate: '2025-04-06',
    endDate: '2025-04-13',
    points: 1000,
    winner: parsePlayerString('Carlos Alcaraz (2)').name,
    location: { lat: 43.73, lon: 7.42 },
    draw: [
        { id: 'mc-qf1', round: 3, player1: parsePlayerString('Carlos Alcaraz (2)'), player2: parsePlayerString('Arthur Fils (12)'), winner: parsePlayerString('Carlos Alcaraz (2)').name, score: '4-6, 7-5, 6-3' },
        { id: 'mc-qf2', round: 3, player1: parsePlayerString('Alejandro Davidovich Fokina'), player2: parsePlayerString('Alexei Popyrin'), winner: parsePlayerString('Alejandro Davidovich Fokina').name, score: '6-3, 2-6, 7-6(6)' },
        { id: 'mc-qf3', round: 3, player1: parsePlayerString('Lorenzo Musetti (13)'), player2: parsePlayerString('Stefanos Tsitsipas (6)'), winner: parsePlayerString('Lorenzo Musetti (13)').name, score: '1-6, 6-3, 6-4' },
        { id: 'mc-qf4', round: 3, player1: parsePlayerString('Alex de Minaur (8)'), player2: parsePlayerString('Grigor Dimitrov (15)'), winner: parsePlayerString('Alex de Minaur (8)').name, score: '6-0, 6-0' },
        { id: 'mc-sf1', round: 2, player1: parsePlayerString('Carlos Alcaraz (2)'), player2: parsePlayerString('Alejandro Davidovich Fokina'), winner: parsePlayerString('Carlos Alcaraz (2)').name, score: '7-5, 6-4' },
        { id: 'mc-sf2', round: 2, player1: parsePlayerString('Lorenzo Musetti (13)'), player2: parsePlayerString('Alex de Minaur (8)'), winner: parsePlayerString('Lorenzo Musetti (13)').name, score: '1-6, 6-4, 7-6(4)' },
        { id: 'mc-f1', round: 1, player1: parsePlayerString('Carlos Alcaraz (2)'), player2: parsePlayerString('Lorenzo Musetti (13)'), winner: parsePlayerString('Carlos Alcaraz (2)').name, score: '3–6, 6–1, 6–0' },
    ],
  },
  { id: 'madrid2025', name: 'Mutua Madrid Open', locationName: 'Madrid, Spain', startDate: '2025-04-23', endDate: '2025-05-04', points: 1000, winner: parsePlayerString('Casper Ruud (14)').name, location: { lat: 40.41, lon: -3.70 }, draw: [
    { id: 'mad-qf1', round: 3, player1: parsePlayerString('Casper Ruud (14)'), player2: parsePlayerString('Daniil Medvedev (9)'), winner: parsePlayerString('Casper Ruud (14)').name, score: '7-6(4), 6-4' },
    { id: 'mad-qf2', round: 3, player1: parsePlayerString('Francisco Cerúndolo (20)'), player2: parsePlayerString('Jakub Menšík (22)'), winner: parsePlayerString('Francisco Cerúndolo (20)').name, score: '7-6(5), 7-5' },
    { id: 'mad-qf3', round: 3, player1: parsePlayerString('Jack Draper (5)'), player2: parsePlayerString('Matteo Arnaldi'), winner: parsePlayerString('Jack Draper (5)').name, score: '7-6(2), 6-4' },
    { id: 'mad-qf4', round: 3, player1: parsePlayerString('Lorenzo Musetti (10)'), player2: parsePlayerString('Gabriel Diallo (Q)'), winner: parsePlayerString('Lorenzo Musetti (10)').name, score: '6-4, 6-3' },
    { id: 'mad-sf1', round: 2, player1: parsePlayerString('Casper Ruud (14)'), player2: parsePlayerString('Francisco Cerúndolo (20)'), winner: parsePlayerString('Casper Ruud (14)').name, score: '6-4, 7-5' },
    { id: 'mad-sf2', round: 2, player1: parsePlayerString('Jack Draper (5)'), player2: parsePlayerString('Lorenzo Musetti (10)'), winner: parsePlayerString('Jack Draper (5)').name, score: '6-4, 7-6(5)' },
    { id: 'mad-f1', round: 1, player1: parsePlayerString('Casper Ruud (14)'), player2: parsePlayerString('Jack Draper (5)'), winner: parsePlayerString('Casper Ruud (14)').name, score: '7–5, 3–6, 6–4' },
  ] },
  { id: 'rome2025', name: 'Internazionali BNL d\'Italia', locationName: 'Rome, Italy', startDate: '2025-05-07', endDate: '2025-05-18', points: 1000, winner: parsePlayerString('Carlos Alcaraz (3)').name, location: { lat: 41.90, lon: 12.49 }, draw: [
    { id: 'rome-qf1', round: 3, player1: parsePlayerString('Jannik Sinner (1)'), player2: parsePlayerString('Casper Ruud (6)'), winner: parsePlayerString('Jannik Sinner (1)').name, score: '7-6(2), 6-3' },
    { id: 'rome-qf2', round: 3, player1: parsePlayerString('Tommy Paul (11)'), player2: parsePlayerString('Hubert Hurkacz (30)'), winner: parsePlayerString('Tommy Paul (11)').name, score: '6-4, 7-6(6)' },
    { id: 'rome-qf3', round: 3, player1: parsePlayerString('Carlos Alcaraz (3)'), player2: parsePlayerString('Jack Draper (5)'), winner: parsePlayerString('Carlos Alcaraz (3)').name, score: '6-4, 7-6(4)' },
    { id: 'rome-qf4', round: 3, player1: parsePlayerString('Lorenzo Musetti (8)'), player2: parsePlayerString('Alexander Zverev (2)'), winner: parsePlayerString('Lorenzo Musetti (8)').name, score: '7-6(1), 6-1' },
    { id: 'rome-sf1', round: 2, player1: parsePlayerString('Jannik Sinner (1)'), player2: parsePlayerString('Tommy Paul (11)'), winner: parsePlayerString('Jannik Sinner (1)').name, score: '6-4, 6-4' },
    { id: 'rome-sf2', round: 2, player1: parsePlayerString('Carlos Alcaraz (3)'), player2: parsePlayerString('Lorenzo Musetti (8)'), winner: parsePlayerString('Carlos Alcaraz (3)').name, score: '6-3, 6-3' },
    { id: 'rome-f1', round: 1, player1: parsePlayerString('Carlos Alcaraz (3)'), player2: parsePlayerString('Jannik Sinner (1)'), winner: parsePlayerString('Carlos Alcaraz (3)').name, score: '7–6(5), 6–1' },
  ] },
  { id: 'canada2025', name: 'National Bank Open', locationName: 'Montreal, Canada', startDate: '2025-07-27', endDate: '2025-08-03', points: 1000, winner: parsePlayerString('Ben Shelton (4)').name, location: { lat: 45.50, lon: -73.56 }, draw: [
    { id: 'can-qf1', round: 3, player1: parsePlayerString('Ben Shelton (4)'), player2: parsePlayerString('Alex de Minaur (9)'), winner: parsePlayerString('Ben Shelton (4)').name, score: '6-4, 7-6(3)' },
    { id: 'can-qf2', round: 3, player1: parsePlayerString('Alexander Zverev (1)'), player2: parsePlayerString('Alexei Popyrin (18)'), winner: parsePlayerString('Alexander Zverev (1)').name, score: '6-4, 6-4' },
    { id: 'can-qf3', round: 3, player1: parsePlayerString('Karen Khachanov (11)'), player2: parsePlayerString('Alex Michelsen (26)'), winner: parsePlayerString('Karen Khachanov (11)').name, score: '6-4, 7-6(4)' },
    { id: 'can-qf4', round: 3, player1: parsePlayerString('Taylor Fritz (2)'), player2: parsePlayerString('Andrey Rublev (6)'), winner: parsePlayerString('Taylor Fritz (2)').name, score: '7-6(4), 6-4' },
    { id: 'can-sf1', round: 2, player1: parsePlayerString('Ben Shelton (4)'), player2: parsePlayerString('Alexander Zverev (1)'), winner: parsePlayerString('Ben Shelton (4)').name, score: '6-4, 6-4' },
    { id: 'can-sf2', round: 2, player1: parsePlayerString('Karen Khachanov (11)'), player2: parsePlayerString('Taylor Fritz (2)'), winner: parsePlayerString('Karen Khachanov (11)').name, score: '6-4, 7-5' },
    { id: 'can-f1', round: 1, player1: parsePlayerString('Ben Shelton (4)'), player2: parsePlayerString('Karen Khachanov (11)'), winner: parsePlayerString('Ben Shelton (4)').name, score: '6–7(6), 6–4, 7–6(3)' },
  ] },
  { id: 'cincy2025', name: 'Cincinnati Open', locationName: 'Cincinnati, USA', startDate: '2025-08-10', endDate: '2025-08-17', points: 1000, winner: parsePlayerString('Carlos Alcaraz (2)').name, location: { lat: 39.10, lon: -84.51 }, draw: [
    { id: 'cin-qf1', round: 3, player1: parsePlayerString('Jannik Sinner (1)'), player2: parsePlayerString('Félix Auger-Aliassime (23)'), winner: parsePlayerString('Jannik Sinner (1)').name, score: '6-4, 6-4' },
    { id: 'cin-qf2', round: 3, player1: parsePlayerString('Térence Atmane (Q)'), player2: parsePlayerString('Holger Rune (7)'), winner: parsePlayerString('Térence Atmane (Q)').name, score: '6-3, 7-6(5)' },
    { id: 'cin-qf3', round: 3, player1: parsePlayerString('Carlos Alcaraz (2)'), player2: parsePlayerString('Andrey Rublev (9)'), winner: parsePlayerString('Carlos Alcaraz (2)').name, score: '6-2, 6-4' },
    { id: 'cin-qf4', round: 3, player1: parsePlayerString('Alexander Zverev (3)'), player2: parsePlayerString('Ben Shelton (5)'), winner: parsePlayerString('Alexander Zverev (3)').name, score: '6-4, 6-4' },
    { id: 'cin-sf1', round: 2, player1: parsePlayerString('Jannik Sinner (1)'), player2: parsePlayerString('Térence Atmane (Q)'), winner: parsePlayerString('Jannik Sinner (1)').name, score: '7-6(4), 6-2' },
    { id: 'cin-sf2', round: 2, player1: parsePlayerString('Carlos Alcaraz (2)'), player2: parsePlayerString('Alexander Zverev (3)'), winner: parsePlayerString('Carlos Alcaraz (2)').name, score: '6-4, 6-3' },
    { id: 'cin-f1', round: 1, player1: parsePlayerString('Carlos Alcaraz (2)'), player2: parsePlayerString('Jannik Sinner (1)'), winner: parsePlayerString('Carlos Alcaraz (2)').name, score: '5–0 (Retired)' },
  ] },
  { id: 'shanghai2025', name: 'Rolex Shanghai Masters', locationName: 'Shanghai, China', startDate: '2025-10-01', endDate: '2025-10-12', points: 1000, winner: parsePlayerString('Valentin Vacherot (Q)').name, location: { lat: 31.23, lon: 121.47 }, draw: [
    { id: 'sh-qf1', round: 3, player1: parsePlayerString('Valentin Vacherot (Q)'), player2: parsePlayerString('Holger Rune (10)'), winner: parsePlayerString('Valentin Vacherot (Q)').name, score: '7-6(4), 6-4' },
    { id: 'sh-qf2', round: 3, player1: parsePlayerString('Novak Djokovic (4)'), player2: parsePlayerString('Zizou Bergs'), winner: parsePlayerString('Novak Djokovic (4)').name, score: '7-5, 6-3' },
    { id: 'sh-qf3', round: 3, player1: parsePlayerString('Arthur Rinderknech'), player2: parsePlayerString('Félix Auger-Aliassime (12)'), winner: parsePlayerString('Arthur Rinderknech').name, score: '6-4, 7-6(4)' },
    { id: 'sh-qf4', round: 3, player1: parsePlayerString('Daniil Medvedev (16)'), player2: parsePlayerString('Alex de Minaur (7)'), winner: parsePlayerString('Daniil Medvedev (16)').name, score: '7-5, 6-4' },
    { id: 'sh-sf1', round: 2, player1: parsePlayerString('Valentin Vacherot (Q)'), player2: parsePlayerString('Novak Djokovic (4)'), winner: parsePlayerString('Valentin Vacherot (Q)').name, score: '7-6(5), 6-4' },
    { id: 'sh-sf2', round: 2, player1: parsePlayerString('Arthur Rinderknech'), player2: parsePlayerString('Daniil Medvedev (16)'), winner: parsePlayerString('Arthur Rinderknech').name, score: '6-4, 7-6(3)' },
    { id: 'sh-f1', round: 1, player1: parsePlayerString('Valentin Vacherot (Q)'), player2: parsePlayerString('Arthur Rinderknech'), winner: parsePlayerString('Valentin Vacherot (Q)').name, score: '4–6, 6–3, 6–3' },
  ] },
  { id: 'paris2025', name: 'Rolex Paris Masters', locationName: 'Paris, France', startDate: '2025-10-27', endDate: '2025-11-02', points: 1000, winner: parsePlayerString('Jannik Sinner (2)').name, location: { lat: 48.85, lon: 2.35 }, draw: [
    { id: 'par-qf1', round: 3, player1: parsePlayerString('Jannik Sinner (2)'), player2: parsePlayerString('Ben Shelton (5)'), winner: parsePlayerString('Jannik Sinner (2)').name, score: '7-5, 6-3' },
    { id: 'par-qf2', round: 3, player1: parsePlayerString('Alexander Zverev (3)'), player2: parsePlayerString('Daniil Medvedev (11)'), winner: parsePlayerString('Alexander Zverev (3)').name, score: '6-4, 6-7(5), 6-4' },
    { id: 'par-qf3', round: 3, player1: parsePlayerString('Félix Auger-Aliassime (9)'), player2: parsePlayerString('Valentin Vacherot (WC)'), winner: parsePlayerString('Félix Auger-Aliassime (9)').name, score: '6-2, 6-2' },
    { id: 'par-qf4', round: 3, player1: parsePlayerString('Alexander Bublik (13)'), player2: parsePlayerString('Alex de Minaur (6)'), winner: parsePlayerString('Alexander Bublik (13)').name, score: '7-6(1), 6-4' },
    { id: 'par-sf1', round: 2, player1: parsePlayerString('Jannik Sinner (2)'), player2: parsePlayerString('Alexander Zverev (3)'), winner: parsePlayerString('Jannik Sinner (2)').name, score: '6-0, 6-1' },
    { id: 'par-sf2', round: 2, player1: parsePlayerString('Félix Auger-Aliassime (9)'), player2: parsePlayerString('Alexander Bublik (13)'), winner: parsePlayerString('Félix Auger-Aliassime (9)').name, score: '7-6(3), 6-4' },
    { id: 'par-f1', round: 1, player1: parsePlayerString('Jannik Sinner (2)'), player2: parsePlayerString('Félix Auger-Aliassime (9)'), winner: parsePlayerString('Jannik Sinner (2)').name, score: '6–4, 7–6(4)' },
  ] },
  // ATP Finals
  {
    id: 'atpfinals2025',
    name: 'Nitto ATP Finals',
    locationName: 'Turin, Italy',
    startDate: '2025-11-09',
    endDate: '2025-11-16',
    points: 1500,
    winner: null,
    location: { lat: 45.07, lon: 7.68 },
    draw: [],
  },
  // ATP 500
  { 
    id: 'dallas500-2025', 
    name: 'Dallas Open', 
    locationName: 'Dallas, USA', 
    startDate: '2025-02-03', 
    endDate: '2025-02-09', 
    points: 500, 
    winner: parsePlayerString('Denis Shapovalov').name, 
    location: { lat: 32.77, lon: -96.79 }, 
    draw: [
        {id: 'dal-qf1', round: 3, player1: parsePlayerString('Denis Shapovalov'), player2: parsePlayerString('Tomáš Macháč (6)'), winner: parsePlayerString('Denis Shapovalov').name, score: '6-3, 7-6(4)'},
        {id: 'dal-qf2', round: 3, player1: parsePlayerString('Tommy Paul (3)'), player2: parsePlayerString('Reilly Opelka (WC)'), winner: parsePlayerString('Tommy Paul (3)').name, score: '7-6(2), 6-7(4), 6-4'},
        {id: 'dal-qf3', round: 3, player1: parsePlayerString('Jaume Munar'), player2: parsePlayerString('Matteo Arnaldi (8)'), winner: parsePlayerString('Jaume Munar').name, score: '6-3, 6-2'},
        {id: 'dal-qf4', round: 3, player1: parsePlayerString('Casper Ruud (2)'), player2: parsePlayerString('Yoshihito Nishioka'), winner: parsePlayerString('Casper Ruud (2)').name, score: '6-3, 6-2'},
        {id: 'dal-sf1', round: 2, player1: parsePlayerString('Denis Shapovalov'), player2: parsePlayerString('Tommy Paul (3)'), winner: parsePlayerString('Denis Shapovalov').name, score: '7-5, 6-3'},
        {id: 'dal-sf2', round: 2, player1: parsePlayerString('Casper Ruud (2)'), player2: parsePlayerString('Jaume Munar'), winner: parsePlayerString('Casper Ruud (2)').name, score: '6-2, 2-6, 7-6(4)'},
        {id: 'dal-f1', round: 1, player1: parsePlayerString('Denis Shapovalov'), player2: parsePlayerString('Casper Ruud (2)'), winner: parsePlayerString('Denis Shapovalov').name, score: '7–6(5), 6–3'},
    ] 
  },
  { 
    id: 'rotterdam2025', 
    name: 'ABN AMRO Open', 
    locationName: 'Rotterdam, Netherlands', 
    startDate: '2025-02-03', 
    endDate: '2025-02-09', 
    points: 500, 
    winner: parsePlayerString('Carlos Alcaraz (1)').name,
    location: { lat: 51.92, lon: 4.47 }, 
    draw: [
        {id: 'rot-qf1', round: 3, player1: parsePlayerString('Carlos Alcaraz (1)'), player2: parsePlayerString('Pedro Martínez'), winner: parsePlayerString('Carlos Alcaraz (1)').name, score: '6-2, 6-2'},
        {id: 'rot-qf2', round: 3, player1: parsePlayerString('Hubert Hurkacz (8)'), player2: parsePlayerString('Andrey Rublev (4)'), winner: parsePlayerString('Hubert Hurkacz (8)').name, score: '7-6(5), 4-6, 6-3'},
        {id: 'rot-qf3', round: 3, player1: parsePlayerString('Alex de Minaur (3)'), player2: parsePlayerString('Daniel Altmaier (LL)'), winner: parsePlayerString('Alex de Minaur (3)').name, score: '6-3, 6-1'},
        {id: 'rot-qf4', round: 3, player1: parsePlayerString('Mattia Bellucci (Q)'), player2: parsePlayerString('Stefanos Tsitsipas (6)'), winner: parsePlayerString('Mattia Bellucci (Q)').name, score: '7-6(8), 6-7(6), 6-3'},
        {id: 'rot-sf1', round: 2, player1: parsePlayerString('Carlos Alcaraz (1)'), player2: parsePlayerString('Hubert Hurkacz (8)'), winner: parsePlayerString('Carlos Alcaraz (1)').name, score: '6-4, 7-6(7)'},
        {id: 'rot-sf2', round: 2, player1: parsePlayerString('Alex de Minaur (3)'), player2: parsePlayerString('Mattia Bellucci (Q)'), winner: parsePlayerString('Alex de Minaur (3)').name, score: '6-2, 6-1'},
        {id: 'rot-f1', round: 1, player1: parsePlayerString('Carlos Alcaraz (1)'), player2: parsePlayerString('Alex de Minaur (3)'), winner: parsePlayerString('Carlos Alcaraz (1)').name, score: '6–4, 3–6, 6–2'},
    ] 
  },
  { 
    id: 'rio2025', 
    name: 'Rio Open', 
    locationName: 'Rio de Janeiro, Brazil', 
    startDate: '2025-02-17', 
    endDate: '2025-02-23', 
    points: 500, 
    winner: parsePlayerString('Sebastián Báez (5)').name, 
    location: { lat: -22.90, lon: -43.17 }, 
    draw: [
        {id: 'rio-qf1', round: 3, player1: parsePlayerString('Francisco Comesaña'), player2: parsePlayerString('Alexander Zverev (1)'), winner: parsePlayerString('Francisco Comesaña').name, score: '4-6, 6-3, 6-4'},
        {id: 'rio-qf2', round: 3, player1: parsePlayerString('Alexandre Müller'), player2: parsePlayerString('Francisco Cerúndolo (4)'), winner: parsePlayerString('Alexandre Müller').name, score: '7-5, 6-1'},
        {id: 'rio-qf3', round: 3, player1: parsePlayerString('Sebastián Báez (5)'), player2: parsePlayerString('Tseng Chun-hsin (Q)'), winner: parsePlayerString('Sebastián Báez (5)').name, score: '6-4, 6-1'},
        {id: 'rio-qf4', round: 3, player1: parsePlayerString('Camilo Ugo Carabelli (LL)'), player2: parsePlayerString('Jaime Faria (LL)'), winner: parsePlayerString('Camilo Ugo Carabelli (LL)').name, score: '7-6(6), 6-4'},
        {id: 'rio-sf1', round: 2, player1: parsePlayerString('Alexandre Müller'), player2: parsePlayerString('Francisco Comesaña'), winner: parsePlayerString('Alexandre Müller').name, score: '7-6(3), 6-3'},
        {id: 'rio-sf2', round: 2, player1: parsePlayerString('Sebastián Báez (5)'), player2: parsePlayerString('Camilo Ugo Carabelli (LL)'), winner: parsePlayerString('Sebastián Báez (5)').name, score: '6-1, 6-1'},
        {id: 'rio-f1', round: 1, player1: parsePlayerString('Sebastián Báez (5)'), player2: parsePlayerString('Alexandre Müller'), winner: parsePlayerString('Sebastián Báez (5)').name, score: '6–2, 6–3'},
    ]
  },
  { 
    id: 'doha500-2025', 
    name: 'Qatar ExxonMobil Open', 
    locationName: 'Doha, Qatar', 
    startDate: '2025-02-17', 
    endDate: '2025-02-23', 
    points: 500, 
    winner: parsePlayerString('Andrey Rublev (5)').name, 
    location: { lat: 25.28, lon: 51.53 }, 
    draw: [
        {id: 'doha-qf1', round: 3, player1: parsePlayerString('Jiří Lehečka'), player2: parsePlayerString('Carlos Alcaraz (1)'), winner: parsePlayerString('Jiří Lehečka').name, score: '7-6(4), 7-6(5)'},
        {id: 'doha-qf2', round: 3, player1: parsePlayerString('Jack Draper (8)'), player2: parsePlayerString('Matteo Berrettini'), winner: parsePlayerString('Jack Draper (8)').name, score: '6-4, 6-3'},
        {id: 'doha-qf3', round: 3, player1: parsePlayerString('Félix Auger-Aliassime'), player2: parsePlayerString('Daniil Medvedev (4)'), winner: parsePlayerString('Félix Auger-Aliassime').name, score: '7-5, 7-6(5), Retired'},
        {id: 'doha-qf4', round: 3, player1: parsePlayerString('Andrey Rublev (5)'), player2: parsePlayerString('Alex de Minaur (2)'), winner: parsePlayerString('Andrey Rublev (5)').name, score: '1-6, 7-6(8), 6-4'},
        {id: 'doha-sf1', round: 2, player1: parsePlayerString('Jack Draper (8)'), player2: parsePlayerString('Jiří Lehečka'), winner: parsePlayerString('Jack Draper (8)').name, score: '3-6, 7-6(2), 6-3'},
        {id: 'doha-sf2', round: 2, player1: parsePlayerString('Andrey Rublev (5)'), player2: parsePlayerString('Félix Auger-Aliassime'), winner: parsePlayerString('Andrey Rublev (5)').name, score: '7-5, 4-6, 7-6(5)'},
        {id: 'doha-f1', round: 1, player1: parsePlayerString('Andrey Rublev (5)'), player2: parsePlayerString('Jack Draper (8)'), winner: parsePlayerString('Andrey Rublev (5)').name, score: '7–5, 5–7, 6–1'},
    ] 
  },
  { 
    id: 'dubai2025', 
    name: 'Dubai Duty Free Tennis Championships', 
    locationName: 'Dubai, UAE', 
    startDate: '2025-02-24', 
    endDate: '2025-03-01', 
    points: 500, 
    winner: parsePlayerString('Stefanos Tsitsipas (4)').name, 
    location: { lat: 25.25, lon: 55.36 }, 
    draw: [
        {id: 'dub-qf1', round: 3, player1: parsePlayerString('Tallon Griekspoor'), player2: parsePlayerString('Daniil Medvedev (1)'), winner: parsePlayerString('Tallon Griekspoor').name, score: '2-6, 7-6(4), 7-5'},
        {id: 'dub-qf2', round: 3, player1: parsePlayerString('Stefanos Tsitsipas (4)'), player2: parsePlayerString('Matteo Berrettini'), winner: parsePlayerString('Stefanos Tsitsipas (4)').name, score: '7-6(4), 1-6, 6-4'},
        {id: 'dub-qf3', round: 3, player1: parsePlayerString('Quentin Halys (Q)'), player2: parsePlayerString('Luca Nardi (LL)'), winner: parsePlayerString('Quentin Halys (Q)').name, score: '2-6, 6-3, 7-6(1)'},
        {id: 'dub-qf4', round: 3, player1: parsePlayerString('Félix Auger-Aliassime'), player2: parsePlayerString('Marin Čilić (PR)'), winner: parsePlayerString('Félix Auger-Aliassime').name, score: '6-4, 3-6, 6-2'},
        {id: 'dub-sf1', round: 2, player1: parsePlayerString('Stefanos Tsitsipas (4)'), player2: parsePlayerString('Tallon Griekspoor'), winner: parsePlayerString('Stefanos Tsitsipas (4)').name, score: '6-4, 7-6(5)'},
        {id: 'dub-sf2', round: 2, player1: parsePlayerString('Félix Auger-Aliassime'), player2: parsePlayerString('Quentin Halys (Q)'), winner: parsePlayerString('Félix Auger-Aliassime').name, score: '6-4, 7-5'},
        {id: 'dub-f1', round: 1, player1: parsePlayerString('Stefanos Tsitsipas (4)'), player2: parsePlayerString('Félix Auger-Aliassime'), winner: parsePlayerString('Stefanos Tsitsipas (4)').name, score: '6–3, 6–3'},
    ]
  },
  { 
    id: 'acapulco2025', 
    name: 'Abierto Mexicano Telcel', 
    locationName: 'Acapulco, Mexico', 
    startDate: '2025-02-24', 
    endDate: '2025-03-01', 
    points: 500, 
    winner: parsePlayerString('Tomáš Macháč (8)').name, 
    location: { lat: 16.85, lon: -99.88 }, 
    draw: [
        {id: 'aca-qf1', round: 3, player1: parsePlayerString('Tomáš Macháč (8)'), player2: parsePlayerString('Learner Tien (Q)'), winner: parsePlayerString('Tomáš Macháč (8)').name, score: '6-3, 7-5'},
        {id: 'aca-qf2', round: 3, player1: parsePlayerString('Brandon Nakashima'), player2: parsePlayerString('David Goffin'), winner: parsePlayerString('Brandon Nakashima').name, score: '7-6(2), 6-2'},
        {id: 'aca-qf3', round: 3, player1: parsePlayerString('Denis Shapovalov (9)'), player2: parsePlayerString('Marcos Giron'), winner: parsePlayerString('Denis Shapovalov (9)').name, score: '4-6, 6-3, 6-2'},
        {id: 'aca-qf4', round: 3, player1: parsePlayerString('Alejandro Davidovich Fokina'), player2: parsePlayerString('Rodrigo Pacheco Méndez (WC)'), winner: parsePlayerString('Alejandro Davidovich Fokina').name, score: '6-2, 6-2'},
        {id: 'aca-sf1', round: 2, player1: parsePlayerString('Tomáš Macháč (8)'), player2: parsePlayerString('Brandon Nakashima'), winner: parsePlayerString('Tomáš Macháč (8)').name, score: '6-4, 1-6, 6-4'},
        {id: 'aca-sf2', round: 2, player1: parsePlayerString('Alejandro Davidovich Fokina'), player2: parsePlayerString('Denis Shapovalov (9)'), winner: parsePlayerString('Alejandro Davidovich Fokina').name, score: '7-6(5), 7-6(2)'},
        {id: 'aca-f1', round: 1, player1: parsePlayerString('Tomáš Macháč (8)'), player2: parsePlayerString('Alejandro Davidovich Fokina'), winner: parsePlayerString('Tomáš Macháč (8)').name, score: '7–6(8), 6–2'},
    ]
  },
  { 
    id: 'barcelona2025', 
    name: 'Barcelona Open Banc Sabadell', 
    locationName: 'Barcelona, Spain', 
    startDate: '2025-04-14', 
    endDate: '2025-04-20', 
    points: 500, 
    winner: parsePlayerString('Holger Rune (6)').name, 
    location: { lat: 41.38, lon: 2.17 }, 
    draw: [
        {id: 'bar-qf1', round: 3, player1: parsePlayerString('Carlos Alcaraz (1)'), player2: parsePlayerString('Alex de Minaur (5)'), winner: parsePlayerString('Carlos Alcaraz (1)').name, score: '7-5, 6-3'},
        {id: 'bar-qf2', round: 3, player1: parsePlayerString('Arthur Fils (7)'), player2: parsePlayerString('Stefanos Tsitsipas (3)'), winner: parsePlayerString('Arthur Fils (7)').name, score: '2-0, Retired'},
        {id: 'bar-qf3', round: 3, player1: parsePlayerString('Karen Khachanov'), player2: parsePlayerString('Alejandro Davidovich Fokina'), winner: parsePlayerString('Karen Khachanov').name, score: '6-4, 7-5'},
        {id: 'bar-qf4', round: 3, player1: parsePlayerString('Holger Rune (6)'), player2: parsePlayerString('Casper Ruud (2)'), winner: parsePlayerString('Holger Rune (6)').name, score: '6-4, 6-2'},
        {id: 'bar-sf1', round: 2, player1: parsePlayerString('Carlos Alcaraz (1)'), player2: parsePlayerString('Arthur Fils (7)'), winner: parsePlayerString('Carlos Alcaraz (1)').name, score: '6-2, 6-4'},
        {id: 'bar-sf2', round: 2, player1: parsePlayerString('Holger Rune (6)'), player2: parsePlayerString('Karen Khachanov'), winner: parsePlayerString('Holger Rune (6)').name, score: '6-3, 6-2'},
        {id: 'bar-f1', round: 1, player1: parsePlayerString('Holger Rune (6)'), player2: parsePlayerString('Carlos Alcaraz (1)'), winner: parsePlayerString('Holger Rune (6)').name, score: '7–6(8), 6–2'},
    ]
  },
  { 
    id: 'munich500-2025', 
    name: 'BMW Open', 
    locationName: 'Munich, Germany', 
    startDate: '2025-04-14', 
    endDate: '2025-04-20', 
    points: 500, 
    winner: parsePlayerString('Alexander Zverev (1)').name, 
    location: { lat: 48.13, lon: 11.58 }, 
    draw: [
        {id: 'mun-qf1', round: 3, player1: parsePlayerString('Alexander Zverev (1)'), player2: parsePlayerString('Tallon Griekspoor'), winner: parsePlayerString('Alexander Zverev (1)').name, score: '4-6, 7-6(5), 6-3'},
        {id: 'mun-qf2', round: 3, player1: parsePlayerString('Fábián Marozsán'), player2: parsePlayerString('Zizou Bergs'), winner: parsePlayerString('Fábián Marozsán').name, score: '6-2, 6-0'},
        {id: 'mun-qf3', round: 3, player1: parsePlayerString('Francisco Cerúndolo (5)'), player2: parsePlayerString('David Goffin'), winner: parsePlayerString('Francisco Cerúndolo (5)').name, score: '6-4, 6-2'},
        {id: 'mun-qf4', round: 3, player1: parsePlayerString('Ben Shelton (2)'), player2: parsePlayerString('Luciano Darderi'), winner: parsePlayerString('Ben Shelton (2)').name, score: '7-5, 6-3'},
        {id: 'mun-sf1', round: 2, player1: parsePlayerString('Alexander Zverev (1)'), player2: parsePlayerString('Fábián Marozsán'), winner: parsePlayerString('Alexander Zverev (1)').name, score: '7-6(7), 6-3'},
        {id: 'mun-sf2', round: 2, player1: parsePlayerString('Ben Shelton (2)'), player2: parsePlayerString('Francisco Cerúndolo (5)'), winner: parsePlayerString('Ben Shelton (2)').name, score: '6-2, 6-7(4), 7-6(9)'},
        {id: 'mun-f1', round: 1, player1: parsePlayerString('Alexander Zverev (1)'), player2: parsePlayerString('Ben Shelton (2)'), winner: parsePlayerString('Alexander Zverev (1)').name, score: '6–2, 6–4'},
    ]
  },
  { 
    id: 'hamburg500-2025', 
    name: 'Hamburg European Open', 
    locationName: 'Hamburg, Germany', 
    startDate: '2025-05-18', 
    endDate: '2025-05-24', 
    points: 500, 
    winner: parsePlayerString('Flavio Cobolli').name, 
    location: { lat: 53.55, lon: 9.99 }, 
    draw: [
        {id: 'ham-qf1', round: 3, player1: parsePlayerString('Andrey Rublev (3)'), player2: parsePlayerString('Luciano Darderi'), winner: parsePlayerString('Andrey Rublev (3)').name, score: '6-1, 3-6, 6-3'},
        {id: 'ham-qf2', round: 3, player1: parsePlayerString('Félix Auger-Aliassime (6)'), player2: parsePlayerString('Alexandre Müller'), winner: parsePlayerString('Félix Auger-Aliassime (6)').name, score: '6-7(4), 7-6(8), 6-3'},
        {id: 'ham-qf3', round: 3, player1: parsePlayerString('Tomás Martín Etcheverry'), player2: parsePlayerString('Jiří Lehečka'), winner: parsePlayerString('Tomás Martín Etcheverry').name, score: '7-5, 6-3'},
        {id: 'ham-qf4', round: 3, player1: parsePlayerString('Flavio Cobolli'), player2: parsePlayerString('Roberto Bautista Agut'), winner: parsePlayerString('Flavio Cobolli').name, score: '7-6(4), 6-0'},
        {id: 'ham-sf1', round: 2, player1: parsePlayerString('Andrey Rublev (3)'), player2: parsePlayerString('Félix Auger-Aliassime (6)'), winner: parsePlayerString('Andrey Rublev (3)').name, score: '6-1, 6-4'},
        {id: 'ham-sf2', round: 2, player1: parsePlayerString('Flavio Cobolli'), player2: parsePlayerString('Tomás Martín Etcheverry'), winner: parsePlayerString('Flavio Cobolli').name, score: '6-2, 4-6, 6-2'},
        {id: 'ham-f1', round: 1, player1: parsePlayerString('Flavio Cobolli'), player2: parsePlayerString('Andrey Rublev (3)'), winner: parsePlayerString('Flavio Cobolli').name, score: '6–2, 6–4'},
    ]
  },
  { 
    id: 'halle2025', 
    name: 'Terra Wortmann Open', 
    locationName: 'Halle, Germany', 
    startDate: '2025-06-16', 
    endDate: '2025-06-22', 
    points: 500, 
    winner: parsePlayerString('Alexander Bublik').name, 
    location: { lat: 52.06, lon: 8.35 }, 
    draw: [
        {id: 'hal-qf1', round: 3, player1: parsePlayerString('Alexander Bublik'), player2: parsePlayerString('Tomáš Macháč (7)'), winner: parsePlayerString('Alexander Bublik').name, score: '7-6(2), 6-3'},
        {id: 'hal-qf2', round: 3, player1: parsePlayerString('Karen Khachanov (8)'), player2: parsePlayerString('Tomás Martín Etcheverry'), winner: parsePlayerString('Karen Khachanov (8)').name, score: '6-3, 6-2'},
        {id: 'hal-qf3', round: 3, player1: parsePlayerString('Daniil Medvedev (3)'), player2: parsePlayerString('Alex Michelsen'), winner: parsePlayerString('Daniil Medvedev (3)').name, score: '6-4, 6-3'},
        {id: 'hal-qf4', round: 3, player1: parsePlayerString('Alexander Zverev (2)'), player2: parsePlayerString('Flavio Cobolli'), winner: parsePlayerString('Alexander Zverev (2)').name, score: '7-6(6), 6-4'},
        {id: 'hal-sf1', round: 2, player1: parsePlayerString('Alexander Bublik'), player2: parsePlayerString('Karen Khachanov (8)'), winner: parsePlayerString('Alexander Bublik').name, score: '4-6, 7-6(5), 6-4'},
        {id: 'hal-sf2', round: 2, player1: parsePlayerString('Daniil Medvedev (3)'), player2: parsePlayerString('Alexander Zverev (2)'), winner: parsePlayerString('Daniil Medvedev (3)').name, score: '7-6(3), 6-7(1), 6-4'},
        {id: 'hal-f1', round: 1, player1: parsePlayerString('Alexander Bublik'), player2: parsePlayerString('Daniil Medvedev (3)'), winner: parsePlayerString('Alexander Bublik').name, score: '6–3, 7–6(4)'},
    ]
  },
  { 
    id: 'queens2025', 
    name: 'Cinch Championships', 
    locationName: 'London, UK', 
    startDate: '2025-06-16', 
    endDate: '2025-06-22', 
    points: 500, 
    winner: parsePlayerString('Carlos Alcaraz (1)').name, 
    location: { lat: 51.48, lon: -0.21 }, 
    draw: [
        {id: 'que-qf1', round: 3, player1: parsePlayerString('Carlos Alcaraz (1)'), player2: parsePlayerString('Arthur Rinderknech (LL)'), winner: parsePlayerString('Carlos Alcaraz (1)').name, score: '7-5, 6-4'},
        {id: 'que-qf2', round: 3, player1: parsePlayerString('Roberto Bautista Agut'), player2: parsePlayerString('Holger Rune (4)'), winner: parsePlayerString('Roberto Bautista Agut').name, score: '7-6(5), 6-7(4), 6-2'},
        {id: 'que-qf3', round: 3, player1: parsePlayerString('Jiří Lehečka'), player2: parsePlayerString('Jacob Fearnley (WC)'), winner: parsePlayerString('Jiří Lehečka').name, score: '7-5, 6-2'},
        {id: 'que-qf4', round: 3, player1: parsePlayerString('Jack Draper (2)'), player2: parsePlayerString('Brandon Nakashima'), winner: parsePlayerString('Jack Draper (2)').name, score: '6-4, 7-5, 6-4'},
        {id: 'que-sf1', round: 2, player1: parsePlayerString('Carlos Alcaraz (1)'), player2: parsePlayerString('Roberto Bautista Agut'), winner: parsePlayerString('Carlos Alcaraz (1)').name, score: '6-4, 6-4'},
        {id: 'que-sf2', round: 2, player1: parsePlayerString('Jiří Lehečka'), player2: parsePlayerString('Jack Draper (2)'), winner: parsePlayerString('Jiří Lehečka').name, score: '7-5, 4-6, 7-5'},
        {id: 'que-f1', round: 1, player1: parsePlayerString('Carlos Alcaraz (1)'), player2: parsePlayerString('Jiří Lehečka'), winner: parsePlayerString('Carlos Alcaraz (1)').name, score: '7-5, 6-7(5), 6-2'},
    ]
  },
  { 
    id: 'washington2025', 
    name: 'Mubadala Citi DC Open', 
    locationName: 'Washington, D.C., USA', 
    startDate: '2025-07-21', 
    endDate: '2025-07-27', 
    points: 500, 
    winner: parsePlayerString('Alex de Minaur (7)').name, 
    location: { lat: 38.90, lon: -77.03 }, 
    draw: [
        {id: 'was-qf1', round: 3, player1: parsePlayerString('Alejandro Davidovich Fokina (12)'), player2: parsePlayerString('Taylor Fritz (1)'), winner: parsePlayerString('Alejandro Davidovich Fokina (12)').name, score: '7-6(3), 6-3'},
        {id: 'was-qf2', round: 3, player1: parsePlayerString('Ben Shelton (4)'), player2: parsePlayerString('Frances Tiafoe (6)'), winner: parsePlayerString('Ben Shelton (4)').name, score: '7-6(2), 6-2'},
        {id: 'was-qf3', round: 3, player1: parsePlayerString('Corentin Moutet (LL)'), player2: parsePlayerString('Daniil Medvedev (8)'), winner: parsePlayerString('Corentin Moutet (LL)').name, score: '1-6, 6-4, 6-4'},
        {id: 'was-qf4', round: 3, player1: parsePlayerString('Alex de Minaur (7)'), player2: parsePlayerString('Brandon Nakashima (14)'), winner: parsePlayerString('Alex de Minaur (7)').name, score: '6-4, 6-4'},
        {id: 'was-sf1', round: 2, player1: parsePlayerString('Alejandro Davidovich Fokina (12)'), player2: parsePlayerString('Ben Shelton (4)'), winner: parsePlayerString('Alejandro Davidovich Fokina (12)').name, score: '6-2, 7-5'},
        {id: 'was-sf2', round: 2, player1: parsePlayerString('Alex de Minaur (7)'), player2: parsePlayerString('Corentin Moutet (LL)'), winner: parsePlayerString('Alex de Minaur (7)').name, score: '6-4, 6-3'},
        {id: 'was-f1', round: 1, player1: parsePlayerString('Alex de Minaur (7)'), player2: parsePlayerString('Alejandro Davidovich Fokina (12)'), winner: parsePlayerString('Alex de Minaur (7)').name, score: '5–7, 6–1, 7–6(3)'},
    ]
  },
  { 
    id: 'beijing2025', 
    name: 'China Open', 
    locationName: 'Beijing, China', 
    startDate: '2025-09-24', 
    endDate: '2025-09-30', 
    points: 500, 
    winner: parsePlayerString('Jannik Sinner (1)').name, 
    location: { lat: 39.90, lon: 116.40 }, 
    draw: [
        {id: 'bei-qf1', round: 3, player1: parsePlayerString('Jannik Sinner (1)'), player2: parsePlayerString('Fábián Marozsán'), winner: parsePlayerString('Jannik Sinner (1)').name, score: '6-1, 7-5'},
        {id: 'bei-qf2', round: 3, player1: parsePlayerString('Alex de Minaur (3)'), player2: parsePlayerString('Jakub Menšík (7)'), winner: parsePlayerString('Alex de Minaur (3)').name, score: '4-1 (Retired)'},
        {id: 'bei-qf3', round: 3, player1: parsePlayerString('Learner Tien'), player2: parsePlayerString('Lorenzo Musetti (4)'), winner: parsePlayerString('Learner Tien').name, score: '4-6, 6-3, 3-0 (Retired)'},
        {id: 'bei-qf4', round: 3, player1: parsePlayerString('Daniil Medvedev (8)'), player2: parsePlayerString('Alexander Zverev (2)'), winner: parsePlayerString('Daniil Medvedev (8)').name, score: '6-3, 6-3'},
        {id: 'bei-sf1', round: 2, player1: parsePlayerString('Jannik Sinner (1)'), player2: parsePlayerString('Alex de Minaur (3)'), winner: parsePlayerString('Jannik Sinner (1)').name, score: '6-3, 4-6, 6-2'},
        {id: 'bei-sf2', round: 2, player1: parsePlayerString('Learner Tien'), player2: parsePlayerString('Daniil Medvedev (8)'), winner: parsePlayerString('Learner Tien').name, score: '5-7, 7-5, 4-0 (Retired)'},
        {id: 'bei-f1', round: 1, player1: parsePlayerString('Jannik Sinner (1)'), player2: parsePlayerString('Learner Tien'), winner: parsePlayerString('Jannik Sinner (1)').name, score: '6–2, 6–2'},
    ]
  },
  { 
    id: 'tokyo2025', 
    name: 'Kinoshita Group Japan Open', 
    locationName: 'Tokyo, Japan', 
    startDate: '2025-09-24', 
    endDate: '2025-09-30', 
    points: 500, 
    winner: parsePlayerString('Carlos Alcaraz (1)').name, 
    location: { lat: 35.68, lon: 139.69 }, 
    draw: [
        {id: 'tok-qf1', round: 3, player1: parsePlayerString('Carlos Alcaraz (1)'), player2: parsePlayerString('Brandon Nakashima'), winner: parsePlayerString('Carlos Alcaraz (1)').name, score: '6-2, 6-4'},
        {id: 'tok-qf2', round: 3, player1: parsePlayerString('Casper Ruud (3)'), player2: parsePlayerString('Aleksandar Vukic (Q)'), winner: parsePlayerString('Casper Ruud (3)').name, score: '6-3, 6-2'},
        {id: 'tok-qf3', round: 3, player1: parsePlayerString('Jenson Brooksby (PR)'), player2: parsePlayerString('Holger Rune (4)'), winner: parsePlayerString('Jenson Brooksby (PR)').name, score: '6-3, 6-3'},
        {id: 'tok-qf4', round: 3, player1: parsePlayerString('Taylor Fritz (2)'), player2: parsePlayerString('Sebastian Korda'), winner: parsePlayerString('Taylor Fritz (2)').name, score: '6-3, 6-7(5), 6-3'},
        {id: 'tok-sf1', round: 2, player1: parsePlayerString('Carlos Alcaraz (1)'), player2: parsePlayerString('Casper Ruud (3)'), winner: parsePlayerString('Carlos Alcaraz (1)').name, score: '3-6, 6-3, 6-4'},
        {id: 'tok-sf2', round: 2, player1: parsePlayerString('Taylor Fritz (2)'), player2: parsePlayerString('Jenson Brooksby (PR)'), winner: parsePlayerString('Taylor Fritz (2)').name, score: '6-4, 6-3'},
        {id: 'tok-f1', round: 1, player1: parsePlayerString('Carlos Alcaraz (1)'), player2: parsePlayerString('Taylor Fritz (2)'), winner: parsePlayerString('Carlos Alcaraz (1)').name, score: '6–4, 6–4'},
    ]
  },
  { 
    id: 'basel2025', 
    name: 'Swiss Indoors Basel', 
    locationName: 'Basel, Switzerland', 
    startDate: '2025-10-20', 
    endDate: '2025-10-26', 
    points: 500, 
    winner: parsePlayerString('João Fonseca (WC)').name, 
    location: { lat: 47.55, lon: 7.58 }, 
    draw: [
        {id: 'bas-qf1', round: 3, player1: parsePlayerString('João Fonseca (WC)'), player2: parsePlayerString('Denis Shapovalov (9)'), winner: parsePlayerString('João Fonseca (WC)').name, score: '3-6, 6-3, 4-1 (Retired)'},
        {id: 'bas-qf2', round: 3, player1: parsePlayerString('Jaume Munar (Q)'), player2: parsePlayerString('Félix Auger-Aliassime (5)'), winner: parsePlayerString('Jaume Munar (Q)').name, score: '6-3, 0-0 (Retired)'},
        {id: 'bas-qf3', round: 3, player1: parsePlayerString('Alejandro Davidovich Fokina (8)'), player2: parsePlayerString('Casper Ruud (4)'), winner: parsePlayerString('Alejandro Davidovich Fokina (8)').name, score: '7-6(1), 0-0 (Retired)'},
        {id: 'bas-qf4', round: 3, player1: parsePlayerString('Ugo Humbert'), player2: parsePlayerString('Reilly Opelka (Q)'), winner: parsePlayerString('Ugo Humbert').name, score: '7-6(5), 6-4'},
        {id: 'bas-sf1', round: 2, player1: parsePlayerString('João Fonseca (WC)'), player2: parsePlayerString('Jaume Munar (Q)'), winner: parsePlayerString('João Fonseca (WC)').name, score: '7-6(4), 7-5'},
        {id: 'bas-sf2', round: 2, player1: parsePlayerString('Alejandro Davidovich Fokina (8)'), player2: parsePlayerString('Ugo Humbert'), winner: parsePlayerString('Alejandro Davidovich Fokina (8)').name, score: '7-6(4), 3-1 (Retired)'},
        {id: 'bas-f1', round: 1, player1: parsePlayerString('João Fonseca (WC)'), player2: parsePlayerString('Alejandro Davidovich Fokina (8)'), winner: parsePlayerString('João Fonseca (WC)').name, score: '6–3, 6–4'},
    ]
  },
  { 
    id: 'vienna2025', 
    name: 'Erste Bank Open', 
    locationName: 'Vienna, Austria', 
    startDate: '2025-10-20', 
    endDate: '2025-10-26', 
    points: 500, 
    winner: parsePlayerString('Jannik Sinner (1)').name, 
    location: { lat: 48.20, lon: 16.37 }, 
    draw: [
        {id: 'vie-qf1', round: 3, player1: parsePlayerString('Jannik Sinner (1)'), player2: parsePlayerString('Alexander Bublik (8)'), winner: parsePlayerString('Jannik Sinner (1)').name, score: '6-4, 6-4'},
        {id: 'vie-qf2', round: 3, player1: parsePlayerString('Alex de Minaur (3)'), player2: parsePlayerString('Matteo Berrettini'), winner: parsePlayerString('Alex de Minaur (3)').name, score: '6-1, 7-6(4)'},
        {id: 'vie-qf3', round: 3, player1: parsePlayerString('Lorenzo Musetti (4)'), player2: parsePlayerString('Corentin Moutet'), winner: parsePlayerString('Lorenzo Musetti (4)').name, score: '6-3, 6-4'},
        {id: 'vie-qf4', round: 3, player1: parsePlayerString('Alexander Zverev (2)'), player2: parsePlayerString('Tallon Griekspoor'), winner: parsePlayerString('Alexander Zverev (2)').name, score: 'Walkover'},
        {id: 'vie-sf1', round: 2, player1: parsePlayerString('Jannik Sinner (1)'), player2: parsePlayerString('Alex de Minaur (3)'), winner: parsePlayerString('Jannik Sinner (1)').name, score: '6-3, 6-4'},
        {id: 'vie-sf2', round: 2, player1: parsePlayerString('Alexander Zverev (2)'), player2: parsePlayerString('Lorenzo Musetti (4)'), winner: parsePlayerString('Alexander Zverev (2)').name, score: '6-4, 7-5'},
        {id: 'vie-f1', round: 1, player1: parsePlayerString('Jannik Sinner (1)'), player2: parsePlayerString('Alexander Zverev (2)'), winner: parsePlayerString('Jannik Sinner (1)').name, score: '3-6, 6-3, 7-5'},
    ]
  },
  // ATP 250
  { 
    id: 'brisbane2025', 
    name: 'Brisbane International', 
    locationName: 'Brisbane, Australia', 
    startDate: '2024-12-30', 
    endDate: '2025-01-05', 
    points: 250, 
    winner: parsePlayerString('Jiří Lehečka (6)').name, 
    location: { lat: -27.46, lon: 153.02 }, 
    draw: [
        { id: 'bris-sf1', round: 2, player1: parsePlayerString('Reilly Opelka (PR)'), player2: parsePlayerString('Giovanni Mpetshi Perricard'), winner: parsePlayerString('Reilly Opelka (PR)').name, score: '6–3, 7–6(4)' },
        { id: 'bris-sf2', round: 2, player1: parsePlayerString('Jiří Lehečka (6)'), player2: parsePlayerString('Grigor Dimitrov (1)'), winner: parsePlayerString('Jiří Lehečka (6)').name, score: '6–4, 4–4, Retired' },
        { id: 'bris-f1', round: 1, player1: parsePlayerString('Jiří Lehečka (6)'), player2: parsePlayerString('Reilly Opelka (PR)'), winner: parsePlayerString('Jiří Lehečka (6)').name, score: '4–1, Retired' }
    ] 
  },
  { 
    id: 'hongkong2025', 
    name: 'Bank of China Hong Kong Tennis Open', 
    locationName: 'Hong Kong', 
    startDate: '2024-12-30', 
    endDate: '2025-01-05', 
    points: 250, 
    winner: parsePlayerString('Alexandre Müller').name, 
    location: { lat: 22.31, lon: 114.16 }, 
    draw: [
        { id: 'hk-sf1', round: 2, player1: parsePlayerString('Kei Nishikori (PR)'), player2: parsePlayerString('Arthur Fils (4)'), winner: parsePlayerString('Kei Nishikori (PR)').name, score: '6–4, 6–4' },
        { id: 'hk-sf2', round: 2, player1: parsePlayerString('Alexandre Müller'), player2: parsePlayerString('Jaume Munar'), winner: parsePlayerString('Alexandre Müller').name, score: '4–6, 7–6(5), 6–4' },
        { id: 'hk-f1', round: 1, player1: parsePlayerString('Alexandre Müller'), player2: parsePlayerString('Kei Nishikori (PR)'), winner: parsePlayerString('Alexandre Müller').name, score: '2–6, 6–1, 6–3' }
    ] 
  },
  { 
    id: 'adelaide2025', 
    name: 'Adelaide International', 
    locationName: 'Adelaide, Australia', 
    startDate: '2025-01-06', 
    endDate: '2025-01-11', 
    points: 250, 
    winner: parsePlayerString('Félix Auger-Aliassime (5)').name, 
    location: { lat: -34.92, lon: 138.60 }, 
    draw: [
        { id: 'ad-sf1', round: 2, player1: parsePlayerString('Félix Auger-Aliassime (5)'), player2: parsePlayerString('Tommy Paul (1)'), winner: parsePlayerString('Félix Auger-Aliassime (5)').name, score: '6–4, 6–4' },
        { id: 'ad-sf2', round: 2, player1: parsePlayerString('Sebastian Korda (2)'), player2: parsePlayerString('Miomir Kecmanović'), winner: parsePlayerString('Sebastian Korda (2)').name, score: '6–4, 7–6(6)' },
        { id: 'ad-f1', round: 1, player1: parsePlayerString('Félix Auger-Aliassime (5)'), player2: parsePlayerString('Sebastian Korda (2)'), winner: parsePlayerString('Félix Auger-Aliassime (5)').name, score: '6–3, 3–6, 6–1' }
    ] 
  },
  { 
    id: 'auckland2025', 
    name: 'ASB Classic', 
    locationName: 'Auckland, New Zealand', 
    startDate: '2025-01-06', 
    endDate: '2025-01-11', 
    points: 250, 
    winner: parsePlayerString('Gaël Monfils').name, 
    location: { lat: -36.84, lon: 174.76 }, 
    draw: [
        { id: 'auc-sf1', round: 2, player1: parsePlayerString('Zizou Bergs (Q)'), player2: parsePlayerString('Nuno Borges (7)'), winner: parsePlayerString('Zizou Bergs (Q)').name, score: '6–2, 3–6, 7–5' },
        { id: 'auc-sf2', round: 2, player1: parsePlayerString('Gaël Monfils'), player2: parsePlayerString('Nishesh Basavareddy (Q)'), winner: parsePlayerString('Gaël Monfils').name, score: '7–6(5), 6–4' },
        { id: 'auc-f1', round: 1, player1: parsePlayerString('Gaël Monfils'), player2: parsePlayerString('Zizou Bergs (Q)'), winner: parsePlayerString('Gaël Monfils').name, score: '6–3, 6–4' }
    ] 
  },
  { id: 'montpellier2025', name: 'Open Sud de France', locationName: 'Montpellier, France', startDate: '2025-01-27', endDate: '2025-02-02', points: 250, winner: 'A. Bublik', location: { lat: 43.61, lon: 3.87 }, draw: [] },
  { id: 'cordoba2025', name: 'Cordoba Open', locationName: 'Cordoba, Argentina', startDate: '2025-02-03', endDate: '2025-02-09', points: 250, winner: 'L. Darderi', location: { lat: -31.42, lon: -64.18 }, draw: [] },
  { 
    id: 'marseille2025', 
    name: 'Open 13 Provence', 
    locationName: 'Marseille, France', 
    startDate: '2025-02-10', 
    endDate: '2025-02-16', 
    points: 250, 
    winner: parsePlayerString('Ugo Humbert (2)').name, 
    location: { lat: 43.29, lon: 5.36 }, 
    draw: [
        { id: 'mar-sf1', round: 2, player1: parsePlayerString('Hamad Medjedovic'), player2: parsePlayerString('Daniil Medvedev (1/WC)'), winner: parsePlayerString('Hamad Medjedovic').name, score: '6–3, 6–2' },
        { id: 'mar-sf2', round: 2, player1: parsePlayerString('Ugo Humbert (2)'), player2: parsePlayerString('Zizou Bergs'), winner: parsePlayerString('Ugo Humbert (2)').name, score: '6–4, 6–4' },
        { id: 'mar-f1', round: 1, player1: parsePlayerString('Ugo Humbert (2)'), player2: parsePlayerString('Hamad Medjedovic'), winner: parsePlayerString('Ugo Humbert (2)').name, score: '7–6(4), 6–4' }
    ] 
  },
  { 
    id: 'delray2025', 
    name: 'Delray Beach Open', 
    locationName: 'Delray Beach, USA', 
    startDate: '2025-02-10', 
    endDate: '2025-02-16', 
    points: 250, 
    winner: parsePlayerString('Miomir Kecmanović (7)').name, 
    location: { lat: 26.46, lon: -80.07 }, 
    draw: [
        { id: 'del-sf1', round: 2, player1: parsePlayerString('Alejandro Davidovich Fokina (8)'), player2: parsePlayerString('Matteo Arnaldi (4)'), winner: parsePlayerString('Alejandro Davidovich Fokina (8)').name, score: '6–4, 6–4' },
        { id: 'del-sf2', round: 2, player1: parsePlayerString('Miomir Kecmanović (7)'), player2: parsePlayerString('Alex Michelsen (3)'), winner: parsePlayerString('Miomir Kecmanović (7)').name, score: '7–6(3), 7–6(7)' },
        { id: 'del-f1', round: 1, player1: parsePlayerString('Miomir Kecmanović (7)'), player2: parsePlayerString('Alejandro Davidovich Fokina (8)'), winner: parsePlayerString('Miomir Kecmanović (7)').name, score: '3–6, 6–1, 7–5' }
    ] 
  },
  { 
    id: 'buenosaires2025', 
    name: 'IEB+ Argentina Open', 
    locationName: 'Buenos Aires, Argentina', 
    startDate: '2025-02-10', 
    endDate: '2025-02-16', 
    points: 250, 
    winner: parsePlayerString('João Fonseca (WC)').name, 
    location: { lat: -34.60, lon: -58.38 }, 
    draw: [
        { id: 'ba-sf1', round: 2, player1: parsePlayerString('Francisco Cerúndolo (1)'), player2: parsePlayerString('Pedro Martínez'), winner: parsePlayerString('Francisco Cerúndolo (1)').name, score: '6–2, 6–4' },
        { id: 'ba-sf2', round: 2, player1: parsePlayerString('João Fonseca (WC)'), player2: parsePlayerString('Laslo Djere'), winner: parsePlayerString('João Fonseca (WC)').name, score: '7–6(3), 5–7, 6–1' },
        { id: 'ba-f1', round: 1, player1: parsePlayerString('João Fonseca (WC)'), player2: parsePlayerString('Francisco Cerúndolo (1)'), winner: parsePlayerString('João Fonseca (WC)').name, score: '6–4, 7–6(1)' }
    ] 
  },
  { 
    id: 'santiago2025', 
    name: 'Movistar Chile Open', 
    locationName: 'Santiago, Chile', 
    startDate: '2025-02-24', 
    endDate: '2025-03-02', 
    points: 250, 
    winner: parsePlayerString('Laslo Djere').name, 
    location: { lat: -33.44, lon: -70.66 }, 
    draw: [
        { id: 'san-sf1', round: 2, player1: parsePlayerString('Laslo Djere'), player2: parsePlayerString('Francisco Cerúndolo (1)'), winner: parsePlayerString('Laslo Djere').name, score: '6–3, 6–4' },
        { id: 'san-sf2', round: 2, player1: parsePlayerString('Sebastián Báez (3)'), player2: parsePlayerString('Camilo Ugo Carabelli'), winner: parsePlayerString('Sebastián Báez (3)').name, score: '6–2, 6–4' },
        { id: 'san-f1', round: 1, player1: parsePlayerString('Laslo Djere'), player2: parsePlayerString('Sebastián Báez (3)'), winner: parsePlayerString('Laslo Djere').name, score: '6–4, 3–6, 7–5' }
    ] 
  },
  { 
    id: 'houston2025', 
    name: 'U.S. Men\'s Clay Court Championship', 
    locationName: 'Houston, USA', 
    startDate: '2025-03-31', 
    endDate: '2025-04-06', 
    points: 250, 
    winner: parsePlayerString('Jenson Brooksby (PR)').name, 
    location: { lat: 29.76, lon: -95.36 }, 
    draw: [
        { id: 'hou-f1', round: 1, player1: parsePlayerString('Jenson Brooksby (PR)'), player2: parsePlayerString('Tommy Paul (2)'), winner: parsePlayerString('Jenson Brooksby (PR)').name, score: '3–6, 6–1, 6–4' }
    ] 
  },
  { 
    id: 'marrakech2025', 
    name: 'Grand Prix Hassan II', 
    locationName: 'Marrakech, Morocco', 
    startDate: '2025-03-31', 
    endDate: '2025-04-06', 
    points: 250, 
    winner: parsePlayerString('Luciano Darderi (7)').name, 
    location: { lat: 31.62, lon: -7.98 }, 
    draw: [
        { id: 'mar-f1', round: 1, player1: parsePlayerString('Luciano Darderi (7)'), player2: parsePlayerString('Tallon Griekspoor (1)'), winner: parsePlayerString('Luciano Darderi (7)').name, score: '7–6(3), 7–6(4)' }
    ] 
  },
  { id: 'estoril2025', name: 'Millennium Estoril Open', locationName: 'Estoril, Portugal', startDate: '2025-03-31', endDate: '2025-04-06', points: 250, winner: 'H. Hurkacz', location: { lat: 38.70, lon: -9.39 }, draw: [] },
  { 
    id: 'bucharest2025', 
    name: 'Tiriac Open', 
    locationName: 'Bucharest, Romania', 
    startDate: '2025-04-14', 
    endDate: '2025-04-20', 
    points: 250, 
    winner: parsePlayerString('Flavio Cobolli (3)').name, 
    location: { lat: 44.42, lon: 26.10 }, 
    draw: [
        { id: 'buc-f1', round: 1, player1: parsePlayerString('Flavio Cobolli (3)'), player2: parsePlayerString('Sebastián Báez (1)'), winner: parsePlayerString('Flavio Cobolli (3)').name, score: '3–6, 7–6(5), 6–4' }
    ] 
  },
  { 
    id: 'geneva2025', 
    name: 'Gonet Geneva Open', 
    locationName: 'Geneva, Switzerland', 
    startDate: '2025-05-18', 
    endDate: '2025-05-24', 
    points: 250, 
    winner: parsePlayerString('Novak Djokovic (2/WC)').name, 
    location: { lat: 46.20, lon: 6.14 }, 
    draw: [
        { id: 'gen-f1', round: 1, player1: parsePlayerString('Novak Djokovic (2/WC)'), player2: parsePlayerString('Hubert Hurkacz (6)'), winner: parsePlayerString('Novak Djokovic (2/WC)').name, score: '5–7, 7–6(2), 7–6(2)' }
    ] 
  },
  { id: 'lyon2025', name: 'Open Parc', locationName: 'Lyon, France', startDate: '2025-05-18', endDate: '2025-05-24', points: 250, winner: 'G. Mpetshi Perricard', location: { lat: 45.76, lon: 4.83 }, draw: [] },
  { 
    id: 'stuttgart2025', 
    name: 'BOSS OPEN', 
    locationName: 'Stuttgart, Germany', 
    startDate: '2025-06-09', 
    endDate: '2025-06-15', 
    points: 250, 
    winner: parsePlayerString('Taylor Fritz (2)').name, 
    location: { lat: 48.78, lon: 9.18 }, 
    draw: [
        { id: 'stu-f1', round: 1, player1: parsePlayerString('Taylor Fritz (2)'), player2: parsePlayerString('Alexander Zverev (1)'), winner: parsePlayerString('Taylor Fritz (2)').name, score: '6–3, 7–6(3)' }
    ] 
  },
  { 
    id: 'hertogenbosch2025', 
    name: 'Libema Open', 
    locationName: '\'s-Hertogenbosch, Netherlands', 
    startDate: '2025-06-09', 
    endDate: '2025-06-15', 
    points: 250, 
    winner: parsePlayerString('Gabriel Diallo').name, 
    location: { lat: 51.69, lon: 5.30 }, 
    draw: [
        { id: 'her-f1', round: 1, player1: parsePlayerString('Gabriel Diallo'), player2: parsePlayerString('Zizou Bergs'), winner: parsePlayerString('Gabriel Diallo').name, score: '7–5, 7–6(8)' }
    ] 
  },
  { 
    id: 'mallorca2025', 
    name: 'Mallorca Championships', 
    locationName: 'Mallorca, Spain', 
    startDate: '2025-06-22', 
    endDate: '2025-06-28', 
    points: 250, 
    winner: parsePlayerString('Tallon Griekspoor (4)').name, 
    location: { lat: 39.56, lon: 2.65 }, 
    draw: [
        { id: 'mal-f1', round: 1, player1: parsePlayerString('Tallon Griekspoor (4)'), player2: parsePlayerString('Corentin Moutet'), winner: parsePlayerString('Tallon Griekspoor (4)').name, score: '7–5, 7–6(3)' }
    ] 
  },
  { 
    id: 'eastbourne2025', 
    name: 'Rothesay International', 
    locationName: 'Eastbourne, UK', 
    startDate: '2025-06-23', 
    endDate: '2025-06-28', 
    points: 250, 
    winner: parsePlayerString('Taylor Fritz (1)').name, 
    location: { lat: 50.76, lon: 0.28 }, 
    draw: [
        { id: 'eas-f1', round: 1, player1: parsePlayerString('Taylor Fritz (1)'), player2: parsePlayerString('Tommy Paul (2)'), winner: parsePlayerString('Taylor Fritz (1)').name, score: '7–6(4), 6–3' }
    ] 
  },
  { 
    id: 'newport2025', 
    name: 'Infosys Hall of Fame Open', 
    locationName: 'Newport, USA', 
    startDate: '2025-07-14', 
    endDate: '2025-07-20', 
    points: 250, 
    winner: parsePlayerString('Zachary Svajda (Q)').name, 
    location: { lat: 41.49, lon: -71.31 }, 
    draw: [
        { id: 'new-f1', round: 1, player1: parsePlayerString('Zachary Svajda (Q)'), player2: parsePlayerString('Adrian Mannarino (1)'), winner: parsePlayerString('Zachary Svajda (Q)').name, score: '7–5, 6–3' }
    ] 
  },
  { 
    id: 'bastad2025', 
    name: 'Nordea Open', 
    locationName: 'Bastad, Sweden', 
    startDate: '2025-07-14', 
    endDate: '2025-07-20', 
    points: 250, 
    winner: parsePlayerString('Luciano Darderi (6)').name, 
    location: { lat: 56.43, lon: 12.84 }, 
    draw: [
        { id: 'bas-f1', round: 1, player1: parsePlayerString('Luciano Darderi (6)'), player2: parsePlayerString('Jesper de Jong (Q)'), winner: parsePlayerString('Luciano Darderi (6)').name, score: '4–6, 6–2, 6–4' }
    ] 
  },
  { 
    id: 'gstaad2025', 
    name: 'EFG Swiss Open Gstaad', 
    locationName: 'Gstaad, Switzerland', 
    startDate: '2025-07-14', 
    endDate: '2025-07-20', 
    points: 250, 
    winner: parsePlayerString('Alexander Bublik (2)').name, 
    location: { lat: 46.47, lon: 7.28 }, 
    draw: [
        { id: 'gst-f1', round: 1, player1: parsePlayerString('Alexander Bublik (2)'), player2: parsePlayerString('Juan Manuel Cerúndolo'), winner: parsePlayerString('Alexander Bublik (2)').name, score: '6–4, 4–6, 6–3' }
    ] 
  },
  { 
    id: 'kitzbuhel2025', 
    name: 'Generali Open', 
    locationName: 'Kitzbühel, Austria', 
    startDate: '2025-07-21', 
    endDate: '2025-07-26', 
    points: 250, 
    winner: parsePlayerString('Alexander Bublik (1)').name, 
    location: { lat: 47.44, lon: 12.39 }, 
    draw: [
        { id: 'kit-f1', round: 1, player1: parsePlayerString('Alexander Bublik (1)'), player2: parsePlayerString('Arthur Cazaux'), winner: parsePlayerString('Alexander Bublik (1)').name, score: '4–6, 6–3, 7–5' }
    ] 
  },
  { 
    id: 'umag2025', 
    name: 'Plava Laguna Croatia Open Umag', 
    locationName: 'Umag, Croatia', 
    startDate: '2025-07-21', 
    endDate: '2025-07-26', 
    points: 250, 
    winner: parsePlayerString('Luciano Darderi (1)').name, 
    location: { lat: 45.43, lon: 13.52 }, 
    draw: [
        { id: 'uma-f1', round: 1, player1: parsePlayerString('Luciano Darderi (1)'), player2: parsePlayerString('Carlos Taberner (Q)'), winner: parsePlayerString('Luciano Darderi (1)').name, score: '6–1, 6–2' }
    ] 
  },
  { id: 'atlanta2025', name: 'Atlanta Open', locationName: 'Atlanta, USA', startDate: '2025-07-21', endDate: '2025-07-27', points: 250, winner: null, location: { lat: 33.74, lon: -84.38 }, draw: [] },
  { 
    id: 'loscabos2025', 
    name: 'Mifel Tennis Open', 
    locationName: 'Los Cabos, Mexico', 
    startDate: '2025-07-28', 
    endDate: '2025-08-02', 
    points: 250, 
    winner: parsePlayerString('Denis Shapovalov (3)').name, 
    location: { lat: 22.89, lon: -109.91 }, 
    draw: [
        { id: 'los-f1', round: 1, player1: parsePlayerString('Denis Shapovalov (3)'), player2: parsePlayerString('Aleksandar Kovacevic (7)'), winner: parsePlayerString('Denis Shapovalov (3)').name, score: '6–4, 6–2' }
    ] 
  },
  { 
    id: 'winstonsalem2025', 
    name: 'Winston-Salem Open', 
    locationName: 'Winston-Salem, USA', 
    startDate: '2025-08-17', 
    endDate: '2025-08-23', 
    points: 250, 
    winner: parsePlayerString('Márton Fucsovics').name, 
    location: { lat: 36.09, lon: -80.24 }, 
    draw: [
        { id: 'win-f1', round: 1, player1: parsePlayerString('Márton Fucsovics'), player2: parsePlayerString('Botic van de Zandschulp'), winner: parsePlayerString('Márton Fucsovics').name, score: '7–6(5), 6–3' }
    ] 
  },
  { 
    id: 'chengdu2025', 
    name: 'Chengdu Open', 
    locationName: 'Chengdu, China', 
    startDate: '2025-09-15', 
    endDate: '2025-09-21', 
    points: 250, 
    winner: parsePlayerString('Alejandro Tabilo (3)').name, 
    location: { lat: 30.57, lon: 104.06 }, 
    draw: [
        { id: 'che-f1', round: 1, player1: parsePlayerString('Alejandro Tabilo (3)'), player2: parsePlayerString('Lorenzo Musetti (1)'), winner: parsePlayerString('Alejandro Tabilo (3)').name, score: '6–3, 2–6, 7–6(5)' }
    ] 
  },
  { 
    id: 'zhuhai2025', 
    name: 'Zhuhai Championships', 
    locationName: 'Zhuhai, China', 
    startDate: '2025-09-15', 
    endDate: '2025-09-21', 
    points: 250, 
    winner: parsePlayerString('Arthur Rinderknech').name, 
    location: { lat: 22.27, lon: 113.56 }, 
    draw: [
        { id: 'zhu-f1', round: 1, player1: parsePlayerString('Arthur Rinderknech'), player2: parsePlayerString('Jiří Lehečka (1)'), winner: parsePlayerString('Arthur Rinderknech').name, score: '7–6(5), 6–3' }
    ] 
  },
  { 
    id: 'almaty2025', 
    name: 'Astana Open', 
    locationName: 'Almaty, Kazakhstan', 
    startDate: '2025-10-13', 
    endDate: '2025-10-19', 
    points: 250, 
    winner: parsePlayerString('Daniil Medvedev (2)').name, 
    location: { lat: 43.22, lon: 76.85 }, 
    draw: [
        { id: 'alm-f1', round: 1, player1: parsePlayerString('Daniil Medvedev (2)'), player2: parsePlayerString('Corentin Moutet (8)'), winner: parsePlayerString('Daniil Medvedev (2)').name, score: '6–4, 6–2' }
    ] 
  },
  { 
    id: 'antwerp2025', 
    name: 'European Open', 
    locationName: 'Antwerp, Belgium', 
    startDate: '2025-10-13', 
    endDate: '2025-10-19', 
    points: 250, 
    winner: parsePlayerString('Félix Auger-Aliassime (2)').name, 
    location: { lat: 51.21, lon: 4.40 }, 
    draw: [
        { id: 'ant-f1', round: 1, player1: parsePlayerString('Félix Auger-Aliassime (2)'), player2: parsePlayerString('Jiří Lehečka (3)'), winner: parsePlayerString('Félix Auger-Aliassime (2)').name, score: '7–6(4), 7–6(4)' }
    ] 
  },
  { 
    id: 'stockholm2025', 
    name: 'BNP Paribas Nordic Open', 
    locationName: 'Stockholm, Sweden', 
    startDate: '2025-10-13', 
    endDate: '2025-10-19', 
    points: 250, 
    winner: parsePlayerString('Casper Ruud (2)').name, 
    location: { lat: 59.32, lon: 18.06 }, 
    draw: [
        { id: 'sto-f1', round: 1, player1: parsePlayerString('Casper Ruud (2)'), player2: parsePlayerString('Ugo Humbert (4)'), winner: parsePlayerString('Casper Ruud (2)').name, score: '6–4, 7–6(5)' }
    ] 
  },
  { id: 'metz2025', name: 'Moselle Open', locationName: 'Metz, France', startDate: '2025-11-02', endDate: '2025-11-08', points: 250, winner: null, location: { lat: 49.11, lon: 6.17 }, draw: [] },
  { id: 'gijon2025', name: 'Gijon Open', locationName: 'Gijon, Spain', startDate: '2025-11-02', endDate: '2025-11-08', points: 250, winner: null, location: { lat: 43.54, lon: -5.66 }, draw: [] },
];