import TeamGroup from '../teams/team-group/TeamGroup';
import type { Group as GroupType } from '../../types';
import './Group.css';

const Group = ({ group }: { group: GroupType }) => {

    return (
        <section className="group-section">
          <div className="group-section-container">
            <div className="header-content">
              <div className="title-wrapper">
                <h2 className="group-section-title section-title">Group {group.name}</h2>
              </div>
            </div>
            <div className="group-card">
              <div className="table-container">
                <table className="group-table">
                  <thead>
                    <tr>
                      <th>Pos</th>
                      <th>Team name</th>
                      <th>Win</th>
                      <th>Draw</th>
                      <th>Loss</th>
                      <th>GF</th>
                      <th>GA</th>
                      <th>GD</th>
                      <th className="points-col">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.teams.map((team, index) => (
                        <tr
                          key={team.id}
                          className={index === 0 ? 'top-performer' : index === 1 ? 'second-place' : ''}
                        >
                          <td>{index + 1}</td>
                          <td className="team-cell"><TeamGroup team={team} /></td>
                          <td>{team.wins}</td>
                          <td>{team.draws}</td>
                          <td>{team.losses}</td>
                          <td>{team.goalsFor}</td>
                          <td>{team.goalsAgainst}</td>
                          <td>{team.goalsFor - team.goalsAgainst > 0 ? '+' : ''}{team.goalsFor - team.goalsAgainst}</td>
                          <td className="points-val">{team.points}</td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
    );
};

export default Group;
