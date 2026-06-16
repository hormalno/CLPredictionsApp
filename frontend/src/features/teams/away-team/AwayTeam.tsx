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
                        ? <img src={team.logo} alt={team.short_name} loading="lazy" decoding="async" />
                        : team.short_name
                    : null
                }
            </span>
            {team ? (
                <>
                    <span className="team-name-full">{team.name}</span>
                    <span className="team-name-short">{team.short_name}</span>
                </>
            ) : (
                <span>{placeholder}</span>
            )}
        </span>
    );
};

export default AwayTeam;
