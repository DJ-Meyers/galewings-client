import { describe, expect, it } from 'vitest'

import { defaultPlayer, makeCalc } from './defaults'
import { sandboxReducer } from './reducer'
import type { SandboxCalc, SandboxState } from './types'

const baseState = (calcs: SandboxCalc[] = []): SandboxState => ({
  player: { ...defaultPlayer },
  calcs,
  expandedCalcId: null,
})

describe('sandboxReducer', () => {
  it('PLAYER_UPDATE patches the shared player without touching calcs', () => {
    const calc = makeCalc('offensive')
    const state = baseState([calc])
    const next = sandboxReducer(state, {
      type: 'PLAYER_UPDATE',
      patch: { species: 'Garchomp', ability: 'Rough Skin' },
    })
    expect(next.player.species).toBe('Garchomp')
    expect(next.player.ability).toBe('Rough Skin')
    expect(next.calcs).toBe(state.calcs)
  })

  it('OPPONENT_UPDATE patches only the opponent build, not the params', () => {
    const calc = makeCalc('offensive')
    const state = baseState([calc])
    const next = sandboxReducer(state, {
      type: 'OPPONENT_UPDATE',
      id: calc.id,
      patch: { species: 'Incineroar' },
    })
    expect(next.calcs[0].opponent.species).toBe('Incineroar')
    expect(next.calcs[0].opponentCalcParameters).toBe(
      calc.opponentCalcParameters,
    )
  })

  it('PLAYER_PARAMS_UPDATE and OPPONENT_PARAMS_UPDATE write to the right side', () => {
    const calc = makeCalc('offensive')
    const state = baseState([calc])
    const a = sandboxReducer(state, {
      type: 'PLAYER_PARAMS_UPDATE',
      id: calc.id,
      patch: { move: 'Flare Blitz', isCrit: true },
    })
    expect(a.calcs[0].playerCalcParameters.move).toBe('Flare Blitz')
    expect(a.calcs[0].playerCalcParameters.isCrit).toBe(true)
    expect(a.calcs[0].opponentCalcParameters.move).toBe('')

    const b = sandboxReducer(a, {
      type: 'OPPONENT_PARAMS_UPDATE',
      id: calc.id,
      patch: { teraType: 'Fairy' },
    })
    expect(b.calcs[0].opponentCalcParameters.teraType).toBe('Fairy')
    expect(b.calcs[0].playerCalcParameters.teraType).toBe('')
  })

  it('PLAYER_BOOST and OPPONENT_BOOST set per-side stat boosts independently', () => {
    const calc = makeCalc('offensive')
    const state = baseState([calc])
    const next = sandboxReducer(state, {
      type: 'PLAYER_BOOST',
      id: calc.id,
      stat: 'atk',
      value: 2,
    })
    expect(next.calcs[0].playerCalcParameters.boosts.atk).toBe(2)
    expect(next.calcs[0].opponentCalcParameters.boosts.atk).toBe(0)

    const next2 = sandboxReducer(next, {
      type: 'OPPONENT_BOOST',
      id: calc.id,
      stat: 'spe',
      value: -1,
    })
    expect(next2.calcs[0].opponentCalcParameters.boosts.spe).toBe(-1)
    expect(next2.calcs[0].playerCalcParameters.boosts.atk).toBe(2)
  })

  it('FIELD_UPDATE replaces the calc fieldConditions', () => {
    const calc = makeCalc('offensive')
    const state = baseState([calc])
    const next = sandboxReducer(state, {
      type: 'FIELD_UPDATE',
      id: calc.id,
      field: { weather: 'Sun', terrain: 'Electric' },
    })
    expect(next.calcs[0].fieldConditions).toEqual({
      weather: 'Sun',
      terrain: 'Electric',
    })
  })

  it('CALC_ADD appends, CALC_REMOVE drops, CALC_REPLACE swaps by id', () => {
    const a = makeCalc('offensive')
    const b = makeCalc('defensive')
    const state = sandboxReducer(baseState(), { type: 'CALC_ADD', calc: a })
    const withBoth = sandboxReducer(state, { type: 'CALC_ADD', calc: b })
    expect(withBoth.calcs).toHaveLength(2)

    const replaced = sandboxReducer(withBoth, {
      type: 'CALC_REPLACE',
      id: a.id,
      calc: { ...a, name: 'renamed' },
    })
    expect(replaced.calcs[0].name).toBe('renamed')
    expect(replaced.calcs[1].id).toBe(b.id)

    const removed = sandboxReducer(replaced, {
      type: 'CALC_REMOVE',
      id: a.id,
    })
    expect(removed.calcs).toHaveLength(1)
    expect(removed.calcs[0].id).toBe(b.id)
  })

  it('CALC_REMOVE clears expandedCalcId when removing the expanded calc', () => {
    const a = makeCalc('offensive')
    const state: SandboxState = { ...baseState([a]), expandedCalcId: a.id }
    const next = sandboxReducer(state, { type: 'CALC_REMOVE', id: a.id })
    expect(next.expandedCalcId).toBeNull()
  })

  it('EXPAND sets and clears expandedCalcId', () => {
    const a = makeCalc('offensive')
    const state = baseState([a])
    const expanded = sandboxReducer(state, { type: 'EXPAND', id: a.id })
    expect(expanded.expandedCalcId).toBe(a.id)
    const cleared = sandboxReducer(expanded, { type: 'EXPAND', id: null })
    expect(cleared.expandedCalcId).toBeNull()
  })

  it('TOGGLE_FAVORITE flips isFavorite on the targeted calc only', () => {
    const a = makeCalc('offensive')
    const b = makeCalc('defensive')
    const state = baseState([a, b])
    const next = sandboxReducer(state, { type: 'TOGGLE_FAVORITE', id: a.id })
    expect(next.calcs[0].isFavorite).toBe(true)
    expect(next.calcs[1].isFavorite).toBe(false)
    const flipped = sandboxReducer(next, {
      type: 'TOGGLE_FAVORITE',
      id: a.id,
    })
    expect(flipped.calcs[0].isFavorite).toBe(false)
  })
})
