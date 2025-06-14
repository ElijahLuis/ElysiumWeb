export interface RealmMeta {
  realmName: string
  tagline: string
  gradientColors: [string, string]
  corePlanets: string[]
  //ambientSound: string
  particleStyle: string
}

export const realms: Record<string, RealmMeta> = {
  abyss: {
    realmName: 'Abyss',
    tagline: '--',
    gradientColors: ['#1f0036', '#000000'],
    corePlanets: ['--'],
    //ambientSound: '/assets/audio/abyss.mp3',
    particleStyle: 'dark',
  },
  cavern: {
    realmName: 'Cavern',
    tagline: '--',
    gradientColors: ['#3b2f2f', '#6a4e4e'],
    corePlanets: ['--'],
    //ambientSound: '/assets/audio/cavern.mp3',
    particleStyle: 'stone',
  },
  dross: {
    realmName: 'Dross',
    tagline: '--',
    gradientColors: ['#4a4a4a', '#b0b0b0'],
    corePlanets: ['--'],
    //ambientSound: '/assets/audio/dross.mp3',
    particleStyle: 'spark',    
  },
  ember: {
    realmName: 'Ember',
    tagline: '--',
    gradientColors: ['#ff4500', '#ff8c00'],
    corePlanets: ['--'],
    //ambientSound: '/assets/audio/ember.mp3',
    particleStyle: 'fire',
  },
  glare: {
    realmName: 'Glare',
    tagline: '--',
    gradientColors: ['#f0e68c', '#ffd700'],
    corePlanets: ['--'],
    //ambientSound: '/assets/audio/glare.mp3',
    particleStyle: 'light',
  },
  languish: {
    realmName: 'Languish',
    tagline: '--',
    gradientColors: ['#2f4f4f', '#4682b4'],
    corePlanets: ['Tranquilis', 'Serenity', 'Calmara'],
    //ambientSound: '/assets/audio/languish.mp3',
    particleStyle: 'water',
  },
  mist: {
    realmName: 'Mist',
    tagline: 'Veil of mystery',
    gradientColors: ['#b0c4de', '#4682b4'],
    corePlanets: ['Nebulis', 'Veilara', 'Haze'],
    //ambientSound: '/assets/audio/mist.mp3',
    particleStyle: 'mist',
  },
  oasis: {
    realmName: 'Oasis',
    tagline: 'Find solace in serenity',
    gradientColors: ['#006a4e', '#00b4db'],
    corePlanets: ['Euphora', 'Seraphis', 'Halcyon'],
    //ambientSound: '/assets/audio/oasis.mp3',
    particleStyle: 'dirt',
  },
  trace: {
    realmName: 'Trace',
    tagline: 'Follow the path of light',
    gradientColors: ['#f0f8ff', '#add8e6'],
    corePlanets: ['Luminis', 'Pathos', 'Glint'],
    //ambientSound: '/assets/audio/trace.mp3',
    particleStyle: 'smoke',
  },
  zenith: {
    realmName: 'Zenith',
    tagline: 'Rise beyond the horizon',
    gradientColors: ['#360033', '#0b8793'],
    corePlanets: ['Moltara', 'Aethernus', 'Pyrius'],
    //ambientSound: '/assets/audio/zenith.mp3',
    particleStyle: 'glow',
  },
  
}
