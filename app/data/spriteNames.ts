/**
 * Convert a species name (from @smogon/calc) to the PokemonDB sprite filename.
 *
 * PokemonDB sprite filenames use lowercase with hyphens:
 * e.g. "Landorus-Therian" → "landorus-therian"
 *      "Flutter Mane"     → "flutter-mane"
 *      "Mr. Mime"         → "mr-mime"
 *
 * Regional forms use adjective suffixes (alolan, galarian, hisuian, paldean).
 * Some base Pokemon require explicit default form names (e.g. deoxys-normal).
 *
 * Generated/validated by scripts/check-sprites.ts
 */

import { toID } from '@smogon/calc'

import { gen, toSmogonName } from '~/data/gen'

/** Slug a name segment: lowercase, spaces→hyphens, strip punctuation, normalize accents. */
const toSlug = (s: string): string =>
  s
    .normalize('NFD')
    .replaceAll(/[\u0300-\u036F]/g, '') // strip accent marks
    .toLowerCase()
    .replaceAll(/['''\u2018\u2019:]/g, '') // straight/curly quotes, colons
    .replaceAll(/\.\s*/g, '-')
    .replaceAll(/\s+/g, '-')
    .replaceAll(/-+/g, '-')
    .replaceAll(/^-|-$/g, '')

/** Regional suffix replacements applied to forme names. */
const REGION_MAP: Record<string, string> = {
  Alola: 'alolan',
  Galar: 'galarian',
  Hisui: 'hisuian',
  Paldea: 'paldean',
}

/**
 * Base Pokemon whose default form has an explicit name on PokemonDB.
 * These are Pokemon where PokemonDB does NOT use just the base name.
 */
const BASE_DEFAULTS: Record<string, string> = {
  'Aegislash-Blade': 'aegislash-blade',
  Basculegion: 'basculegion-male',
  Basculin: 'basculin-red-striped',
  Darmanitan: 'darmanitan-standard',
  Deoxys: 'deoxys-normal',
  Dudunsparce: 'dudunsparce-two-segment',
  Eiscue: 'eiscue-ice',
  Giratina: 'giratina-altered',
  Gimmighoul: 'gimmighoul-chest',
  Indeedee: 'indeedee-male',
  Lycanroc: 'lycanroc-midday',
  Maushold: 'maushold-family3',
  Meowstic: 'meowstic-male',
  Minior: 'minior-meteor',
  Morpeko: 'morpeko-full-belly',
  Ogerpon: 'ogerpon-teal',
  Oinkologne: 'oinkologne-male',
  Oricorio: 'oricorio-baile',
  Palafin: 'palafin-zero',
  Shaymin: 'shaymin-land',
  Squawkabilly: 'squawkabilly-green',
  Terapagos: 'terapagos-normal',
  Wishiwashi: 'wishiwashi-solo',
  Wormadam: 'wormadam-plant',
  Zygarde: 'zygarde-50',
}

/**
 * Hard overrides for names that cannot be derived algorithmically.
 */
const SPRITE_OVERRIDES: Record<string, string> = {
  // Aegislash: smogon base is "Aegislash-Blade", forms are Shield/Both
  'Aegislash-Both': 'aegislash-shield',
  'Aegislash-Shield': 'aegislash-shield',

  // Calyrex riders add "-rider" suffix
  'Calyrex-Ice': 'calyrex-ice-rider',
  'Calyrex-Shadow': 'calyrex-shadow-rider',

  // Darmanitan Galar default needs "standard"
  'Darmanitan-Galar': 'darmanitan-galarian-standard',

  // Maushold uses numeric family names
  'Maushold-Four': 'maushold-family4',

  // Pikachu cap forms: smogon uses region names, pokemondb adds "-cap"
  'Pikachu-Alola': 'pikachu-alola-cap',
  'Pikachu-Hoenn': 'pikachu-hoenn-cap',
  'Pikachu-Kalos': 'pikachu-kalos-cap',
  'Pikachu-Original': 'pikachu-original-cap',
  'Pikachu-Partner': 'pikachu-partner-cap',
  'Pikachu-Sinnoh': 'pikachu-sinnoh-cap',
  'Pikachu-Unova': 'pikachu-unova-cap',
  'Pikachu-World': 'pikachu-world-cap',

  // Ogerpon Tera forms → map to non-Tera equivalents (no separate tera sprites)
  'Ogerpon-Teal-Tera': 'ogerpon-teal',
  'Ogerpon-Wellspring-Tera': 'ogerpon-wellspring',
  'Ogerpon-Hearthflame-Tera': 'ogerpon-hearthflame',
  'Ogerpon-Cornerstone-Tera': 'ogerpon-cornerstone',

  // Zygarde 10% → "10"
  'Zygarde-10%': 'zygarde-10',

  // Minior Meteor is the same as Minior base
  'Minior-Meteor': 'minior-meteor',

  // Vivillon-Pokeball → poke-ball on pokemondb
  'Vivillon-Pokeball': 'vivillon-poke-ball',

  // Floette-Eternal has no separate sprite
  'Floette-Eternal': 'floette',

  // Greninja-Bond has no separate sprite (functionally same as Ash)
  'Greninja-Bond': 'greninja-ash',

  // Sinistcha-Masterpiece is cosmetic, no separate sprite
  'Sinistcha-Masterpiece': 'sinistcha',

  // Toxtricity Low-Key Gmax → pokemondb only has one Gmax form
  'Toxtricity-Low-Key-Gmax': 'toxtricity-gigantamax',

  // Urshifu base Gmax is Single Strike style
  'Urshifu-Gmax': 'urshifu-single-strike-gigantamax',

  // Totem forms don't exist on PokemonDB → map to base/non-totem equivalents
  'Araquanid-Totem': 'araquanid',
  'Gumshoos-Totem': 'gumshoos',
  'Kommo-o-Totem': 'kommo-o',
  'Lurantis-Totem': 'lurantis',
  'Marowak-Alola-Totem': 'marowak-alolan',
  'Mimikyu-Busted-Totem': 'mimikyu-busted',
  'Mimikyu-Totem': 'mimikyu',
  'Raticate-Alola-Totem': 'raticate-alolan',
  'Ribombee-Totem': 'ribombee',
  'Salazzle-Totem': 'salazzle',
  'Togedemaru-Totem': 'togedemaru',
  'Vikavolt-Totem': 'vikavolt',
}

/**
 * Transform a smogon forme string into PokemonDB suffix.
 * Handles regional prefixes, Gmax, gender abbreviations.
 */
const transformForme = (forme: string, baseSpecies: string): string => {
  const parts = forme.split('-')
  const transformed: string[] = []

  for (const part of parts) {
    if (REGION_MAP[part]) {
      transformed.push(REGION_MAP[part])
    } else switch (part) {
 case 'Gmax': {
      transformed.push('gigantamax')
    
 break;
 }
 case 'F': {
      transformed.push('female')
    
 break;
 }
 case 'M': {
      transformed.push('male')
    
 break;
 }
 case 'Mega': {
      transformed.push('mega')
    
 break;
 }
 case 'Primal': {
      transformed.push('primal')
    
 break;
 }
 default: {
      transformed.push(toSlug(part))
    }
 }
  }

  // If the forme after transformation is just a regional name and the base
  // species has an explicit default form, append the default suffix.
  // e.g. Darmanitan-Galar → darmanitan-galarian-standard
  if (
    transformed.length === 1 &&
    Object.values(REGION_MAP).includes(transformed[0]) &&
    BASE_DEFAULTS[baseSpecies]
  ) {
    const defaultSlug = BASE_DEFAULTS[baseSpecies]
    const basePart = toSlug(baseSpecies)
    const defaultSuffix = defaultSlug.slice(basePart.length + 1)
    if (defaultSuffix) {
      transformed.push(defaultSuffix)
    }
  }

  return transformed.join('-')
};

export const toSpriteId = (species: string): string => {
  const smogonName = toSmogonName(species)

  // Check hard overrides first
  if (SPRITE_OVERRIDES[smogonName]) {
    return SPRITE_OVERRIDES[smogonName]
  }

  // Check base defaults (species without forms that need explicit default names)
  if (BASE_DEFAULTS[smogonName]) {
    return BASE_DEFAULTS[smogonName]
  }

  const s = gen.species.get(toID(smogonName))
  if (!s) return toSlug(species)

  // Species with a form
  if (s.baseSpecies && s.baseSpecies !== s.name) {
    const forme = s.name.slice(s.baseSpecies.length + 1)
    if (!forme) return toSlug(s.name)

    const baseSlug = toSlug(s.baseSpecies)
    const formeSlug = transformForme(forme, s.baseSpecies)
    return `${baseSlug}-${formeSlug}`
  }

  return toSlug(s.name)
}
