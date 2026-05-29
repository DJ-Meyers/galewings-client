import type { ComponentType, SVGProps } from 'react'

const RUIN_BG = '#3A3A3C'

const RUIN_LABEL: Record<string, string> = {
  sword: 'Sword of Ruin',
  beads: 'Beads of Ruin',
  tablets: 'Tablets of Ruin',
  vessel: 'Vessel of Ruin',
}

const RUIN_COLOR: Record<string, string> = {
  sword: '#3DCEF3',
  beads: '#E62829',
  tablets: '#3FA129',
  vessel: 'rgb(145, 81, 33)',
}

const FishIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <ellipse cx="26" cy="32" rx="17" ry="14" fill="currentColor" />
    <ellipse
      cx="46"
      cy="26"
      rx="10"
      ry="6"
      transform="rotate(-60 46 26)"
      fill="currentColor"
    />
    <ellipse
      cx="46"
      cy="38"
      rx="10"
      ry="6"
      transform="rotate(60 46 38)"
      fill="currentColor"
    />
  </svg>
)

const SwordIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="8" y1="56" x2="19" y2="45" strokeWidth="5" />
    <polygon
      points="17,43 45,15 54,10 49,19 21,47"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <line x1="13" y1="39" x2="25" y2="51" strokeWidth="5" />
  </svg>
)

const TabletsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M26,48 Q24,39 15,40 Q5,41 3,32" strokeWidth="5" />
    <path d="M38,48 Q40,39 49,40 Q59,41 61,32" strokeWidth="5" />
    <path d="M26,48 Q16,43 15,32 Q14,21 3,15" strokeWidth="5" />
    <path d="M38,48 Q48,43 49,32 Q50,21 61,15" strokeWidth="5" />
  </svg>
)

const VesselIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M8,14 Q10,30 29,30 L29,36 Q29,52 17,55 Q15,56.5 16,57.5 L48,57.5 Q49,56.5 47,55 Q35,52 35,36 L35,30 Q54,30 56,14 Z"
      fill="currentColor"
    />
  </svg>
)

const RUIN_ICON: Record<
  string,
  ComponentType<SVGProps<SVGSVGElement>> | undefined
> = {
  sword: SwordIcon,
  beads: FishIcon,
  tablets: TabletsIcon,
  vessel: VesselIcon,
}

export const RuinIcon = ({
  ruin,
}: {
  ruin: 'sword' | 'beads' | 'tablets' | 'vessel'
}) => {
  const Icon = RUIN_ICON[ruin]
  return (
    <span
      className="mx-[0.1em] inline-flex items-center justify-center rounded-sm align-[-0.15em]"
      style={{
        backgroundColor: RUIN_BG,
        width: '1.4em',
        height: '1.4em',
        color: RUIN_COLOR[ruin],
      }}
      title={RUIN_LABEL[ruin]}
    >
      {Icon && <Icon className="h-[1em] w-[1em]" />}
    </span>
  )
}
