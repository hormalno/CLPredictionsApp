import { PencilIcon } from "../../../components/icons/Icons";
import type { ProfileStats } from "./types";

/* ---------- Identity sidebar ---------- */
type Props = {
    username: string;
    stats: ProfileStats;
};

const IdentityCard = ({ username, stats }: Props) => {
    const initial = (username || "user").slice(0, 2).toUpperCase();
    return (
        <aside className="pm-card pm-identity">
            <div className="pm-avatar-wrap">
                <div className="pm-avatar">{initial}</div>
                <button className="pm-avatar-edit" title="Change photo">
                    <PencilIcon />
                </button>
            </div>
            <h2>{username || "user"}</h2>
            <div className="pm-stats">
                <div className="pm-stat"><div className="pm-num">{stats.points}</div><div className="pm-lbl">Points</div></div>
                <div className="pm-stat"><div className="pm-num">{stats.rank}</div><div className="pm-lbl">Rank</div></div>
            </div>
        </aside>
    );
};

export default IdentityCard;
