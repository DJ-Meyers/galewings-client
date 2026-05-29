import { Generations } from '@smogon/calc'

export const gen = Generations.get(9)

// Display-name aliases the client uses for compactness.
// Maps client display name → @smogon/calc canonical species name.
const DISPLAY_NAME_TO_SMOGON: Record<string, string> = {
  'Basculin-Blue': 'Basculin-Blue-Striped',
  'Basculin-White': 'Basculin-White-Striped',
  'Urshifu-Rapid': 'Urshifu-Rapid-Strike',
  'Urshifu-Single': 'Urshifu',
}

const SMOGON_TO_DISPLAY: Record<string, string> = Object.fromEntries(
  Object.entries(DISPLAY_NAME_TO_SMOGON)
    .filter(([display, smogon]) => display !== smogon)
    .map(([display, smogon]) => [smogon, display]),
)

export const toSmogonName = (displayName: string): string =>
  DISPLAY_NAME_TO_SMOGON[displayName] ?? displayName

export const toDisplayName = (smogonName: string): string =>
  SMOGON_TO_DISPLAY[smogonName] ?? smogonName
