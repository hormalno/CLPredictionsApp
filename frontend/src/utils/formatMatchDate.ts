export function formatMatchDate(dateStr: string): string {
    const match = new Date(dateStr);
    const now = new Date();

    const matchDay = new Date(match.getFullYear(), match.getMonth(), match.getDate());
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffDays = Math.round((matchDay.getTime() - today.getTime()) / 86400000);

    const time = match.toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' });

    if (diffDays === 0) return `Tonight, ${time}`;
    if (diffDays === 1) return `Tomorrow, ${time}`;

    const day = String(match.getDate()).padStart(2, '0');
    const month = match.toLocaleString('en-GB', { month: 'short' });
    return `${month} ${day}, ${time}`;
}
