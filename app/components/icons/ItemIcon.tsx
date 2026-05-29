import { useState } from 'react'
import { LOCAL_ITEM_SPRITES, toItemSpriteId } from '~/data/itemSpriteNames'

const SPRITE_BASE = 'https://img.pokemondb.net/sprites/items'

const ItemIconInner = ({ item }: { item: string }) => {
  const [failed, setFailed] = useState(false)

  if (!item || failed) return null

  const localSprite = LOCAL_ITEM_SPRITES[item]
  const src = localSprite
    ? `/assets/items/${localSprite}.png`
    : `${SPRITE_BASE}/${toItemSpriteId(item)}.png`

  return (
    <img
      alt={item}
      className="mx-[0.1em] inline-block h-[1.3em] w-[1.3em] align-[-0.25em]"
      src={src}
      title={item}
      onError={() => setFailed(true)}
    />
  )
}

export const ItemIcon = ({ item }: { item: string }) => (
  <ItemIconInner item={item} key={item} />
)
