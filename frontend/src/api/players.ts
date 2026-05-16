import client from './client';
import type { PlayerSummary } from '../types';

export const getPlayersByTeam = (teamId: number) =>
    client.get<PlayerSummary[]>(`/players/?team=${teamId}`).then(res => res.data);
