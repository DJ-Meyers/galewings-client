import { ItemIcon } from '~/components/icons/ItemIcon'
import { PokemonIcon } from '~/components/icons/PokemonIcon'

export const PokemonWithItemIcon = ({
  species,
  item,
  className,
}: {
  species?: string
  item?: string
  className?: string
}) => (
  <div className={`relative mr-2 h-[40px] w-[40px] ${className ?? ''}`}>
    {species && (
      <PokemonIcon
        className="relative inline-block h-[40px] w-[40px] overflow-hidden"
        species={species}
      />
    )}
    {item && (
      <span className="absolute -right-1 -bottom-1">
        <ItemIcon item={item} />
      </span>
    )}
  </div>
)
