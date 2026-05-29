export const WindIcon = ({
  label = 'Tailwind',
  flipped = false,
}: {
  label?: string
  flipped?: boolean
}) => (
  <span
    className="mx-[0.1em] inline-flex items-center justify-center rounded-sm align-[-0.15em]"
    style={{ backgroundColor: '#7EC8E3', width: '1.3em', height: '1.3em' }}
    title={label}
  >
    <svg
      className="h-[0.8em] w-[0.8em]"
      fill="none"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
      style={flipped ? { transform: 'scaleX(-1)' } : undefined}
      viewBox="0 0 64 64"
    >
      <path d="M54 22 H30 q-10 0 -10 -7 q0 -7 7 -7 q5 0 5 5" />
      <path d="M62 32 H14 q-12 0 -12 -8 q0 -7 7 -7 q5 0 5 5" />
      <path d="M58 42 H22 q-9 0 -9 7 q0 7 7 7 q5 0 5 -5" />
    </svg>
  </span>
)
