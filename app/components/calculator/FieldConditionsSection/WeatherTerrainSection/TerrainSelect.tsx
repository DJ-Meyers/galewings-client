import { FieldConditionSelect } from '~/components/calculator/FieldConditionsSection/WeatherTerrainSection/FieldConditionSelect'
import { useFieldConditions } from '~/hooks/calc/useFieldConditions'

const TERRAIN_OPTIONS = ['Electric', 'Grassy', 'Psychic', 'Misty'] as const

export const TerrainSelect = () => {
  const { terrain, setTerrain } = useFieldConditions()

  return (
    <FieldConditionSelect
      label="Terrain"
      options={TERRAIN_OPTIONS}
      value={terrain}
      onChange={setTerrain}
    />
  )
}
