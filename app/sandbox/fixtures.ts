import type { CalcParameters, ChampionsPokemon } from '~/types'

import { defaultCalcParameters, defaultFieldConditions } from './defaults'
import type { SandboxCalc } from './types'

// Canonical opponents for the Incineroar-led sandbox. None of these
// species are in the vgc-2026-m-a regulation literal — cast through
// unknown so we can keep the canonical Pokemon/ability pairings (per
// §8.7) without expanding the regulation list client-side.
const flutterMane = {
  species: 'Flutter Mane',
  nature: 'Timid',
  ability: 'Protosynthesis',
  statPoints: { hp: 0, atk: 0, def: 0, spa: 32, spd: 0, spe: 32 },
  moves: [],
} as unknown as ChampionsPokemon

const ironHands = {
  species: 'Iron Hands',
  nature: 'Adamant',
  ability: 'Quark Drive',
  statPoints: { hp: 32, atk: 32, def: 0, spa: 0, spd: 0, spe: 0 },
  moves: [],
} as unknown as ChampionsPokemon

const urshifuRapid = {
  species: 'Urshifu-Rapid-Strike',
  nature: 'Jolly',
  ability: 'Unseen Fist',
  statPoints: { hp: 0, atk: 32, def: 0, spa: 0, spd: 0, spe: 32 },
  moves: [],
} as unknown as ChampionsPokemon

const rillaboom = {
  species: 'Rillaboom',
  nature: 'Adamant',
  ability: 'Grassy Surge',
  statPoints: { hp: 32, atk: 32, def: 0, spa: 0, spd: 0, spe: 0 },
  moves: [],
} as unknown as ChampionsPokemon

const cloneParams = (): CalcParameters => ({
  ...defaultCalcParameters,
  boosts: { ...defaultCalcParameters.boosts },
})

const withMove = (move: string): CalcParameters => ({
  ...cloneParams(),
  move: move as CalcParameters['move'],
})

const makeFixture = (
  id: string,
  partial: Partial<SandboxCalc> &
    Pick<SandboxCalc, 'type' | 'name' | 'opponent'>,
): SandboxCalc => ({
  id,
  notes: '',
  playerCalcParameters: cloneParams(),
  opponentCalcParameters: cloneParams(),
  fieldConditions: { ...defaultFieldConditions },
  isFavorite: false,
  ...partial,
})

export const SANDBOX_FIXTURES: SandboxCalc[] = [
  makeFixture('fix-off-1', {
    type: 'offensive',
    name: 'Flare Blitz vs Flutter Mane',
    opponent: flutterMane,
    playerCalcParameters: withMove('Flare Blitz'),
  }),
  makeFixture('fix-off-2', {
    type: 'offensive',
    name: 'Knock Off vs Iron Hands',
    opponent: ironHands,
    playerCalcParameters: withMove('Knock Off'),
  }),
  makeFixture('fix-off-3', {
    type: 'offensive',
    name: 'Snarl vs Urshifu',
    opponent: urshifuRapid,
    playerCalcParameters: withMove('Snarl'),
  }),
  makeFixture('fix-def-1', {
    type: 'defensive',
    name: 'Moonblast from Flutter Mane',
    opponent: flutterMane,
    opponentCalcParameters: withMove('Moonblast'),
  }),
  makeFixture('fix-def-2', {
    type: 'defensive',
    name: 'Close Combat from Iron Hands',
    opponent: ironHands,
    opponentCalcParameters: withMove('Close Combat'),
  }),
  makeFixture('fix-def-3', {
    type: 'defensive',
    name: 'Surging Strikes from Urshifu',
    opponent: urshifuRapid,
    opponentCalcParameters: withMove('Surging Strikes'),
  }),
  makeFixture('fix-spd-1', {
    type: 'speed',
    name: 'Flutter Mane',
    opponent: flutterMane,
  }),
  makeFixture('fix-spd-2', {
    type: 'speed',
    name: 'Urshifu',
    opponent: urshifuRapid,
  }),
  makeFixture('fix-spd-3', {
    type: 'speed',
    name: 'Rillaboom',
    opponent: rillaboom,
  }),
]
