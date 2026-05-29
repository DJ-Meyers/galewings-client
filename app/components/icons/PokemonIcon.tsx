import { useState } from 'react'
import { toSpriteId } from '~/data/spriteNames'

const SPRITE_BASE = 'https://img.pokemondb.net/sprites/scarlet-violet/icon'
const FALLBACK_SRC = `${SPRITE_BASE}/ditto.png`

export const PokemonIcon = ({
  species,
  className,
}: {
  species: string
  className?: string
}) => {
  const [failed, setFailed] = useState(false)
  const source = failed
    ? FALLBACK_SRC
    : `${SPRITE_BASE}/${toSpriteId(species)}.png`
  return (
    <div
      className={
        className ??
        'relative inline-block h-[1.4em] w-[1.8em] overflow-hidden align-middle'
      }
    >
      <img
        alt={species}
        className="h-full w-full object-cover object-bottom"
        src={source}
        title={species}
        onError={() => setFailed(true)}
      />
    </div>
  )
}
