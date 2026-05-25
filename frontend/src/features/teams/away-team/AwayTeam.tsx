import type { Team } from '../../../types/index';
import './AwayTeam.css';

type Props = {
    team: Team | null;
    placeholder: string;
}

const AwayTeam = ({ team, placeholder }: Props) => {
    return (
        <span className="fixture-team-away">
            <span className="team-logo">
                {team
                    ? team.logo
                        ? <img src={team.logo} alt={team.short_name} />
                        : team.short_name
                    : null
                }
            </span>
            <span>{team ? team.name : placeholder}</span>
        </span>
    );
};

export default AwayTeam;
