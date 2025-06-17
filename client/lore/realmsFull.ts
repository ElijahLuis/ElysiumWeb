import { realms,
  abyssClusters, cavernClusters, drossClusters, emberClusters, glareClusters,
  languishClusters, mistClusters, oasisClusters, traceClusters, zenithClusters,
  abyssPlanets, cavernPlanets, drossPlanets, emberPlanets, glarePlanets,
  languishPlanets, mistPlanets, oasisPlanets, tracePlanets, zenithPlanets } from '../../src/data'
import type { EmotionCluster, CorePlanet } from '../../src/data/types'

interface FullCluster extends EmotionCluster {
  planet: CorePlanet
}

export interface FullRealm {
  id: keyof typeof realms
  name: string
  color: string
  quote: string
  clusters: FullCluster[]
}

function combine(clusters: EmotionCluster[], planets: CorePlanet[]): FullCluster[] {
  return clusters.map((c, i) => ({ ...c, planet: planets[i] }))
}

export const elysiumFullSchema: FullRealm[] = [
  {
    id: 'oasis',
    name: realms['oasis'].realmName,
    color: realms['oasis'].color,
    quote: 'A refuge of belonging and grateful joy.',
    clusters: combine(oasisClusters, oasisPlanets),
  },
  {
    id: 'abyss',
    name: realms['abyss'].realmName,
    color: realms['abyss'].color,
    quote: 'Depths etched by fear, helplessness and panic.',
    clusters: combine(abyssClusters, abyssPlanets),
  },
  {
    id: 'zenith',
    name: realms['zenith'].realmName,
    color: realms['zenith'].color,
    quote: 'The summit of empowerment and pride.',
    clusters: combine(zenithClusters, zenithPlanets),
  },
  {
    id: 'languish',
    name: realms['languish'].realmName,
    color: realms['languish'].color,
    quote: 'A cold plateau where despair and grief settle.',
    clusters: combine(languishClusters, languishPlanets),
  },
  {
    id: 'cavern',
    name: realms['cavern'].realmName,
    color: realms['cavern'].color,
    quote: 'Twisting tunnels of jealousy and contempt.',
    clusters: combine(cavernClusters, cavernPlanets),
  },
  {
    id: 'dross',
    name: realms['dross'].realmName,
    color: realms['dross'].color,
    quote: 'A wasteland steeped in revulsion and self-loathing.',
    clusters: combine(drossClusters, drossPlanets),
  },
  {
    id: 'ember',
    name: realms['ember'].realmName,
    color: realms['ember'].color,
    quote: 'Fields of frustration and reckless daring.',
    clusters: combine(emberClusters, emberPlanets),
  },
  {
    id: 'glare',
    name: realms['glare'].realmName,
    color: realms['glare'].color,
    quote: 'A searing stage of shame and judgment.',
    clusters: combine(glareClusters, glarePlanets),
  },
  {
    id: 'mist',
    name: realms['mist'].realmName,
    color: realms['mist'].color,
    quote: 'A labyrinth of curiosity and doubt.',
    clusters: combine(mistClusters, mistPlanets),
  },
  {
    id: 'trace',
    name: realms['trace'].realmName,
    color: realms['trace'].color,
    quote: 'Trails of nostalgia and yearning.',
    clusters: combine(traceClusters, tracePlanets),
  },
]

export default elysiumFullSchema
