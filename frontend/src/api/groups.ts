import client from './client';
import type { Group } from '../types';

export const getGroups = () =>
    client.get<Group[]>('/groups/').then(res => res.data);
