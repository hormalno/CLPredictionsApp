import type { Team } from '../../../types/index';
import './TeamGroup.css';

type Props = {
    team: Team;
}

const TeamGroup = ({team} : Props) => {
    return (
        <span className="group-team">            
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

export default TeamGroup;