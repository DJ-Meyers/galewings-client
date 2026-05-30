import { FieldConditionCheckbox } from '~/components/calculator/FieldConditionsSection/FieldConditionCheckbox'
import { useFieldConditions } from '~/hooks/calc/useFieldConditions'

export const RuinAbilitiesSection = () => {
  const {
    isBeadsOfRuin,
    isSwordOfRuin,
    isTabletsOfRuin,
    isVesselOfRuin,
    toggleRuin,
  } = useFieldConditions()

  return (
    <fieldset className="border-border-section flex flex-wrap gap-x-2.5 gap-y-1 rounded border px-2 pt-1 pb-1.5">
      <legend className="text-text-dim px-1 text-[0.7rem] font-semibold">
        Ruin Abilities
      </legend>
      <FieldConditionCheckbox
        checked={isBeadsOfRuin}
        label="Beads"
        onChange={() => toggleRuin('isBeadsOfRuin')}
      />
      <FieldConditionCheckbox
        checked={isSwordOfRuin}
        label="Sword"
        onChange={() => toggleRuin('isSwordOfRuin')}
      />
      <FieldConditionCheckbox
        checked={isTabletsOfRuin}
        label="Tablets"
        onChange={() => toggleRuin('isTabletsOfRuin')}
      />
      <FieldConditionCheckbox
        checked={isVesselOfRuin}
        label="Vessel"
        onChange={() => toggleRuin('isVesselOfRuin')}
      />
    </fieldset>
  )
}
