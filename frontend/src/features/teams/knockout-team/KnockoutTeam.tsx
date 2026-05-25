import type { Team } from "../../../types"

type Props = {
    team: Team | null;
    placeholder: string;
}

const KnockoutTeam = ({ team, placeholder }: Props) => {
    return (
        <>
        {team
            ? (<img src={team.logo} alt={team.name} className="knockout-match-card-flag" />)
            : (<span className="knockout-match-card-flag-placeholder" />)
        }
        <span className="knockout-match-card-team-name">{team ? team.name : placeholder}</span>
        </>
    )
};

export default KnockoutTeam;