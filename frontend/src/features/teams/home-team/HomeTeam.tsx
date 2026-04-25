import type { Team } from '../../../types/index';

type Props = {
    team: Team;
}

const HomeTeam = ({team} : Props) => {
    return (
        <span className="fixture-team-home">
            <text>{team.name}</text>
            {team.logo
                ? <span><img src={team.logo} alt={team.shortName} /></span>
                : <span>{team.shortName}</span>
            }
        </span>
    );
};

export default HomeTeam;