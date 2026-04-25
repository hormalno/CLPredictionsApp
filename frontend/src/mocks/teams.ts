import type { Team } from '../types';

const MEDIA_URL = import.meta.env.VITE_MEDIA_URL;

export const mockTeams: Team[] = [
    { id: 1,  name: 'Bulgaria',      short_name: 'BUL', logo: `${MEDIA_URL}/bg.svg` },
    { id: 2,  name: 'Italy',         short_name: 'ITA', logo: `${MEDIA_URL}/it.svg` },
    { id: 3,  name: 'Spain',         short_name: 'ESP', logo: `${MEDIA_URL}/es.svg` },
    { id: 4,  name: 'France',        short_name: 'FRA', logo: `${MEDIA_URL}/fr.svg` },
    { id: 5,  name: 'Germany',       short_name: 'GER', logo: `${MEDIA_URL}/de.svg` },
    { id: 6,  name: 'England',       short_name: 'ENG', logo: `${MEDIA_URL}/gb-eng.svg` },
    { id: 7,  name: 'Portugal',      short_name: 'POR', logo: `${MEDIA_URL}/pt.svg` },
    { id: 8,  name: 'Netherlands',   short_name: 'NED', logo: `${MEDIA_URL}/nl.svg` },
    { id: 9,  name: 'Brazil',        short_name: 'BRA', logo: `${MEDIA_URL}/br.svg` },
    { id: 10, name: 'Argentina',     short_name: 'ARG', logo: `${MEDIA_URL}/ar.svg` },
    { id: 11, name: 'Croatia',       short_name: 'CRO', logo: `${MEDIA_URL}/hr.svg` },
    { id: 12, name: 'Belgium',       short_name: 'BEL', logo: `${MEDIA_URL}/be.svg` },
    { id: 13, name: 'Uruguay',       short_name: 'URU', logo: `${MEDIA_URL}/uy.svg` },
    { id: 14, name: 'Serbia',        short_name: 'SRB', logo: `${MEDIA_URL}/rs.svg` },
    { id: 15, name: 'Morocco',       short_name: 'MAR', logo: `${MEDIA_URL}/ma.svg` },
    { id: 16, name: 'Japan',         short_name: 'JPN', logo: `${MEDIA_URL}/jp.svg` },
];
