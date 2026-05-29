import { FavoriteButton } from '~/components/FavoriteButton'
import { WindIcon } from '~/components/icons'
import { PokemonWithItemIcon } from '~/components/icons/PokemonWithItemIcon'
import { useSpeedCalc, type SpeedTier } from '~/hooks/calc/useSpeedCalc'
import { useSandbox } from '~/sandbox/SandboxContext'
import type { SandboxCalc } from '~/sandbox/types'

const TIER_COLORS: Record<SpeedTier, string> = {
  faster: 'text-ko-no-2hko',
  tie: 'text-ko-guaranteed-2hko',
  slower: 'text-ko-guaranteed-ohko',
}

interface Properties {
  calc: SandboxCalc
}

export const SpeedCalcRow = ({ calc }: Properties) => {
  const { dispatch } = useSandbox()
  const { opponentSpeed, tier, opponentHasTailwind } = useSpeedCalc(calc)

  const { opponent } = calc
  const speBoost = calc.opponentCalcParameters.boosts.spe

  return (
    <div className="bg-surface mb-2 overflow-hidden rounded-md shadow-sm">
      <div className="flex h-14 items-center gap-2 px-3 select-none">
        <FavoriteButton
          isFavorite={calc.isFavorite}
          onClick={() =>
            dispatch({ type: 'TOGGLE_FAVORITE', id: calc.id })
          }
        />
        <PokemonWithItemIcon
          className="-mt-2"
          item={opponent.item}
          species={opponent.species}
        />
        <span className="flex-1 truncate text-sm">{opponent.species}</span>
        <select
          className={`bg-surface border-border w-12 shrink-0 rounded border px-0.5 py-0.5 text-center text-xs focus:outline-none ${speBoost === 0 ? 'text-text-faint' : 'text-text'}`}
          title="Opponent speed boost"
          value={speBoost}
          onChange={(e) =>
            dispatch({
              type: 'OPPONENT_BOOST',
              id: calc.id,
              stat: 'spe',
              value: Number(e.target.value),
            })
          }
        >
          {[6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6].map((v) => (
            <option key={v} value={v}>
              {v >= 0 ? `+${v}` : String(v)}
            </option>
          ))}
        </select>
        <button
          className={`shrink-0 cursor-pointer border-none bg-none px-0.5 leading-none ${opponentHasTailwind ? 'opacity-100' : 'opacity-30'}`}
          title="Toggle opponent tailwind"
          onClick={() =>
            dispatch({
              type: 'FIELD_UPDATE',
              id: calc.id,
              field: {
                ...calc.fieldConditions,
                defenderSide: {
                  ...calc.fieldConditions.defenderSide,
                  isTailwind: !opponentHasTailwind,
                },
              },
            })
          }
        >
          <WindIcon />
        </button>
        <span
          className={`shrink-0 text-sm font-semibold tabular-nums ${TIER_COLORS[tier]}`}
        >
          {opponentSpeed}
        </span>
        <button
          className="text-text-faint hover:text-error shrink-0 cursor-pointer border-none bg-none px-1 text-lg leading-none"
          onClick={() => dispatch({ type: 'CALC_REMOVE', id: calc.id })}
        >
          &times;
        </button>
      </div>
    </div>
  )
}
