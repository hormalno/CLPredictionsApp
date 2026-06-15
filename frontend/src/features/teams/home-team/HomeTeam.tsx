import type { Team } from '../../../types/index';
import './HomeTeam.css';

type Props = {
    team: Team | null;
    placeholder: string;
}

const HomeTeam = ({ team, placeholder }: Props) => {
    return (
        <span className="fixture-team-home">
            {team ? (
                <>
                    <span className="team-name-full">{team.name}</span>
                    <span className="team-name-short">{team.short_name}</span>
                </>
            ) : (
                <span>{placeholder}</span>
            )}
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
