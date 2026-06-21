import { useState } from "react";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { ProfileForm } from "./types";

/* ---------- Account details ---------- */
type Props = {
    form: ProfileForm;
    setForm: Dispatch<SetStateAction<ProfileForm>>;
    onSave: () => Promise<void> | void;
    onReset: () => void;
};

const AccountDetails = ({ form, setForm, onSave, onReset }: Props) => {
    const [saving, setSaving] = useState(false);
    const upd = (k: keyof ProfileForm) => (e: ChangeEvent<HTMLInputElement>) =>
        setForm((f) => ({ ...f, [k]: e.target.value }));

    const save = async () => {
        setSaving(true);
        try {
            await onSave();
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="pm-card">
            <div className="pm-card-title">Account Details</div>
            <div className="pm-card-sub">Update your username and contact information.</div>
            <div className="pm-field">
                <label className="pm-label" htmlFor="pm-username">Username</label>
                <input id="pm-username" className="pm-input" value={form.username} onChange={upd("username")} />
            </div>
            <div className="pm-field">
                <label className="pm-label" htmlFor="pm-email">Email Address</label>
                <input id="pm-email" className="pm-input" type="email" value={form.email} onChange={upd("email")} />
            </div>
            <div className="pm-card-foot">
                <button className="pm-btn pm-btn-ghost" onClick={onReset} disabled={saving}>Cancel</button>
                <button className="pm-btn pm-btn-primary" onClick={save} disabled={saving}>
                    {saving ? "Saving…" : "Save Changes"}
                </button>
            </div>
        </section>
    );
};

export default AccountDetails;
