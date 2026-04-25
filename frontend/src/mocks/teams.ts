import type { Team } from '../types';

const MEDIA_URL = import.meta.env.VITE_MEDIA_URL;

export const mockTeams: Team[] = [
    { id: 1,  name: 'Liverpool',           shortName: 'LIV', logo: `${MEDIA_URL}/liverpool.svg` },
    { id: 2,  name: 'Manchester United',   shortName: 'MUN', logo: `${MEDIA_URL}/manchester-united.svg` },
    { id: 3,  name: 'Real Madrid',         shortName: 'RMA', logo: `${MEDIA_URL}/real-madrid.svg` },
    { id: 4,  name: 'Barcelona',           shortName: 'FCB', logo: `${MEDIA_URL}/barcelona.svg` },
    { id: 5,  name: 'Chelsea',             shortName: 'CHE', logo: `${MEDIA_URL}/chelsea.svg` },
    { id: 6,  name: 'Atletico Madrid',     shortName: 'ATM', logo: `${MEDIA_URL}/atletico-madrid.svg` },
    { id: 7,  name: 'Bayern Munich',       shortName: 'BAY', logo: `${MEDIA_URL}/bayern-munich.svg` },
    { id: 8,  name: 'PSG',                 shortName: 'PSG', logo: `${MEDIA_URL}/psg.svg` },
    { id: 9,  name: 'Juventus',            shortName: 'JUV', logo: `${MEDIA_URL}/juventus.svg` },
    { id: 10, name: 'Inter Milan',         shortName: 'INT', logo: `${MEDIA_URL}/inter-milan.svg` },
    { id: 11, name: 'Borussia Dortmund',   shortName: 'BVB', logo: `${MEDIA_URL}/borussia-dortmund.svg` },
    { id: 12, name: 'Ajax',                shortName: 'AJX', logo: `${MEDIA_URL}/ajax.svg` },
    { id: 13, name: 'Arsenal',             shortName: 'ARS', logo: `${MEDIA_URL}/arsenal.svg` },
    { id: 14, name: 'AC Milan',            shortName: 'ACM', logo: `${MEDIA_URL}/ac-milan.svg` },
    { id: 15, name: 'Manchester City',     shortName: 'MCI', logo: `${MEDIA_URL}/manchester-city.svg` },
    { id: 16, name: 'Tottenham',           shortName: 'TOT', logo: `${MEDIA_URL}/tottenham.svg` },
];
