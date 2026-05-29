import { StarIcon } from '~/components/icons'

interface Properties {
  isFavorite: boolean
  onClick: () => void
}

export const FavoriteButton = ({ isFavorite, onClick }: Properties) => (
  <button
    className={`shrink-0 cursor-pointer border-none bg-none px-0.5 leading-none ${isFavorite ? 'text-yellow-400 opacity-100' : 'text-text-faint opacity-30'}`}
    title="Toggle favorite"
    onClick={(e) => {
      e.stopPropagation()
      onClick()
    }}
  >
    <StarIcon className="h-3.5 w-3.5" />
  </button>
)
