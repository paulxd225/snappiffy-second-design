import logoSrc from '../assets/fulllogo_transparent.png';

interface LogoProps {
  size?: number;
}

export function Logo({ size = 40 }: LogoProps) {
  return (
    <img
      src={logoSrc}
      alt="Snappiffy"
      style={{
        height: size * 2.2,
        width: 'auto',
        display: 'block',
        filter: 'drop-shadow(0 4px 12px rgba(124,216,90,.25))',
      }}
    />
  );
}
