import type { Team } from "../../../types";
import './PlayerTeam.css';

type Props = {
    team: Team;
}

const PlayerTeam = ({ team }: Props) => {
    return (
        <div className="player-team">
            {team
                ? <img src={team.logo} alt={team.name} className="player-match-card-flag" />
                : <span className="player-match-card-flag-placeholder" />
            }
            <span className="player-match-card-team-name">{team.name}</span>
        </div>
    )
};

export default PlayerTeam;