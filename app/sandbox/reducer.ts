import type { SandboxAction, SandboxCalc, SandboxState } from './types'

const mapCalc = (
  state: SandboxState,
  id: string,
  fn: (calc: SandboxCalc) => SandboxCalc,
): SandboxState => ({
  ...state,
  calcs: state.calcs.map((c) => (c.id === id ? fn(c) : c)),
})

export const sandboxReducer = (
  state: SandboxState,
  action: SandboxAction,
): SandboxState => {
  switch (action.type) {
    case 'PLAYER_UPDATE':
      return { ...state, player: { ...state.player, ...action.patch } }

    case 'OPPONENT_UPDATE':
      return mapCalc(state, action.id, (c) => ({
        ...c,
        opponent: { ...c.opponent, ...action.patch },
      }))

    case 'PLAYER_PARAMS_UPDATE':
      return mapCalc(state, action.id, (c) => ({
        ...c,
        playerCalcParameters: { ...c.playerCalcParameters, ...action.patch },
      }))

    case 'OPPONENT_PARAMS_UPDATE':
      return mapCalc(state, action.id, (c) => ({
        ...c,
        opponentCalcParameters: {
          ...c.opponentCalcParameters,
          ...action.patch,
        },
      }))

    case 'PLAYER_BOOST':
      return mapCalc(state, action.id, (c) => ({
        ...c,
        playerCalcParameters: {
          ...c.playerCalcParameters,
          boosts: {
            ...c.playerCalcParameters.boosts,
            [action.stat]: action.value,
          },
        },
      }))

    case 'OPPONENT_BOOST':
      return mapCalc(state, action.id, (c) => ({
        ...c,
        opponentCalcParameters: {
          ...c.opponentCalcParameters,
          boosts: {
            ...c.opponentCalcParameters.boosts,
            [action.stat]: action.value,
          },
        },
      }))

    case 'FIELD_UPDATE':
      return mapCalc(state, action.id, (c) => ({
        ...c,
        fieldConditions: action.field,
      }))

    case 'CALC_ADD':
      return { ...state, calcs: [...state.calcs, action.calc] }

    case 'CALC_REMOVE':
      return {
        ...state,
        calcs: state.calcs.filter((c) => c.id !== action.id),
        expandedCalcId:
          state.expandedCalcId === action.id ? null : state.expandedCalcId,
      }

    case 'CALC_REPLACE':
      return mapCalc(state, action.id, () => action.calc)

    case 'EXPAND':
      return { ...state, expandedCalcId: action.id }

    case 'TOGGLE_FAVORITE':
      return mapCalc(state, action.id, (c) => ({
        ...c,
        isFavorite: !c.isFavorite,
      }))
  }
}
