import { createContext } from 'react'

import type { CalcSide } from '~/calc/compute-damage'
import type {
  CalcParameters,
  ChampionsPokemon,
  FieldConditions,
} from '~/types'

import type { CalcMode, SandboxCalc, StatBoostKey } from '~/sandbox/types'

export interface CalcContextValue {
  calc: SandboxCalc
  mode: CalcMode
  playerSide: CalcSide
  opponentSide: CalcSide
  attackerSide: CalcSide
  defenderSide: CalcSide
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
