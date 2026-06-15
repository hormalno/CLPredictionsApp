import type { Team } from '../../../types/index';
import './TeamDetail.css'

type Props = {
    team: Team | null;
    placeholder: string | null;
}

const TeamDetail = ({team, placeholder} : Props) => {
    return (
        <div className="header-match-result__team">
            <div className="header-match-result__team-icon">
            {team ? (<img src={team.logo} alt={team.short_name} />) : ''}
            </div>
            <h1 className="hero-title">
                {team ? (
                    <>
                        <span className="team-name-full">{team.name}</span>
                        <span className="team-name-short">{team.short_name}</span>
                    </>
                ) : placeholder}
            </h1>
        </div>
    )
};

export default TeamDetail;