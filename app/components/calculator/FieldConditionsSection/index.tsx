import { AttackerSideSection } from '~/components/calculator/FieldConditionsSection/AttackerSideSection'
import { DefenderSideSection } from '~/components/calculator/FieldConditionsSection/DefenderSideSection'
import { RuinAbilitiesSection } from '~/components/calculator/FieldConditionsSection/RuinAbilitiesSection'
import { WeatherTerrainSection } from '~/components/calculator/FieldConditionsSection/WeatherTerrainSection'

export const FieldConditionsSection = () => (
  <div className="border-border-section my-2 flex flex-col gap-1.5 border-y py-2">
    <WeatherTerrainSection />
    <div className="flex flex-wrap gap-2">
      <RuinAbilitiesSection />
    </div>
    <div className="flex flex-wrap gap-2">
      <AttackerSideSection />
      <DefenderSideSection />
    </div>
  </div>
)
