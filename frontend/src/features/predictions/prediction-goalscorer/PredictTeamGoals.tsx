import { useState, useEffect } from 'react';
import { TargetIcon, ChevronDownIcon, LockIcon, CheckmarkIcon, XMarkIcon } from '../../../components/icons/Icons';
import { getTeams } from '../../../api/teams';
import { submitTopTeamPrediction, getUserTopTeamPrediction } from '../../../api/predictions';
import type { TopTeamPrediction } from '../../../api/predictions';
import { parseApiError } from '../../../api';
import type { Team } from '../../../types';
import './PredictGoalscorer.css';

const PredictTeamGoals = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [saved, setSaved] = useState(false);
    const [locked, setLocked] = useState(false);
    const [prediction, setPrediction] = useState<TopTeamPrediction | null>(null);
    const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        getTeams().then(setTeams).catch(() => {});

        getUserTopTeamPrediction().then(({ prediction, tournament_locked }) => {
            setLocked(tournament_locked);
            setPrediction(prediction);
            if (!prediction) return;
            setSelectedTeam(String(prediction.team.id));
            setSaved(true);
        }).catch(() => {});
    }, []);

    const handleSubmit = () => {
        if (!selectedTeam) {
            setFeedback({ message: 'Please select a team.', type: 'error' });
            return;
        }
        submitTopTeamPrediction(Number(selectedTeam))
            .then(() => {
                const team = teams.find(t => String(t.id) === selectedTeam);
                setFeedback({ message: `Prediction for ${team?.name} saved!`, type: 'success' });
                setSaved(true);
            })
            .catch(err => {
                setFeedback({ message: parseApiError(err), type: 'error' });
            });
    };

    const renderLockedView = () => {
        const team = prediction?.team;
        const resultKnown = prediction?.team_correct !== null && prediction?.team_correct !== undefined;
        return (
            <div className="prediction-locked">
                <div className="locked-banner">
                    <LockIcon size={16} />
                    <span>Predictions closed</span>
                </div>
                <div className="form-group">
                    <label className="section-content">Team</label>
                    <div className="locked-value">{team?.name ?? '—'}</div>
                </div>
                {resultKnown && (
                    <div className={`form-feedback ${prediction.team_correct ? 'success' : 'error'}`}>
                        {prediction.team_correct
                            ? <><CheckmarkIcon size={14} /> Correct! +{prediction.points} pts</>
                            : <><XMarkIcon size={14} /> Incorrect — 0 pts</>}
                    </div>
                )}
            </div>
        );
    };

    return (
        <section className="prediction-container">
            <div className="goalscorer-prediction-card">
                <div className="prediction-header">
                    <div className="icon-wrapper">
                        <TargetIcon size={24} />
                    </div>
                    <h2 className="goalscorer-prediction-title">Top Scoring Team</h2>
                    <p>Pick the team you think will score the most goals in the tournament.</p>
                </div>
                {locked ? renderLockedView() : (
                    <form className="prediction-form">
                        <div className="form-group">
                            <label htmlFor="topTeamSelect" className="section-content">Select Team</label>
                            <div className="select-wrapper">
                                <select
                                    id="topTeamSelect"
                                    name="team"
                                    required
                                    disabled={saved}
                                    className="form-select"
                                    value={selectedTeam}
                                    onChange={e => { setSelectedTeam(e.target.value); setFeedback(null); }}
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

export default PredictTeamGoals;
