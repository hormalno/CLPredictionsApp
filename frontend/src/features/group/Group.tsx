import './Group.css';

const Group = () => {
    const mockupData = [
        {
            teamName: 'The Predictors',
            wins: 12,
            draws: 2,
            losses: 1,
            homeGoals: 7,
            awayGoals: 5,
            points: 38,
        },
        {
            teamName: 'Goal Seekers',
            wins: 10,
            draws: 3,
            losses: 2,
            homeGoals: 1,
            awayGoals: 4,
            points: 33,
        },
        {
            teamName: 'Match Masters',
            wins: 8,
            draws: 4,
            losses: 3,
            homeGoals: 5,
            awayGoals: 5,
            points: 28,
        },
        {
            teamName: 'Point Pickers',
            wins: 6,
            draws: 2,
            losses: 2,
            homeGoals: 4,
            awayGoals: 2,
            points: 20,
        }
    ];

    return (
        <section className="group-section">
          <div className="group-section-container">
            <div className="header-content">
              <div className="title-wrapper">
                <h2 className="group-section-title section-title">Group A</h2>
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
                    {mockupData.map((team, index) => (
                      <tr
                        key={index}
                        className={index === 0 ? 'top-performer' : index === 1 ? 'second-place' : ''}
                      >
                        <td>{index + 1}</td>
                        <td className="team-cell">{team.teamName}</td>
                        <td>{team.wins}</td>
                        <td>{team.draws}</td>
                        <td>{team.losses}</td>
                        <td>{team.homeGoals}</td>
                        <td>{team.awayGoals}</td>
                        <td>{team.homeGoals - team.awayGoals > 0 ? '+' : ''}{team.homeGoals - team.awayGoals}</td>
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
