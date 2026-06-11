import { useCallback, useEffect, useMemo, useState } from 'react';
import { getGroups } from '../../../api';
import { getUserGroupPredictions, submitGroupPrediction } from '../../../api/predictions';
import GroupPrediction from '../../group/GroupPrediction';
import type { Group, GroupPrediction as GroupPredictionType } from '../../../types';
import './PredictionGroupStandings.css';

const PredictionGroupStandings = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [predictions, setPredictions] = useState<GroupPredictionType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refreshPredictions = useCallback(() => {
        return getUserGroupPredictions().then(setPredictions).catch(() => {});
    }, []);

    useEffect(() => {
        Promise.all([
            getGroups().then(setGroups).catch(() => setError('Failed to load groups.')),
            refreshPredictions(),
        ]).finally(() => setLoading(false));
    }, [refreshPredictions]);

    const predictionByGroupName = useMemo(
        () => new Map(predictions.map(p => [p.group_name, p])),
        [predictions]
    );

    const locked = predictions[0]?.locked ?? false;

    const handleSelect = async (groupId: number, teamId: number) => {
        if (locked) return;
        try {
            await submitGroupPrediction(groupId, teamId);
            await refreshPredictions();
        } catch {
            // submission rejected (e.g. locked after page load)
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <section className="group-standings-section">
            <div className="group-standings-container">
                <div className="group-predictions-grid">
                    {groups.map(group => {
                        const prediction = predictionByGroupName.get(group.name);
                        return (
                            <GroupPrediction
                                key={group.id}
                                group={group}
                                selectedTeamId={prediction?.group_winner_predict.id ?? null}
                                onSelect={(teamId: number) => handleSelect(group.id, teamId)}
                                locked={locked}
                                correct={prediction?.group_winner_correct ?? null}
                                winnerTeamId={
                                    group.teams.length > 0 && group.teams.every(t => t.played === group.teams.length - 1)
                                        ? group.teams[0].id
                                        : null
                                }
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PredictionGroupStandings;
