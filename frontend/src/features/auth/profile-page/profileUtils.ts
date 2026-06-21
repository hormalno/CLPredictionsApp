// PredictMate · My Profile · shared helpers

export const STRENGTH_COLORS = ["#d9433f", "#d9433f", "#e0922b", "#1f8a5b"];

export function scorePassword(v: string): number {
    let s = 0;
    if (v.length >= 8) s++;
    if (/[A-Z]/.test(v) && /[a-z]/.test(v)) s++;
    if (/\d/.test(v)) s++;
    if (/[^A-Za-z0-9]/.test(v)) s++;
    return s;
}

// Lightweight transient toast — relies on the .pm-toast / .pm-show styles in profile.css
export function notify(message: string): void {
    if (typeof document === "undefined") return;

    const el = document.createElement("div");
    el.className = "pm-toast";
    el.textContent = message;
    document.body.appendChild(el);

    // force reflow so the transition runs, then show
    requestAnimationFrame(() => el.classList.add("pm-show"));

    window.setTimeout(() => {
        el.classList.remove("pm-show");
        window.setTimeout(() => el.remove(), 300);
    }, 2200);
}
