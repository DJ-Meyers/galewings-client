import type {
  CalcParameters,
  ChampionsPokemon,
  FieldConditions,
  StatKey,
} from '~/types'

export type CalcMode = 'offensive' | 'defensive' | 'speed'

export type CalcRowMode = Exclude<CalcMode, 'speed'>

export type StatBoostKey = Exclude<StatKey, 'hp'>

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

export interface SandboxState {
  player: ChampionsPokemon
  calcs: SandboxCalc[]
  expandedCalcId: string | null
}

export type SandboxAction =
  | { type: 'PLAYER_UPDATE'; patch: Partial<ChampionsPokemon> }
  | { type: 'OPPONENT_UPDATE'; id: string; patch: Partial<ChampionsPokemon> }
  | { type: 'PLAYER_PARAMS_UPDATE'; id: string; patch: Partial<CalcParameters> }
  | {
      type: 'OPPONENT_PARAMS_UPDATE'
      id: string
      patch: Partial<CalcParameters>
    }
  | { type: 'PLAYER_BOOST'; id: string; stat: StatBoostKey; value: number }
  | { type: 'OPPONENT_BOOST'; id: string; stat: StatBoostKey; value: number }
  | { type: 'FIELD_UPDATE'; id: string; field: FieldConditions }
  | { type: 'CALC_ADD'; calc: SandboxCalc }
  | { type: 'CALC_REMOVE'; id: string }
  | { type: 'CALC_REPLACE'; id: string; calc: SandboxCalc }
  | { type: 'EXPAND'; id: string | null }
  | { type: 'TOGGLE_FAVORITE'; id: string }
