import { TerrainSelect } from '~/components/calculator/FieldConditionsSection/WeatherTerrainSection/TerrainSelect'
import { WeatherSelect } from '~/components/calculator/FieldConditionsSection/WeatherTerrainSection/WeatherSelect'

export const WeatherTerrainSection = () => (
  <div className="flex flex-wrap gap-2">
    <WeatherSelect />
    <TerrainSelect />
  </div>
)
