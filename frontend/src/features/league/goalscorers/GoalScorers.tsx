import { useState, useEffect } from 'react';
import { getTopGoalScorers } from '../../../api/players';
import { JerseyIcon } from '../../../components/icons/Icons';
import type { TopScorerEntry } from '../../../types';
import './GoalScorers.css';

const rankBadgeClass = (index: number) => {
    if (index === 0) return 'rank-badge first';
    if (index === 1) return 'rank-badge second';
    if (index === 2) return 'rank-badge third';
    return 'rank-badge';
};

const GoalScorers = () => {
    const [players, setPlayers] = useState<TopScorerEntry[]>([]);

    const getPositionFull = (player_position: string) => {
        if (player_position === 'GK') {
            return "Goalkeeper"
        }
        
        if (player_position === 'DF') {
            return "Defender"
        }

        if (player_position === 'MD') {
            return "Midfielder"
        }

        return 'Forward'
    }

    useEffect(() => {
        getTopGoalScorers().then(setPlayers).catch(() => {});
    }, []);

    return (
        <section className="goalscorers-table-section">
            <div className="top-goalscorers-table-container">
                <div className="table-header-flex">
                    <h2 className="section-title">Top Goalscorers</h2>
                </div>
                <div className="table-responsive-wrapper">
                    <table className="goalscorers-table">
                        <thead>
                            <tr>
                                <th className="col-rank">Pos</th>
                                <th>Player</th>
                                <th className="col-goals">Goals</th>
                                <th className="col-assists">Assists</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player, index) => (
                                <tr key={player.id}>
                                    <td className="col-rank">
                                        <div className={rankBadgeClass(index)}>
                                            {index + 1}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="player-info">
                                            <div className="jersey-number">
                                                <JerseyIcon size={32} color="#ffffff" />
                                                <span className="jersey-number-text">{player.jersey_number}</span>
                                            </div>
                                            <div className="player-meta">
                                                <span className="player-name">
                                                    {player.name}
                                                    {player.team && (
                                                        <img
                                                            src={player.team.logo}
                                                            alt={player.team.name}
                                                            className="player-name-flag"
                                                        />
                                                    )}
                                                </span>
                                                <span className="player-position">{getPositionFull(player.position)}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="highlight-cell col-goals">{player.goal_count}</td>
                                    <td className="col-assists">{player.assist_count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default GoalScorers;
