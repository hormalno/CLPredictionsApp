import type { Team } from '../../../types/index';
import './TeamNextMatch.css';

type Props = {
    team: Team | null;
    placeholder: string | null;
}

const TeamNextMatch = ({team, placeholder} : Props) => {
    return (
        <div className="next-match-team ">
            <div className="next-match-team-logo">
                {team
                    ? <img src={team.logo} alt={team.short_name} />
                    : <span>{placeholder}</span>
                }
            </div>
            <span className="next-match-team-name">{team ? team.name : placeholder}</span>
        </div>
    );
};

export default TeamNextMatch;