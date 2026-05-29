import type {
  CalcParameters,
  ChampionsPokemon,
  FieldConditions,
  StatKey,
} from '~/types'

export type CalcMode = 'offensive' | 'defensive' | 'speed'

export type CalcRowMode = Exclude<CalcMode, 'speed'>

export type StatBoostKey = Exclude<StatKey, 'hp'>

export type RuinKey =
  | 'isBeadsOfRuin'
  | 'isSwordOfRuin'
  | 'isTabletsOfRuin'
  | 'isVesselOfRuin'

export type AttackerSideKey = keyof NonNullable<FieldConditions['attackerSide']>

export type DefenderSideKey = keyof NonNullable<FieldConditions['defenderSide']>

export interface SandboxCalc {
  id: string
  type: CalcMode
  name: string
  notes: string
  opponent: ChampionsPokemon
  playerCalcParameters: CalcParameters
  opponentCalcParameters: CalcParameters
  fieldConditions: FieldConditions
  isFavorite: boolean
}

export interface SandboxStoreState {
  player: ChampionsPokemon
  calcs: Record<string, SandboxCalc>
  calcOrder: string[]
  expandedCalcId: string | null
}

export interface SandboxStoreActions {
  setPlayer: (patch: Partial<ChampionsPokemon>) => void
  patchCalc: (id: string, patch: Partial<SandboxCalc>) => void
  replaceCalc: (id: string, calc: SandboxCalc) => void
  setOpponent: (id: string, patch: Partial<ChampionsPokemon>) => void
  setPlayerParams: (id: string, patch: Partial<CalcParameters>) => void
  setOpponentParams: (id: string, patch: Partial<CalcParameters>) => void
  setPlayerBoost: (id: string, stat: StatBoostKey, value: number) => void
  setOpponentBoost: (id: string, stat: StatBoostKey, value: number) => void
  setFieldConditions: (id: string, patch: FieldConditions) => void
  setWeather: (id: string, weather: FieldConditions['weather']) => void
  setTerrain: (id: string, terrain: FieldConditions['terrain']) => void
  toggleRuin: (id: string, key: RuinKey) => void
  toggleAttackerSide: (id: string, key: AttackerSideKey) => void
  toggleDefenderSide: (id: string, key: DefenderSideKey) => void
  addCalc: (calc: SandboxCalc) => void
  removeCalc: (id: string) => void
  setExpandedId: (id: string | null) => void
  toggleFavorite: (id: string) => void
}

export type SandboxStore = SandboxStoreState & SandboxStoreActions
