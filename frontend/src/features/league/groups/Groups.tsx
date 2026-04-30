import { useEffect, useState } from 'react';
import { getGroups } from '../../../api';
import Group from '../../group/Group';
import type { Group as GroupType } from '../../../types/group'

const Groups = () => {
    const [groups, setGroups] = useState<GroupType[] | null>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getGroups()
        .then(setGroups)
        .catch(() => setError('No matches found'))
        .finally(() => setLoading(false));
    }, [])
    
  return (
    <>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {groups && groups.map((group) => (
            <Group key={group.name} group={group} />
        ))}
    </>
    );
};

export default Groups;