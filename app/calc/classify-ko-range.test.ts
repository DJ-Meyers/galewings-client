import { describe, expect, it } from 'vitest'

import { classifyKoTier } from '~/calc/classify-ko-range'

describe('classifyKoTier', () => {
  it('returns 5 (no result) for null', () => {
    expect(classifyKoTier(null)).toBe(5)
  })

  it('returns 5 for empty koChance', () => {
    expect(
      classifyKoTier({
        desc: '',
        range: [0, 0],
        koChance: '',
        defenderMaxHp: 0,
      }),
    ).toBe(5)
  })

  it('returns 0 for guaranteed OHKO', () => {
    expect(
      classifyKoTier({
        desc: '',
        range: [0, 0],
        koChance: 'guaranteed OHKO',
        defenderMaxHp: 0,
      }),
    ).toBe(0)
  })

  it('returns 2 for guaranteed 2HKO', () => {
    expect(
      classifyKoTier({
        desc: '',
        range: [0, 0],
        koChance: 'guaranteed 2HKO',
        defenderMaxHp: 0,
      }),
    ).toBe(2)
  })
})
