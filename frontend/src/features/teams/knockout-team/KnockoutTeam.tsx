import type { Team } from "../../../types"
import './KnockoutTeam.css'

type Props = {
    team: Team | null;
    placeholder: string;
}

const KnockoutTeam = ({ team, placeholder }: Props) => {
    return (
        <div className="knockout-team">
            {team
                ? <img src={team.logo} alt={team.name} className="knockout-match-card-flag" />
                : <span className="knockout-match-card-flag-placeholder" />
            }
            <span className="knockout-match-card-team-name">{team ? team.name : placeholder}</span>
        </div>
    )
};

export default KnockoutTeam;