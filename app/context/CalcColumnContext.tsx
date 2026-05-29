import { createContext } from 'react'

import type { CalcParameters, ChampionsPokemon, FieldConditions } from '~/types'

import type {
  CalcMode,
  SandboxCalc,
  StatBoostKey,
} from '~/sandbox/types'

export interface CalcColumnContextValue {
  mode: CalcMode
  player: ChampionsPokemon
  calcs: SandboxCalc[]
  onAddCalc: () => void
  onRemoveCalc: (id: string) => void
  onReplaceCalc: (id: string, calc: SandboxCalc) => void
  onPlayerUpdate: (patch: Partial<ChampionsPokemon>) => void
  onOpponentUpdate: (id: string, patch: Partial<ChampionsPokemon>) => void
  onPlayerParamsUpdate: (id: string, patch: Partial<CalcParameters>) => void
  onOpponentParamsUpdate: (id: string, patch: Partial<CalcParameters>) => void
  onPlayerBoost: (id: string, stat: StatBoostKey, value: number) => void
  onOpponentBoost: (id: string, stat: StatBoostKey, value: number) => void
  onFieldUpdate: (id: string, field: FieldConditions) => void
  onNameChange: (id: string, name: string) => void
  onNotesChange: (id: string, notes: string) => void
  onToggleFavorite: (id: string) => void
}

export const CalcColumnContext = createContext<CalcColumnContextValue | null>(
  null,
)
export const CalcColumnProvider = CalcColumnContext.Provider
