import { useState, useEffect } from 'react';
import { getTopTeamGoalStats } from '../../../api/teams';
import PlayerTeam from '../../teams/player-team/PlayerTeam';
import type { TeamGoalStats } from '../../../types';
import '../goalscorers/GoalScorers.css';

const rankBadgeClass = (index: number) => {
    if (index === 0) return 'rank-badge first';
    if (index === 1) return 'rank-badge second';
    if (index === 2) return 'rank-badge third';
    return 'rank-badge';
};

const TeamMostGoals = () => {
    const [teams, setTeams] = useState<TeamGoalStats[]>([]);

    useEffect(() => {
        getTopTeamGoalStats().then(setTeams).catch(() => {});
    }, []);

    return (
        <section className="goalscorers-table-section">
            <div className="top-goalscorers-table-container">
                <div className="table-header-flex">
                    <h2 className="section-title">Top Scoring Teams</h2>
                </div>
                <div className="table-responsive-wrapper">
                    <table className="goalscorers-table">
                        <thead>
                            <tr>
                                <th className="col-rank">Pos</th>
                                <th>Team</th>
                                <th className="col-goals">Goals</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((team, index) => (
                                <tr key={team.id}>
                                    <td className="col-rank">
                                        <div className={rankBadgeClass(index)}>
                                            {index + 1}
                                        </div>
                                    </td>
                                    <td>
                                        <PlayerTeam team={team} />
                                    </td>
                                    <td className="highlight-cell col-goals">{team.total_goals}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default TeamMostGoals;
