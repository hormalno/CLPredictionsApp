import './Button.css';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'link';
  size?: 'sm' | 'lg' | 'xl';
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = 'primary', size, children, className, ...props }: ButtonProps) {
  return (
    <button
      className={['btn', `btn-${variant}`, size ? `btn-${size}` : '', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
