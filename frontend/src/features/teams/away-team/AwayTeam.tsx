import type { Team } from '../../../types/index';
import './AwayTeam.css';

type Props = {
    team: Team;
}

const AwayTeam = ({team} : Props) => {
    return (
        <span className="fixture-team-away">
            <span className="team-logo">
                {team.logo
                    ? <img src={team.logo} alt={team.short_name} />
                    : team.short_name
                }
            </span>
            <span>{team.name}</span>
        </span>
    );
};

export default AwayTeam;