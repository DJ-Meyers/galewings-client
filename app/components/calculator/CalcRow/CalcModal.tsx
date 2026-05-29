import { FieldConditionsSection } from '~/components/calculator/FieldConditionsSection'
import { ModifiersSection } from '~/components/calculator/ModifiersSection'
import { PokemonInfoSection } from '~/components/calculator/PokemonInfoSection'
import { PokemonIcon } from '~/components/icons'
import { Modal } from '~/components/layout/Modal'
import { CalcPokemonStatsProvider } from '~/context/CalcPokemonStatsContext'
import { useCalc } from '~/hooks/calc/useCalc'
import { useExpandedCalc } from '~/hooks/calc/useExpandedCalc'
import { useSpeciesAbilities } from '~/hooks/useSpeciesAbilities'
import type { ChampionsPokemon } from '~/types'

const pokemonIconClass =
  'relative inline-block w-[2.4em] h-[2em] overflow-hidden align-middle'

export const CalcModal = () => {
  const {
    calc,
    mode,
    playerSide,
    opponentSide,
    onOpponentUpdate,
    onNameChange,
    onNotesChange,
  } = useCalc()
  const { expandedId, setExpandedId } = useExpandedCalc()
  const isOpen = expandedId === calc.id

  const opponentAbilities = useSpeciesAbilities(calc.opponent.species)

  const topSide = mode === 'offensive' ? 'player' : 'opponent'
  const bottomSide = mode === 'offensive' ? 'opponent' : 'player'
  const topSpecies =
    mode === 'offensive'
      ? playerSide.pokemon.species
      : opponentSide.pokemon.species
  const bottomSpecies =
    mode === 'offensive'
      ? opponentSide.pokemon.species
      : playerSide.pokemon.species

  return (
    <Modal
      open={isOpen}
      title={calc.name || `${topSpecies} vs ${bottomSpecies}`}
      onClose={() => setExpandedId(null)}
    >
      <div className="mb-1 flex items-end gap-1 leading-none">
        <PokemonIcon className={pokemonIconClass} species={topSpecies} />
        <span className="text-text-dim text-sm font-semibold">
          {topSpecies} Modifiers
        </span>
      </div>
      <ModifiersSection side={topSide} />
      <FieldConditionsSection />
      <CalcPokemonStatsProvider
        value={{
          pokemon: calc.opponent,
          speciesAbilities: opponentAbilities,
          compact: true,
          label: 'Text-to-Pokémon',
          name: calc.name,
          notes: calc.notes,
          onSpeciesChange: (species) =>
            onOpponentUpdate({
              species: species as ChampionsPokemon['species'],
            }),
          onNatureChange: (nature) =>
            onOpponentUpdate({ nature: nature as ChampionsPokemon['nature'] }),
          onAbilityChange: (ability) =>
            onOpponentUpdate({
              ability: ability as ChampionsPokemon['ability'],
            }),
          onItemChange: (item) =>
            onOpponentUpdate({
              item: (item || undefined) as ChampionsPokemon['item'],
            }),
          onStatPointChange: (stat, value) =>
            onOpponentUpdate({
              statPoints: { ...calc.opponent.statPoints, [stat]: value },
            }),
          onNameChange,
          onNotesChange,
          onMoveChange: (slot, move) => {
            const moves = [...calc.opponent.moves] as string[]
            moves[slot] = move
            onOpponentUpdate({
              moves: moves.filter(Boolean) as ChampionsPokemon['moves'],
            })
          },
        }}
      >
        <PokemonInfoSection />
      </CalcPokemonStatsProvider>
      <div className="mt-2 mb-1 flex items-end gap-1 leading-none">
        <PokemonIcon className={pokemonIconClass} species={bottomSpecies} />
        <span className="text-text-dim text-sm font-semibold">
          {bottomSpecies} Modifiers
        </span>
      </div>
      <ModifiersSection side={bottomSide} />
    </Modal>
  )
}
