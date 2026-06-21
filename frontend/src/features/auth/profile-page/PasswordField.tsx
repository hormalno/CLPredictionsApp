import { useState } from "react";
import type { ReactNode } from "react";
import { EyeIcon } from "../../../components/icons/Icons";

/* ---------- A password field with show/hide toggle ---------- */
type Props = {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    children?: ReactNode;
};

const PasswordField = ({ id, label, value, onChange, children }: Props) => {
    const [shown, setShown] = useState(false);
    return (
        <div className="pm-field pm-has-toggle">
            <label className="pm-label" htmlFor={id}>{label}</label>
            <div className="pm-input-wrap">
                <input
                    id={id}
                    className="pm-input"
                    type={shown ? "text" : "password"}
                    placeholder="••••••••"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <button type="button" className="pm-eye" aria-label="Show password" onClick={() => setShown((s) => !s)}>
                    <EyeIcon />
                </button>
            </div>
            {children}
        </div>
    );
};

export default PasswordField;
