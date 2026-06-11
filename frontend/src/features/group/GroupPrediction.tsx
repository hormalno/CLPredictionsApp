import type React from 'react';
import TeamGroup from '../teams/team-group/TeamGroup';
import { ClockIcon, CheckCircleIcon, XCircleIcon, TrophyCupIcon } from '../../components/icons/Icons';
import type { Group } from '../../types';
import './Group.css';
import './GroupPrediction.css';

type Props = {
    group: Group;
    selectedTeamId: number | null;
    onSelect: (teamId: number) => void;
    locked: boolean;
    correct: boolean | null;
    winnerTeamId: number | null;
};

const GroupPrediction = ({ group, selectedTeamId, onSelect, locked, correct, winnerTeamId }: Props) => {
    return (
        <section className="group-section">
            <div className="group-section-container">
                <div className="header-content">
                    <div className="title-wrapper">
                        <h2 className="group-section-title section-title">Group {group.name}</h2>
                    </div>
                </div>
                <div className="group-card">
                    <div className="group-prediction-list">
                        {group.teams.map((team) => {
                            const isSelected = team.id === selectedTeamId;
                            let btnClass = 'group-prediction-btn';
                            let icon: React.ReactNode = null;
                            if (isSelected) {
                                if (correct === true) { btnClass += ' correct'; icon = <CheckCircleIcon size={18} color="#22c55e" />; }
                                else if (correct === false) { btnClass += ' incorrect'; icon = <XCircleIcon size={18} color="#ef4444" />; }
                                else if (locked) { btnClass += ' pending'; icon = <ClockIcon size={18} color="#f59e0b" />; }
                                else btnClass += ' winner';
                            }
                            return (
                                <button
                                    key={team.id}
                                    className={btnClass}
                                    onClick={() => onSelect(team.id)}
                                    disabled={locked}
                                >
                                    <span className="group-prediction-btn-icon">{icon}</span>
                                    <TeamGroup team={team} />
                                    <span className="group-prediction-btn-icon">
                                        {team.id === winnerTeamId && <TrophyCupIcon size={18} color="#f59e0b" />}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GroupPrediction;
