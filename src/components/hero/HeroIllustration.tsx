import { forwardRef } from 'react'

interface HeroIllustrationProps {
  className?: string
}

const HeroIllustration = forwardRef<SVGSVGElement, HeroIllustrationProps>(
  ({ className = '' }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 600 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="screenGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9CA3AF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="deskGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Desk */}
        <g className="illustration-desk">
          <rect x="80" y="280" width="440" height="16" rx="4" fill="url(#deskGradient)" />
          <rect x="120" y="296" width="8" height="80" rx="2" fill="#1e293b" />
          <rect x="472" y="296" width="8" height="80" rx="2" fill="#1e293b" />
        </g>

        {/* Monitor */}
        <g className="illustration-monitor">
          {/* Monitor stand */}
          <rect x="270" y="260" width="60" height="20" rx="2" fill="#1e293b" />
          <rect x="285" y="240" width="30" height="20" fill="#334155" />

          {/* Monitor frame */}
          <rect x="150" y="80" width="300" height="160" rx="8" fill="#0f172a" />
          <rect x="158" y="88" width="284" height="140" rx="4" fill="#0A0A0A" />

          {/* Screen content - Code editor */}
          <g className="illustration-screen">
            <rect x="158" y="88" width="284" height="140" rx="4" fill="#0a0a0a" />

            {/* Code lines */}
            <rect className="code-line" x="175" y="108" width="80" height="4" rx="1" fill="#9CA3AF" opacity="0.7" />
            <rect className="code-line" x="175" y="120" width="120" height="4" rx="1" fill="#60A5FA" opacity="0.5" />
            <rect className="code-line" x="175" y="132" width="60" height="4" rx="1" fill="#a78bfa" opacity="0.6" />
            <rect className="code-line" x="190" y="144" width="100" height="4" rx="1" fill="#93c5fd" opacity="0.4" />
            <rect className="code-line" x="190" y="156" width="70" height="4" rx="1" fill="#9CA3AF" opacity="0.5" />
            <rect className="code-line" x="175" y="168" width="90" height="4" rx="1" fill="#60A5FA" opacity="0.6" />
            <rect className="code-line" x="175" y="180" width="50" height="4" rx="1" fill="#a78bfa" opacity="0.4" />
            <rect className="code-line" x="175" y="192" width="110" height="4" rx="1" fill="#9CA3AF" opacity="0.5" />
            <rect className="code-line" x="175" y="204" width="65" height="4" rx="1" fill="#60A5FA" opacity="0.3" />

            {/* Cursor blink */}
            <rect className="cursor" x="245" y="106" width="2" height="8" fill="#9CA3AF" opacity="0.8" />

            {/* Side panel indicators */}
            <circle cx="170" cy="100" r="3" fill="#ef4444" opacity="0.6" />
            <circle cx="170" cy="112" r="3" fill="#eab308" opacity="0.6" />
            <circle cx="170" cy="124" r="3" fill="#22c55e" opacity="0.6" />
          </g>

          {/* Screen glow */}
          <rect x="158" y="88" width="284" height="140" rx="4" fill="url(#screenGlow)" opacity="0.4" />
        </g>

        {/* Keyboard */}
        <g className="illustration-keyboard">
          <rect x="200" y="250" width="200" height="25" rx="4" fill="#1e293b" />
          {/* Key rows */}
          <g fill="#334155">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
              <rect key={`key1-${i}`} x={210 + i * 15} y="254" width="12" height="6" rx="1" />
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <rect key={`key2-${i}`} x={215 + i * 15} y="262" width="12" height="6" rx="1" />
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <rect key={`key3-${i}`} x={220 + i * 15} y="270" width="12" height="3" rx="1" />
            ))}
          </g>
          {/* Spacebar */}
          <rect x="255" y="270" width="90" height="3" rx="1" fill="#475569" />
        </g>

        {/* Mouse */}
        <g className="illustration-mouse">
          <ellipse cx="460" cy="260" rx="18" ry="25" fill="#1e293b" />
          <ellipse cx="460" cy="260" rx="16" ry="23" fill="#334155" />
          <line x1="460" y1="240" x2="460" y2="252" stroke="#475569" strokeWidth="1" />
          <ellipse cx="460" cy="246" rx="4" ry="6" fill="#475569" />
        </g>

        {/* Coffee mug */}
        <g className="illustration-coffee">
          <rect x="95" y="240" width="35" height="40" rx="4" fill="#1e293b" />
          <rect x="99" y="244" width="27" height="32" rx="2" fill="#0f172a" />
          {/* Coffee surface */}
          <ellipse cx="112" cy="250" rx="12" ry="4" fill="#92400e" opacity="0.8" />
          {/* Handle */}
          <path d="M130 252 C140 252, 140 272, 130 272" stroke="#1e293b" strokeWidth="4" fill="none" />
          {/* Steam */}
          <path className="steam steam-1" d="M105 235 Q107 225, 105 215" stroke="#64748b" strokeWidth="1.5" fill="none" opacity="0.4" />
          <path className="steam steam-2" d="M112 232 Q114 220, 112 208" stroke="#64748b" strokeWidth="1.5" fill="none" opacity="0.3" />
          <path className="steam steam-3" d="M119 235 Q121 225, 119 215" stroke="#64748b" strokeWidth="1.5" fill="none" opacity="0.4" />
        </g>

        {/* Plant */}
        <g className="illustration-plant">
          {/* Pot */}
          <path d="M490 265 L510 265 L505 280 L495 280 Z" fill="#1e293b" />
          <rect x="488" y="262" width="24" height="6" rx="2" fill="#334155" />
          {/* Leaves */}
          <ellipse cx="495" cy="248" rx="8" ry="15" fill="#166534" transform="rotate(-15 495 248)" opacity="0.8" />
          <ellipse cx="505" cy="245" rx="7" ry="14" fill="#15803d" transform="rotate(10 505 245)" opacity="0.7" />
          <ellipse cx="500" cy="240" rx="6" ry="12" fill="#22c55e" opacity="0.6" />
        </g>

        {/* Desk lamp */}
        <g className="illustration-lamp">
          {/* Base */}
          <rect x="130" y="272" width="40" height="8" rx="2" fill="#334155" />
          {/* Arm */}
          <line x1="150" y1="272" x2="145" y2="200" stroke="#475569" strokeWidth="3" />
          <line x1="145" y1="200" x2="165" y2="180" stroke="#475569" strokeWidth="3" />
          {/* Shade */}
          <path d="M150 175 L180 185 L155 185 Z" fill="#1e293b" />
          {/* Light glow */}
          <ellipse className="lamp-glow" cx="165" cy="195" rx="25" ry="40" fill="#fbbf24" opacity="0.1" />
        </g>

        {/* Ambient glow effects */}
        <circle className="ambient-glow" cx="300" cy="160" r="100" fill="#9CA3AF" opacity="0.03" />
        <circle className="ambient-glow" cx="200" cy="200" r="80" fill="#60A5FA" opacity="0.02" />
      </svg>
    )
  }
)

HeroIllustration.displayName = 'HeroIllustration'

export default HeroIllustration
