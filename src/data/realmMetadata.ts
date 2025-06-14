export interface RealmMeta {
  realmName: string
  tagline: string
  gradientColors: [string, string]
  corePlanets: string[]
  ambientSound: string
  particleStyle: string
}

export const realms: Record<string, RealmMeta> = {
  abyss: {
    realmName: 'Abyss',
    tagline: 'Embrace the unknown',
    gradientColors: ['#1f0036', '#000000'],
    corePlanets: ['Nocturnis', 'Erevos', 'Delirion'],
    ambientSound: '/assets/audio/abyss.mp3',
    particleStyle: 'darkMist',
  },
  oasis: {
    realmName: 'Oasis',
    tagline: 'Find solace in serenity',
    gradientColors: ['#006a4e', '#00b4db'],
    corePlanets: ['Euphora', 'Seraphis', 'Halcyon'],
    ambientSound: '/assets/audio/oasis.mp3',
    particleStyle: 'dust',
  },
  zenith: {
    realmName: 'Zenith',
    tagline: 'Rise beyond the horizon',
    gradientColors: ['#360033', '#0b8793'],
    corePlanets: ['Moltara', 'Aethernus', 'Pyrius'],
    ambientSound: '/assets/audio/zenith.mp3',
    particleStyle: 'glow',
  },
}
