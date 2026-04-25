import type { Team } from '../../../types/index';
import './AwayTeam.css';

type Props = {
    team: Team;
}

const AwayTeam = ({team} : Props) => {
    return (
        <span className="fixture-team-away">
            {team.logo
                 ? <span><img src={team.logo} alt={team.shortName} /></span>
                 : <span>{team.shortName}</span>
            }
            <text>{team.name}</text>
        </span>
    );
};

export default AwayTeam;