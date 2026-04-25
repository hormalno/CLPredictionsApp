import type { Team } from '../../../types/index';
import './TeamNextMatch.css';

type Props = {
    team: Team;
}

const TeamNextMatch = ({team} : Props) => {
    return (
        <div className="next-match-team ">
            <div className="next-match-team-logo">
                {team.logo
                    ? <img src={team.logo} alt={team.short_name} />
                    : <span>{team.short_name}</span>
                }
            </div>
            <span className="next-match-team-name">{team.name}</span>
        </div>
    );
};

export default TeamNextMatch;