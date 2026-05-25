import type { Team } from '../../../types/index';
import './HomeTeam.css';

type Props = {
    team: Team | null;
    placeholder: string;
}

const HomeTeam = ({ team, placeholder }: Props) => {
    return (
        <span className="fixture-team-home">
            <span>{team ? team.name : placeholder}</span>
            <span className="team-logo">
                {team
                    ? team.logo
                        ? <img src={team.logo} alt={team.short_name} />
                        : team.short_name
                    : null
                }
            </span>
        </span>
    );
};

export default HomeTeam;
