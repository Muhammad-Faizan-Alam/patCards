const PencilIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 36 36"
    className="w-7 h-7"
  >
    {/* Pen body */}
    <rect
      x="15"
      y="6"
      width="6"
      height="16"
      rx="3"
      fill="url(#penBody)"
      stroke="#f59e42"
      strokeWidth="1"
    />
    {/* Pen tip */}
    <polygon
      points="15,22 21,22 18,30"
      fill="url(#penTip)"
      stroke="#a16207"
      strokeWidth="0.5"
    />
    {/* Pen cap */}
    <rect
      x="16"
      y="3"
      width="4"
      height="5"
      rx="2"
      fill="url(#capGradient)"
      stroke="#eab308"
      strokeWidth="0.5"
    />
    {/* Drawing line */}
    <path
      d="M18 30 Q20 33, 30 34"
      stroke="url(#drawLine)"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <defs>
      <linearGradient id="penBody" x1="15" y1="6" x2="21" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#facc15" />
        <stop offset="1" stopColor="#f59e0b" />
      </linearGradient>
      <linearGradient id="penTip" x1="15" y1="22" x2="18" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fff" />
        <stop offset="1" stopColor="#eab308" />
      </linearGradient>
      <linearGradient id="capGradient" x1="16" y1="3" x2="20" y2="8" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fde68a" />
        <stop offset="1" stopColor="#fbbf24" />
      </linearGradient>
      <linearGradient id="drawLine" x1="18" y1="30" x2="30" y2="34" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f59e0b" />
        <stop offset="1" stopColor="#f97316" />
      </linearGradient>
    </defs>
  </svg>
);

const HomeIcon = ({ active }: { active?: boolean }) => (
  <svg
    className="w-5 h-5 mr-1 inline"
    viewBox="0 0 24 24"
    fill={active ? "#facc15" : "none"}
    stroke={active ? "#f59e0b" : "currentColor"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 12L12 4l9 8v7a2 2 0 01-2 2h-4a1 1 0 01-1-1v-4H10v4a1 1 0 01-1 1H5a2 2 0 01-2-2z" />
  </svg>
);

const AboutIcon = ({ active }: { active?: boolean }) => (
  <svg
    className="w-5 h-5 mr-1 inline"
    viewBox="0 0 24 24"
    fill={active ? "#facc15" : "none"}
    stroke={active ? "#f59e0b" : "currentColor"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="8" />
    <line x1="12" y1="12" x2="12" y2="16" />
  </svg>
);

const ContactIcon = ({ active }: { active?: boolean }) => (
  <svg
    className="w-5 h-5 mr-1 inline"
    viewBox="0 0 24 24"
    fill={active ? "#facc15" : "none"}
    stroke={active ? "#f59e0b" : "currentColor"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

export { PencilIcon, HomeIcon, AboutIcon, ContactIcon };