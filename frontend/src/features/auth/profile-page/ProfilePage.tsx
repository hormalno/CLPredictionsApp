import { useEffect, useState } from "react";
import Navigation from "../../../components/navigation/Navigation";
import Footer from "../../../components/footer/Footer";
import IdentityCard from "./IdentityCard";
import AccountDetails from "./AccountDetails";
import ChangePassword from "./ChangePassword";
import DangerZone from "./DangerZone";
import { notify } from "./profileUtils";
import { changePassword as changePasswordRequest, getLeaderboard, getMe, parseApiError, updateMe } from "../../../api";
import type { PasswordPayload, ProfileForm, ProfileStats } from "./types";
import "./profile.css";

const EMPTY_FORM: ProfileForm = { username: "", email: "" };
const EMPTY_STATS: ProfileStats = { points: 0, rank: "—" };

const ProfilePage = () => {
    const [form, setForm] = useState<ProfileForm>(EMPTY_FORM);
    const [initial, setInitial] = useState<ProfileForm>(EMPTY_FORM);
    const [stats, setStats] = useState<ProfileStats>(EMPTY_STATS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        // Leaderboard is only needed for the user's rank — degrade gracefully if it fails.
        Promise.all([getMe(), getLeaderboard().catch(() => [])])
            .then(([meRes, board]) => {
                if (cancelled) return;
                const me = meRes.data;
                const nextForm: ProfileForm = { username: me.username, email: me.email };
                setForm(nextForm);
                setInitial(nextForm);

                const entry = board.find((e) => e.id === me.id);
                setStats({ points: me.points, rank: entry ? `#${entry.rank}` : "—" });
            })
            .catch(() => { if (!cancelled) notify("Could not load your profile"); })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, []);

    const saveAccount = async () => {
        try {
            const { data } = await updateMe({ username: form.username, email: form.email });
            const nextForm: ProfileForm = { username: data.username, email: data.email };
            setForm(nextForm);
            setInitial(nextForm);
            notify("Changes saved");
        } catch (err) {
            notify(parseApiError(err));
        }
    };
    const resetAccount = () => {
        setForm(initial);
        notify("Changes discarded");
    };
    const changePassword = async ({ current, next }: PasswordPayload): Promise<boolean> => {
        try {
            await changePasswordRequest({ current_password: current, new_password: next });
            notify("Password updated");
            return true;
        } catch (err) {
            notify(parseApiError(err));
            return false;
        }
    };
    const deleteAccount = () => {
        notify("Account deletion requested");
    };

    return (
        <>
            <Navigation />
            <div className="pm-root">
                <main className="pm-main">
                    <div className="pm-page-head">
                        <h2 className="section-title">My Profile</h2>
                        <p className="section-subtitle">Manage your account details, password or you can delete the account.</p>
                    </div>
                    {loading ? (
                        <div className="pm-card">Loading your profile…</div>
                    ) : (
                        <div className="pm-layout">
                            <IdentityCard username={form.username} stats={stats} />
                            <div className="pm-stack">
                                <AccountDetails form={form} setForm={setForm} onSave={saveAccount} onReset={resetAccount} />
                                <ChangePassword onSave={changePassword} notify={notify} />
                                <DangerZone onDelete={deleteAccount} />
                            </div>
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </>
    );
};

export default ProfilePage;
