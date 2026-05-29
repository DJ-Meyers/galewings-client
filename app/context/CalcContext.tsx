import { createContext } from 'react'

import type { CalcSide, DamageCalcResult } from '~/calc/compute-damage'
import type {
  CalcParameters,
  ChampionsPokemon,
  FieldConditions,
} from '~/types'

import type { CalcRowMode, SandboxCalc, StatBoostKey } from '~/sandbox/types'

export interface CalcContextValue {
  calc: SandboxCalc
  mode: CalcRowMode
  playerSide: CalcSide
  opponentSide: CalcSide
  attackerSide: CalcSide
  defenderSide: CalcSide
  result: DamageCalcResult | null
  onPlayerParamsUpdate: (patch: Partial<CalcParameters>) => void
  onOpponentParamsUpdate: (patch: Partial<CalcParameters>) => void
  onPlayerBoost: (stat: StatBoostKey, value: number) => void
  onOpponentBoost: (stat: StatBoostKey, value: number) => void
  onOpponentUpdate: (patch: Partial<ChampionsPokemon>) => void
  onFieldUpdate: (field: FieldConditions) => void
  onNameChange: (name: string) => void
  onNotesChange: (notes: string) => void
  onRemove: () => void
  onToggleFavorite: () => void
}

export const CalcContext = createContext<CalcContextValue | null>(null)
export const CalcContextProvider = CalcContext.Provider
