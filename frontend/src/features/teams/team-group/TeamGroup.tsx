import './TeamGroup.css';

type Props = {
    team: { id: number; name: string; short_name: string; logo: string };
}

const TeamGroup = ({team} : Props) => {
    return (
        <span className="group-team">            
            <span className="team-logo">
                {team.logo
                    ? <img src={team.logo} alt={team.short_name} />
                    : team.short_name
                }
            </span>
            <span>{team.name}</span>
        </span>
    );
};

export default TeamGroup;