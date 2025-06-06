import type { SVGProps } from 'react';

export function StatVizLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="120"
      height="30"
      aria-label="StatViz Logo"
      {...props}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <rect x="5" y="5" width="10" height="40" rx="2" fill="url(#logoGradient)" />
      <rect x="20" y="15" width="10" height="30" rx="2" fill="url(#logoGradient)" />
      <rect x="35" y="25" width="10" height="20" rx="2" fill="url(#logoGradient)" />
      <text
        x="55"
        y="35"
        fontFamily="var(--font-geist-sans), Arial, sans-serif"
        fontSize="30"
        fontWeight="bold"
        fill="hsl(var(--foreground))"
      >
        StatViz
      </text>
    </svg>
  );
}
