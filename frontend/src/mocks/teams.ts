import type { Team } from '../types';

const MEDIA_URL = import.meta.env.VITE_MEDIA_URL;

export const mockTeams: Team[] = [
    { id: 1,  name: 'Bulgaria',      shortName: 'BUL', logo: `${MEDIA_URL}/bg.svg` },
    { id: 2,  name: 'Italy',         shortName: 'ITA', logo: `${MEDIA_URL}/it.svg` },
    { id: 3,  name: 'Spain',         shortName: 'ESP', logo: `${MEDIA_URL}/es.svg` },
    { id: 4,  name: 'France',        shortName: 'FRA', logo: `${MEDIA_URL}/fr.svg` },
    { id: 5,  name: 'Germany',       shortName: 'GER', logo: `${MEDIA_URL}/de.svg` },
    { id: 6,  name: 'England',       shortName: 'ENG', logo: `${MEDIA_URL}/gb-eng.svg` },
    { id: 7,  name: 'Portugal',      shortName: 'POR', logo: `${MEDIA_URL}/pt.svg` },
    { id: 8,  name: 'Netherlands',   shortName: 'NED', logo: `${MEDIA_URL}/nl.svg` },
    { id: 9,  name: 'Brazil',        shortName: 'BRA', logo: `${MEDIA_URL}/br.svg` },
    { id: 10, name: 'Argentina',     shortName: 'ARG', logo: `${MEDIA_URL}/ar.svg` },
    { id: 11, name: 'Croatia',       shortName: 'CRO', logo: `${MEDIA_URL}/hr.svg` },
    { id: 12, name: 'Belgium',       shortName: 'BEL', logo: `${MEDIA_URL}/be.svg` },
    { id: 13, name: 'Uruguay',       shortName: 'URU', logo: `${MEDIA_URL}/uy.svg` },
    { id: 14, name: 'Serbia',        shortName: 'SRB', logo: `${MEDIA_URL}/rs.svg` },
    { id: 15, name: 'Morocco',       shortName: 'MAR', logo: `${MEDIA_URL}/ma.svg` },
    { id: 16, name: 'Japan',         shortName: 'JPN', logo: `${MEDIA_URL}/jp.svg` },
];
