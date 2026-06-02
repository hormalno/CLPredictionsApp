import './Icons.css';

type IconProps = {
    size?: number;
    color?: string;
    className?: string;
};

const cls = (base: string, extra?: string) => [base, extra].filter(Boolean).join(' ');

export const CalendarIcon = ({ size = 20, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" stroke={color} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls('icon-calendar', className)}>
        <rect x="3" y="4" rx="2" ry="2" width="18" height="18" />
        <path d="M3 10h18" />
        <path d="M8 2v4" />
        <path d="M16 2v4" />
    </svg>
);

export const ClockIcon = ({ size = 16, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={cls('icon-clock', className)}>
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m9 0l3 2m-3-7v5" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const BarChartIcon = ({ size = 24, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={cls('icon-bar-chart', className)}>
        <path d="M3 3v16a2 2 0 0 0 2 2h16M7 16h8m-8-5h12M7 6h3" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const TrophyIcon = ({ size = 24, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={cls('icon-trophy', className)}>
        <g fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978m7-7.318v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978M18 9h1.5a1 1 0 0 0 0-5H18M4 22h16" />
            <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm0 0H4.5a1 1 0 0 1 0-5H6" />
        </g>
    </svg>
);

export const TrophyCupIcon = ({ size = 20, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls('icon-trophy-cup', className)}>
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
);

export const TrophyFilledIcon = ({ size = 24, color = 'currentColor', className }: IconProps) => (
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={cls('icon-trophy-filled', className)}>
        <path d="M17 3a1 1 0 0 1 .993.883L18 4v2.17a3 3 0 1 1 0 5.659V12a6 6 0 0 1-5 5.917V20h3a1 1 0 0 1 .117 1.993L16 22H8a1 1 0 0 1-.117-1.993L8 20h3v-2.083a6 6 0 0 1-4.996-5.692L6 12v-.171a3 3 0 0 1-3.996-2.653L2.001 9l.005-.176A3 3 0 0 1 6.001 6.17L6 4a1 1 0 0 1 1-1zM5 8a1 1 0 1 0 0 2a1 1 0 0 0 0-2m14 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2" fill={color} />
    </svg>
);

export const ChevronLeftIcon = ({ size = 16, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" stroke={color} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls('icon-chevron-left', className)}>
        <path d="m15 18-6-6 6-6" />
    </svg>
);

export const ChevronRightIcon = ({ size = 16, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" stroke={color} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls('icon-chevron-right', className)}>
        <path d="m9 18 6-6-6-6" />
    </svg>
);

export const ArrowLeftIcon = ({ size = 24, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" stroke={color} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls('icon-arrow-left', className)}>
        <path d="m12 19-7-7 7-7m7 7H5" />
    </svg>
);

export const SoccerBallIcon = ({ size = 24, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" stroke={color} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls('icon-soccer-ball', className)}>
        <circle r="10" cx="12" cy="12" />
        <circle r="1" cx="12" cy="12" />
    </svg>
);

export const UserIcon = ({ size = 24, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" stroke={color} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls('icon-user', className)}>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle r="4" cx="12" cy="7" />
    </svg>
);

export const CircleCheckIcon = ({ size = 16, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" stroke={color} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls('icon-circle-check', className)}>
        <circle r="10" cx="12" cy="12" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);

export const CheckCircleIcon = ({ size = 24, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" stroke={color} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls('icon-check-circle', className)}>
        <path d="M21.801 10A10 10 0 1 1 17 3.335" />
        <path d="m9 11 3 3L22 4" />
    </svg>
);

export const XCircleIcon = ({ size = 24, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" stroke={color} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls('icon-x-circle', className)}>
        <circle r="10" cx="12" cy="12" />
        <path d="m15 9-6 6m0-6 6 6" />
    </svg>
);

export const GlobeIcon = ({ size = 20, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={cls('icon-globe', className)}>
        <g fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle r="10" cx="12" cy="12" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20M2 12h20" />
        </g>
    </svg>
);

export const ChevronDownIcon = ({ size = 16, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={cls('icon-chevron-down', className)}>
        <path d="m6 9 6 6 6-6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const MenuIcon = ({ size = 24, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={cls('icon-menu', className)}>
        <path d="M4 5h16M4 12h16M4 19h16" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const FootballCloseIcon = ({ size = 24, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={cls('icon-football-close', className)}>
        <path d="m15 18-.722-3.25M2 8a10.645 10.645 0 0 0 20 0m-2 7-1.726-2.05M4 15l1.726-2.05M9 18l.722-3.25" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const XSquareIcon = ({ size = 24, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" stroke={color} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls('icon-x-square', className)}>
        <rect x="3" y="3" rx="2" ry="2" width="18" height="18" />
        <path d="m15 9-6 6" />
        <path d="m9 9 6 6" />
    </svg>
);

export const FacebookIcon = ({ size = 24, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" stroke={color} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls('icon-facebook', className)}>
        <path d="M7 10v4h3v7h4v-7h3l1-4h-4V8a1 1 0 0 1 1-1h3V3h-3a5 5 0 0 0-5 5v2z" />
    </svg>
);

export const TwitterIcon = ({ size = 24, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" stroke={color} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls('icon-twitter', className)}>
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
);

export const InstagramIcon = ({ size = 24, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" stroke={color} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls('icon-instagram', className)}>
        <rect x="2" y="2" rx="5" ry="5" width="20" height="20" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

export const TrendUpIcon = ({ size = 16, color = 'currentColor', className }: IconProps) => (
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={cls('icon-trend-up', className)}>
        <path d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0" fill={color} clipRule="evenodd" fillRule="evenodd" />
    </svg>
);

export const TrendNeutralIcon = ({ size = 24, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={cls('icon-trend-neutral', className)}>
        <path d="M5 12h14" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const TrendDownIcon = ({ size = 16, color = 'currentColor', className }: IconProps) => (
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={cls('icon-trend-down', className)}>
        <path d="M4.22 4.22a.75.75 0 0 0 0 1.06l5.22 5.22H5.75a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 .75-.75v-5.5a.75.75 0 0 0-1.5 0v3.69L5.28 4.22a.75.75 0 0 0-1.06 0" fill={color} clipRule="evenodd" fillRule="evenodd" />
    </svg>
);

export const LineChartIcon = ({ size = 32, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls('icon-line-chart', className)}>
        <path d="m19 9-5 5-4-4-3 3" />
        <path d="M3 3v16a2 2 0 0 0 2 2h16" />
    </svg>
);

export const LockIcon = ({ size = 18, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" stroke={color} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls('icon-lock', className)}>
        <rect x="3" y="11" rx="2" ry="2" width="18" height="11" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

export const SaveIcon = ({ size = 16, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" stroke={color} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls('icon-save', className)}>
        <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
        <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
        <path d="M7 3v4a1 1 0 0 0 1 1h7" />
    </svg>
);

export const EditIcon = ({ size = 16, color = 'currentColor', className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls('icon-save', className)}>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
);

export const UsersGroupIcon = ({ size = 32, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls('icon-users-group', className)}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.128a4 4 0 0 1 0 7.744" />
    </svg>
);

export const LogOutIcon = ({ size = 18, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls('icon-logout', className)}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

export const CheckmarkIcon = ({ size = 14, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={cls('icon-checkmark', className)}>
        <path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 6L9 17l-5-5" />
    </svg>
);

export const XMarkIcon = ({ size = 14, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={cls('icon-xmark', className)}>
        <path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M18 6L6 18M6 6l12 12" />
    </svg>
);

export const LogInIcon = ({ size = 18, color = 'currentColor', className }: IconProps) => (
    <svg fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls('icon-login', className)}>
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        <polyline points="10 17 15 12 10 7" />
        <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
);
