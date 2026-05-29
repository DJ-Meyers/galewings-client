import { describe, expect, it } from 'vitest'

import type { FieldConditions } from '@dj-meyers/galewings/types'

import {
  computeDamage,
  shouldActivateAbility,
} from '~/calc/compute-damage'
import type { CalcParameters, ChampionsPokemon } from '~/types'

const baseParams: CalcParameters = {
  move: '',
  teraType: '',
  boosts: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
  status: '',
  isCrit: false,
  abilityOn: false,
  boostedStat: '',
}

const emptyField: FieldConditions = {}

describe('computeDamage', () => {
  it('produces a non-null result for a valid attacker/defender/move', () => {
    const floette: ChampionsPokemon = {
      species: 'Floette-Eternal',
      nature: 'Modest',
      ability: 'Protosynthesis',
      item: 'Leftovers',
      statPoints: { hp: 4, atk: 0, def: 0, spa: 32, spd: 0, spe: 24 },
      moves: [],
    }
    const incineroar: ChampionsPokemon = {
      species: 'Incineroar',
      nature: 'Careful',
      ability: 'Intimidate',
      item: 'Leftovers',
      statPoints: { hp: 30, atk: 3, def: 12, spa: 0, spd: 17, spe: 4 },
      moves: [],
    }
    const r = computeDamage(
      { build: floette, params: baseParams },
      { build: incineroar, params: baseParams },
      'Moonblast',
      emptyField,
    )
    expect(r).not.toBeNull()
    expect(r!.range[0]).toBeGreaterThan(0)
    expect(r!.range[1]).toBeGreaterThanOrEqual(r!.range[0])
    expect(r!.defenderMaxHp).toBeGreaterThan(0)
    expect(typeof r!.desc).toBe('string')
  })

  it('returns null for an unknown species', () => {
    const incineroar: ChampionsPokemon = {
      species: 'Incineroar',
      nature: 'Careful',
      ability: 'Intimidate',
      item: 'Leftovers',
      statPoints: { hp: 30, atk: 3, def: 12, spa: 0, spd: 17, spe: 4 },
      moves: [],
    }
    // species is intentionally invalid; the schema literal union won't
    // accept it, so cast through unknown to bypass the type narrowing.
    const fake = {
      ...incineroar,
      species: 'Pikachuuuu',
    } as unknown as ChampionsPokemon
    const r = computeDamage(
      { build: fake, params: baseParams },
      { build: incineroar, params: baseParams },
      'Moonblast',
      emptyField,
    )
    expect(r).toBeNull()
  })

  it('returns null for an unknown move', () => {
    const floette: ChampionsPokemon = {
      species: 'Floette-Eternal',
      nature: 'Modest',
      ability: 'Protosynthesis',
      item: 'Leftovers',
      statPoints: { hp: 4, atk: 0, def: 0, spa: 32, spd: 0, spe: 24 },
      moves: [],
    }
    const incineroar: ChampionsPokemon = {
      species: 'Incineroar',
      nature: 'Careful',
      ability: 'Intimidate',
      item: 'Leftovers',
      statPoints: { hp: 30, atk: 3, def: 12, spa: 0, spd: 17, spe: 4 },
      moves: [],
    }
    const r = computeDamage(
      { build: floette, params: baseParams },
      { build: incineroar, params: baseParams },
      'Notamoveatall',
      emptyField,
    )
    expect(r).toBeNull()
  })

  it('routes attacker isCrit into Move construction — crit deals ≥ non-crit', () => {
    const floette: ChampionsPokemon = {
      species: 'Floette-Eternal',
      nature: 'Modest',
      ability: 'Protosynthesis',
      item: 'Leftovers',
      statPoints: { hp: 4, atk: 0, def: 0, spa: 32, spd: 0, spe: 24 },
      moves: [],
    }
    const incineroar: ChampionsPokemon = {
      species: 'Incineroar',
      nature: 'Careful',
      ability: 'Intimidate',
      item: 'Leftovers',
      statPoints: { hp: 30, atk: 3, def: 12, spa: 0, spd: 17, spe: 4 },
      moves: [],
    }
    const noCrit = computeDamage(
      { build: floette, params: baseParams },
      { build: incineroar, params: baseParams },
      'Moonblast',
      emptyField,
    )
    const crit = computeDamage(
      { build: floette, params: { ...baseParams, isCrit: true } },
      { build: incineroar, params: baseParams },
      'Moonblast',
      emptyField,
    )
    expect(crit).not.toBeNull()
    expect(noCrit).not.toBeNull()
    expect(crit!.range[1]).toBeGreaterThan(noCrit!.range[1])
  })

  it('hardcodes gameType: Doubles — same calc still works under doubles spread reduction', () => {
    const floette: ChampionsPokemon = {
      species: 'Floette-Eternal',
      nature: 'Modest',
      ability: 'Protosynthesis',
      item: 'Leftovers',
      statPoints: { hp: 4, atk: 0, def: 0, spa: 32, spd: 0, spe: 24 },
      moves: [],
    }
    const incineroar: ChampionsPokemon = {
      species: 'Incineroar',
      nature: 'Careful',
      ability: 'Intimidate',
      item: 'Leftovers',
      statPoints: { hp: 30, atk: 3, def: 12, spa: 0, spd: 17, spe: 4 },
      moves: [],
    }
    const r = computeDamage(
      { build: floette, params: baseParams },
      { build: incineroar, params: baseParams },
      'Dazzling Gleam',
      emptyField,
    )
    expect(r).not.toBeNull()
    expect(r!.range[0]).toBeGreaterThan(0)
  })
})

describe('shouldActivateAbility', () => {
  it('returns true when params.abilityOn is true', () => {
    const incineroar: ChampionsPokemon = {
      species: 'Incineroar',
      nature: 'Careful',
      ability: 'Intimidate',
      item: 'Leftovers',
      statPoints: { hp: 30, atk: 3, def: 12, spa: 0, spd: 17, spe: 4 },
      moves: [],
    }
    expect(
      shouldActivateAbility(
        incineroar,
        { ...baseParams, abilityOn: true },
        emptyField,
      ),
    ).toBe(true)
  })

  it('activates Protosynthesis in Sun', () => {
    const floette: ChampionsPokemon = {
      species: 'Floette-Eternal',
      nature: 'Modest',
      ability: 'Protosynthesis',
      item: 'Leftovers',
      statPoints: { hp: 4, atk: 0, def: 0, spa: 32, spd: 0, spe: 24 },
      moves: [],
    }
    expect(
      shouldActivateAbility(floette, baseParams, { weather: 'Sun' }),
    ).toBe(true)
  })

  it('does NOT activate Protosynthesis outside Sun (Booster Energy disabled — see compute-damage.ts note)', () => {
    const floette: ChampionsPokemon = {
      species: 'Floette-Eternal',
      nature: 'Modest',
      ability: 'Protosynthesis',
      item: 'Leftovers',
      statPoints: { hp: 4, atk: 0, def: 0, spa: 32, spd: 0, spe: 24 },
      moves: [],
    }
    expect(shouldActivateAbility(floette, baseParams, emptyField)).toBe(false)
  })

  it('activates Quark Drive on Electric terrain', () => {
    const basculegion: ChampionsPokemon = {
      species: 'Basculegion',
      nature: 'Adamant',
      ability: 'Quark Drive',
      item: 'Leftovers',
      statPoints: { hp: 16, atk: 32, def: 4, spa: 0, spd: 8, spe: 0 },
      moves: [],
    }
    expect(
      shouldActivateAbility(basculegion, baseParams, { terrain: 'Electric' }),
    ).toBe(true)
  })

  it('respects abilityOverride for Paradox detection (Skill Swap / Trace / §2.3)', () => {
    const incineroar: ChampionsPokemon = {
      species: 'Incineroar',
      nature: 'Careful',
      ability: 'Intimidate',
      item: 'Leftovers',
      statPoints: { hp: 30, atk: 3, def: 12, spa: 0, spd: 17, spe: 4 },
      moves: [],
    }
    expect(
      shouldActivateAbility(
        incineroar,
        { ...baseParams, abilityOverride: 'Protosynthesis' },
        { weather: 'Sun' },
      ),
    ).toBe(true)
  })
})
