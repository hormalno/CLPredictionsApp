import { useState, useEffect } from 'react';
import { TargetIcon, ChevronDownIcon, LockIcon } from '../../../components/icons/Icons';
import { getTeams } from '../../../api/teams';
import { getPlayersByTeam } from '../../../api/players';
import { submitTopScorerPrediction, getUserTopScorerPrediction } from '../../../api/predictions';
import type { Team, Player } from '../../../types';
import './PredictGoalscorer.css';

const PredictGoalscorer = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [players, setPlayers] = useState<Player[]>([]);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [saved, setSaved] = useState(false);
    const [locked, setLocked] = useState(false);
    const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        getTeams().then(setTeams).catch(() => {});

        getUserTopScorerPrediction().then(({ prediction, tournament_locked }) => {
            setLocked(tournament_locked);
            if (!prediction) return;
            const teamId = String(prediction.player.team);
            setSelectedTeam(teamId);
            setSelectedPlayer(String(prediction.player.id));
            setSaved(true);
            getPlayersByTeam(Number(teamId)).then(setPlayers).catch(() => {});
        }).catch(() => {});
    }, []);

    const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const teamId = e.target.value;
        setSelectedTeam(teamId);
        setSelectedPlayer('');
        setPlayers([]);
        setFeedback(null);
        if (teamId) {
            getPlayersByTeam(Number(teamId)).then(setPlayers).catch(() => {});
        }
    };

    const handleSubmit = () => {
        if (!selectedTeam || !selectedPlayer) {
            setFeedback({ message: 'Please select both a team and a player.', type: 'error' });
            return;
        }
        submitTopScorerPrediction(Number(selectedPlayer))
            .then(() => {
                const player = players.find(p => String(p.id) === selectedPlayer);
                setFeedback({ message: `Prediction for ${player?.name} saved!`, type: 'success' });
                setSaved(true);
            })
            .catch(() => {
                setFeedback({ message: 'Failed to save prediction. Please try again.', type: 'error' });
            });
    };

    return (
        <section className="prediction-container">
            <div className="goalscorer-prediction-card">
                <div className="prediction-header">
                    <div className="icon-wrapper">
                        <TargetIcon size={24} />
                    </div>
                    <h2 className="goalscorer-prediction-title">Predict the Goalscorers</h2>
                    <p>Pick your star players and dominate the leaderboard with your friends.</p>
                </div>
                {locked ? (
                    <div className="prediction-locked">
                        <div className="locked-banner">
                            <LockIcon size={16} />
                            <span>Predictions closed</span>
                        </div>
                        <div className="form-group">
                            {/* <label className="section-content">Team</label> */}
                            <div className="locked-value">
                                {teams.find(t => String(t.id) === selectedTeam)?.name ?? '—'}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="section-content">Player</label>
                            <div className="locked-value">
                                {(() => {
                                    const p = players.find(p => String(p.id) === selectedPlayer);
                                    return p ? `${p.jersey_number} ${p.name} (${p.position})` : '—';
                                })()}
                            </div>
                        </div>
                    </div>
                ) : (
                    <form className="prediction-form">
                        <div className="form-group">
                            <label htmlFor="teamSelect" className="section-content">Select Team</label>
                            <div className="select-wrapper">
                                <select
                                    id="teamSelect"
                                    name="team"
                                    required
                                    disabled={saved}
                                    className="form-select"
                                    value={selectedTeam}
                                    onChange={handleTeamChange}
                                >
                                    <option value="" disabled>Choose a team...</option>
                                    {teams.map(team => (
                                        <option key={team.id} value={team.id}>{team.name}</option>
                                    ))}
                                </select>
                                <div className="select-icon">
                                    <ChevronDownIcon size={24} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="playerSelect" className="section-content">Select Player</label>
                            <div className="select-wrapper">
                                <select
                                    id="playerSelect"
                                    name="player"
                                    required
                                    disabled={!selectedTeam || saved}
                                    className="form-select"
                                    value={selectedPlayer}
                                    onChange={e => setSelectedPlayer(e.target.value)}
                                >
                                    <option value="" disabled>
                                        {selectedTeam ? 'Choose a player...' : 'Select a team first...'}
                                    </option>
                                    {players.map(player => (
                                        <option key={player.id} value={player.id}>{player.jersey_number} {player.name} ({player.position})</option>
                                    ))}
                                </select>
                                <div className="select-icon">
                                    <ChevronDownIcon size={24} />
                                </div>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="submit-btn btn-primary btn btn-lg"
                            onClick={saved
                                ? () => { setSaved(false); setFeedback(null); }
                                : handleSubmit
                            }
                        >
                            <span>{saved ? 'Edit Prediction' : 'Save Prediction'}</span>
                        </button>
                        {feedback && (
                            <div className={`form-feedback ${feedback.type}`}>
                                {feedback.message}
                            </div>
                        )}
                    </form>
                )}
            </div>
        </section>
    );
};

export default PredictGoalscorer;