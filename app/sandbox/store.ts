import { create } from 'zustand'

import { defaultPlayer } from './defaults'
import type { SandboxStore } from './types'

const notImplemented = (name: string) => (): never => {
  throw new Error(
    `SandboxStore.${name} is a B20 stub. Implementation lands in B21.`,
  )
}

export const useSandboxStore = create<SandboxStore>(() => ({
  player: defaultPlayer,
  calcs: {},
  calcOrder: [],
  expandedCalcId: null,
  setPlayer: notImplemented('setPlayer'),
  patchCalc: notImplemented('patchCalc'),
  replaceCalc: notImplemented('replaceCalc'),
  setOpponent: notImplemented('setOpponent'),
  setPlayerParams: notImplemented('setPlayerParams'),
  setOpponentParams: notImplemented('setOpponentParams'),
  setPlayerBoost: notImplemented('setPlayerBoost'),
  setOpponentBoost: notImplemented('setOpponentBoost'),
  setFieldConditions: notImplemented('setFieldConditions'),
  setWeather: notImplemented('setWeather'),
  setTerrain: notImplemented('setTerrain'),
  toggleRuin: notImplemented('toggleRuin'),
  toggleAttackerSide: notImplemented('toggleAttackerSide'),
  toggleDefenderSide: notImplemented('toggleDefenderSide'),
  addCalc: notImplemented('addCalc'),
  removeCalc: notImplemented('removeCalc'),
  setExpandedId: notImplemented('setExpandedId'),
  toggleFavorite: notImplemented('toggleFavorite'),
}))
