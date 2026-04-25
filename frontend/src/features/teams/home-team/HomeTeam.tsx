import type { Team } from '../../../types/index';
import './HomeTeam.css';

type Props = {
    team: Team;
}

const HomeTeam = ({team} : Props) => {
    return (
        <span className="fixture-team-home">
            <span>{team.name}</span>
            <span className="team-logo">
                {team.logo
                    ? <img src={team.logo} alt={team.shortName} />
                    : team.shortName
                }
            </span>
        </span>
    );
};

export default HomeTeam;