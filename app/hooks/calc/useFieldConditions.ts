import type { FieldConditions } from '~/types'

import { useCalc } from './useCalc'

type RuinKey =
  | 'isBeadsOfRuin'
  | 'isSwordOfRuin'
  | 'isTabletsOfRuin'
  | 'isVesselOfRuin'

type AttackerSideKey = keyof NonNullable<FieldConditions['attackerSide']>
type DefenderSideKey = keyof NonNullable<FieldConditions['defenderSide']>

export const useFieldConditions = () => {
  const { calc, onFieldUpdate } = useCalc()
  const fc = calc.fieldConditions

  const setWeather = (weather: FieldConditions['weather']) =>
    onFieldUpdate({ ...fc, weather })

  const setTerrain = (terrain: FieldConditions['terrain']) =>
    onFieldUpdate({ ...fc, terrain })

  const toggleRuin = (key: RuinKey) =>
    onFieldUpdate({ ...fc, [key]: !fc[key] })

  const toggleAttackerSide = (key: AttackerSideKey) => {
    const side = fc.attackerSide ?? {}
    onFieldUpdate({
      ...fc,
      attackerSide: { ...side, [key]: !side[key] },
    })
  }

  const toggleDefenderSide = (key: DefenderSideKey) => {
    const side = fc.defenderSide ?? {}
    onFieldUpdate({
      ...fc,
      defenderSide: { ...side, [key]: !side[key] },
    })
  }

  return {
    weather: fc.weather,
    terrain: fc.terrain,
    isBeadsOfRuin: !!fc.isBeadsOfRuin,
    isSwordOfRuin: !!fc.isSwordOfRuin,
    isTabletsOfRuin: !!fc.isTabletsOfRuin,
    isVesselOfRuin: !!fc.isVesselOfRuin,
    attackerSide: fc.attackerSide ?? {},
    defenderSide: fc.defenderSide ?? {},
    setWeather,
    setTerrain,
    toggleRuin,
    toggleAttackerSide,
    toggleDefenderSide,
  }
}
