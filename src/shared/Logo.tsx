type LogoProps = {
  className?: string;
};

export function Logo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-gradient-left" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff00c8" />
          <stop offset="60%" stopColor="#7a5aff" />
          <stop offset="100%" stopColor="#4dd0ff" />
        </linearGradient>
        <linearGradient id="logo-gradient-right" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff9a00" />
          <stop offset="60%" stopColor="#ff3b3b" />
          <stop offset="100%" stopColor="#ff00c8" />
        </linearGradient>
        <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#logo-glow)">
        <rect
          x="6"
          y="10"
          width="12"
          height="44"
          rx="2"
          fill="none"
          stroke="#000000"
          strokeOpacity={0.35}
          strokeWidth={3}
        />
        <rect
          x="6"
          y="10"
          width="12"
          height="44"
          rx="2"
          fill="url(#logo-gradient-left)"
          stroke="url(#logo-gradient-left)"
          strokeWidth={1.6}
        />
        <g
          stroke="#ffffff"
          strokeOpacity={0.35}
          strokeLinecap="round"
          strokeWidth={1.6}
        >
          <path d="M9 18 H15" />
          <path d="M9 24 H15" />
          <path d="M9 30 H15" />
        </g>

        <rect
          x="24"
          y="6"
          width="14"
          height="52"
          rx="2"
          fill="none"
          stroke="#000000"
          strokeOpacity={0.35}
          strokeWidth={3}
        />
        <rect
          x="24"
          y="6"
          width="14"
          height="52"
          rx="2"
          fill="#fcfcfc"
          stroke="#e6e6e6"
          strokeWidth={1.6}
        />
        <g
          stroke="#6b6375"
          strokeOpacity={0.28}
          strokeLinecap="round"
          strokeWidth={1.6}
        >
          <path d="M26 16 H36" />
          <path d="M26 24 H36" />
          <path d="M26 32 H36" />
        </g>

        <rect
          x="44"
          y="12"
          width="14"
          height="40"
          rx="2"
          fill="none"
          stroke="#000000"
          strokeOpacity={0.35}
          strokeWidth={3}
        />
        <rect
          x="44"
          y="12"
          width="14"
          height="40"
          rx="2"
          fill="url(#logo-gradient-right)"
          stroke="url(#logo-gradient-right)"
          strokeWidth={1.6}
        />
        <g
          stroke="#ffffff"
          strokeOpacity={0.28}
          strokeLinecap="round"
          strokeWidth={1.6}
        >
          <path d="M47 20 V44" />
          <path d="M51 20 V44" />
          <path d="M55 20 V44" />
        </g>
      </g>
    </svg>
  );
}
