import type { StatKey } from '~/types'

const STAT_STYLES: Record<StatKey, { label: string; color: string }> = {
  hp: { label: 'HP', color: '#9EE865' },
  atk: { label: 'Atk', color: '#F5DE69' },
  def: { label: 'Def', color: '#F09A65' },
  spa: { label: 'SpA', color: '#66D8F6' },
  spd: { label: 'SpD', color: '#899EEA' },
  spe: { label: 'Spe', color: '#E46CCA' },
}

export const StatDisplay = ({
  stat,
  sp,
  total,
  natureMod,
  className,
  variant = 'compact',
}: {
  stat: StatKey
  sp?: number
  total: number | null
  natureMod?: '+' | '-'
  className?: string
  variant?: 'compact' | 'labeled'
}) => {
  const { label, color } = STAT_STYLES[stat]
  const suffix = natureMod ?? ''

  return (
    <div
      className={`flex flex-col items-center justify-center rounded px-2 py-1.5 ${variant === 'labeled' ? 'size-[34px] shrink-0' : ''} ${className ?? ''}`}
      style={{ backgroundColor: `${color}22` }}
    >
      {variant === 'labeled' ? (
        <>
          <span className="text-text-muted text-[8px] leading-tight">
            {label}
          </span>
          <span
            className="text-[10px] leading-tight font-semibold"
            style={{ color }}
          >
            {total ?? '?'}
          </span>
        </>
      ) : (
        <>
          <span
            className="text-[10px] leading-tight font-semibold"
            style={{ color }}
          >
            {total ?? '?'}
          </span>
          <span className="text-text-muted text-[8px] leading-tight">
            {sp || suffix ? `${sp}${suffix}` : label}
          </span>
        </>
      )}
    </div>
  )
}
