import { useMemo, type ReactNode } from 'react'

import { computeDamage, type CalcSide } from '~/calc/compute-damage'
import {
  CalcContextProvider,
  type CalcContextValue,
} from '~/context/CalcContext'
import { useSandbox } from '~/sandbox/SandboxContext'
import type { CalcRowMode, SandboxCalc } from '~/sandbox/types'

interface Properties {
  calc: SandboxCalc
  mode: CalcRowMode
  children: ReactNode
}

export const CalcProvider = ({ calc, mode, children }: Properties) => {
  const { state, dispatch } = useSandbox()
  const id = calc.id

  const playerSide: CalcSide = {
    pokemon: state.player,
    params: calc.playerCalcParameters,
  }
  const opponentSide: CalcSide = {
    pokemon: calc.opponent,
    params: calc.opponentCalcParameters,
  }
  const attackerSide = mode === 'offensive' ? playerSide : opponentSide
  const defenderSide = mode === 'offensive' ? opponentSide : playerSide
  const attackerMove = attackerSide.params.move

  const result = useMemo(
    () =>
      computeDamage(
        attackerSide,
        defenderSide,
        attackerMove,
        calc.fieldConditions,
      ),
    [attackerSide, defenderSide, attackerMove, calc.fieldConditions],
  )

  const value: CalcContextValue = useMemo(
    () => ({
      calc,
      mode,
      playerSide,
      opponentSide,
      attackerSide,
      defenderSide,
      result,
      onPlayerParamsUpdate: (patch) =>
        dispatch({ type: 'PLAYER_PARAMS_UPDATE', id, patch }),
      onOpponentParamsUpdate: (patch) =>
        dispatch({ type: 'OPPONENT_PARAMS_UPDATE', id, patch }),
      onPlayerBoost: (stat, value) =>
        dispatch({ type: 'PLAYER_BOOST', id, stat, value }),
      onOpponentBoost: (stat, value) =>
        dispatch({ type: 'OPPONENT_BOOST', id, stat, value }),
      onOpponentUpdate: (patch) =>
        dispatch({ type: 'OPPONENT_UPDATE', id, patch }),
      onFieldUpdate: (field) => dispatch({ type: 'FIELD_UPDATE', id, field }),
      onNameChange: (name) =>
        dispatch({ type: 'CALC_REPLACE', id, calc: { ...calc, name } }),
      onNotesChange: (notes) =>
        dispatch({ type: 'CALC_REPLACE', id, calc: { ...calc, notes } }),
      onRemove: () => dispatch({ type: 'CALC_REMOVE', id }),
      onToggleFavorite: () => dispatch({ type: 'TOGGLE_FAVORITE', id }),
    }),
    [
      calc,
      mode,
      playerSide,
      opponentSide,
      attackerSide,
      defenderSide,
      result,
      dispatch,
      id,
    ],
  )

  return <CalcContextProvider value={value}>{children}</CalcContextProvider>
}
