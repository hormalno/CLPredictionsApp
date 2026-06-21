import { useState } from "react";
import type { ReactNode } from "react";
import PasswordField from "./PasswordField";
import { scorePassword, STRENGTH_COLORS } from "./profileUtils";
import type { PasswordPayload } from "./types";

/* ---------- Change password ---------- */
type Props = {
    onSave: (payload: PasswordPayload) => Promise<boolean> | boolean | void;
    notify: (message: string) => void;
};

const ChangePassword = ({ onSave, notify }: Props) => {
    const [current, setCurrent] = useState("");
    const [next, setNext] = useState("");
    const [confirm, setConfirm] = useState("");
    const [saving, setSaving] = useState(false);
    const score = scorePassword(next);

    const reset = () => { setCurrent(""); setNext(""); setConfirm(""); };
    const save = async () => {
        if (!current) { notify("Enter your current password"); return; }
        if (!next || next !== confirm) { notify("Passwords must match before saving"); return; }
        setSaving(true);
        try {
            const ok = await onSave({ current, next });
            if (ok !== false) reset();
        } finally {
            setSaving(false);
        }
    };

    let matchNode: ReactNode = null;
    if (confirm) {
        matchNode = confirm === next
            ? <div className="pm-hint" style={{ color: "#1f8a5b" }}>✓ Passwords match</div>
            : <div className="pm-hint" style={{ color: "#d9433f" }}>Passwords do not match</div>;
    }

    return (
        <section className="pm-card">
            <div className="pm-card-title">Change Password</div>
            <div className="pm-card-sub">For your security, choose a strong password you don't use elsewhere.</div>
            <PasswordField id="pm-current" label="Current Password" value={current} onChange={setCurrent} />
            <div className="pm-grid-2">
                <PasswordField id="pm-newpass" label="New Password" value={next} onChange={setNext}>
                    <div className="pm-strength">
                        {[0, 1, 2, 3].map((i) => (
                            <span key={i} style={{ background: next && i < score ? STRENGTH_COLORS[score - 1] : "#e6ddd0" }} />
                        ))}
                    </div>
                </PasswordField>
                <PasswordField id="pm-confirm" label="Confirm New Password" value={confirm} onChange={setConfirm}>
                    {matchNode}
                </PasswordField>
            </div>
            <div className="pm-card-foot">
                <button className="pm-btn pm-btn-ghost" onClick={reset} disabled={saving}>Cancel</button>
                <button className="pm-btn pm-btn-primary" onClick={save} disabled={saving}>
                    {saving ? "Updating…" : "Update Password"}
                </button>
            </div>
        </section>
    );
};

export default ChangePassword;
