// Central place for all date/time display settings.
// Change DISPLAY_TIMEZONE to shift grouping and "Tonight/Tomorrow" logic to a different zone.
export const DISPLAY_TIMEZONE = 'Europe/Sofia';

// Locale used for time display (hour:minute)
const TIME_LOCALE = 'en-GB';

// Locale used for month/weekday labels
const DATE_LOCALE = 'en-GB';

/** Groups an array of objects that have a `date` string by calendar day in DISPLAY_TIMEZONE. */
export function groupByDate<T extends { date: string }>(items: T[]): Record<string, T[]> {
    return items.reduce<Record<string, T[]>>((acc, item) => {
        const key = new Date(item.date).toLocaleDateString('sv-SE', { timeZone: DISPLAY_TIMEZONE });
        (acc[key] ??= []).push(item);
        return acc;
    }, {});
}

/** "Mon, 11 June" — used as section headers. */
export function formatSectionDate(dateStr: string): string {
    const d = new Date(dateStr);
    const weekday = d.toLocaleDateString(DATE_LOCALE, { weekday: 'short', timeZone: DISPLAY_TIMEZONE });
    const dayMonth = d.toLocaleDateString(DATE_LOCALE, { day: 'numeric', month: 'long', timeZone: DISPLAY_TIMEZONE });
    return `${weekday}, ${dayMonth}`;
}

/** "11 Jun" — compact date for match cards. */
export function formatShortDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString(DATE_LOCALE, {
        day: 'numeric',
        month: 'short',
        timeZone: DISPLAY_TIMEZONE,
    });
}

/** "21:00" — time for match cards. */
export function formatTime(dateStr: string): string {
    return new Date(dateStr).toLocaleTimeString(TIME_LOCALE, {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: DISPLAY_TIMEZONE,
    });
}

/** "Tonight, 21:00" / "Tomorrow, 21:00" / "Jun 11, 21:00" — for upcoming match cards. */
export function formatMatchDate(dateStr: string): string {
    const match = new Date(dateStr);
    const now = new Date();

    const toDay = (d: Date) =>
        new Date(d.toLocaleDateString('sv-SE', { timeZone: DISPLAY_TIMEZONE }));

    const matchDay = toDay(match);
    const today = toDay(now);
    const diffDays = Math.round((matchDay.getTime() - today.getTime()) / 86400000);

    const time = formatTime(dateStr);

    if (diffDays === 0) return `Tonight, ${time}`;
    if (diffDays === 1) return `Tomorrow, ${time}`;

    const day = String(match.getDate()).padStart(2, '0');
    const month = match.toLocaleString(DATE_LOCALE, { month: 'short', timeZone: DISPLAY_TIMEZONE });
    return `${month} ${day}, ${time}`;
}
