// Extended realmsFull.ts with lore metadata, coreEmotions, empty relationships, and defaulted metrics 

import {
  realms,
  abyssClusters, cavernClusters, drossClusters, emberClusters, glareClusters,
  languishClusters, mistClusters, oasisClusters, traceClusters, zenithClusters,
  abyssPlanets, cavernPlanets, drossPlanets, emberPlanets, glarePlanets,
  languishPlanets, mistPlanets, oasisPlanets, tracePlanets, zenithPlanets
} from '../../src/data'

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
  coreEmotions: string[]
  tone: string
  lore: string
  metrics: {
    insight: number
    resonance: number
    momentum: number
    bravery: number
  }
  relationships: {
    bleedsInto: string[]
    awakens: string[]
    dampens: string[]
    resolvesIn: string[]
    driftsToward: string[]
  }
}

function combine(clusters: EmotionCluster[], planets: CorePlanet[]): FullCluster[] {
  return clusters.map((c, i) => ({ ...c, planet: planets[i] }))
}

export const elysiumFullSchema: FullRealm[] = [
  {
    id: 'abyss',
    name: realms['abyss'].realmName,
    color: realms['abyss'].color,
    quote: `Depths etched by fear, helplessness and panic.`,
    clusters: combine(abyssClusters, abyssPlanets),
    coreEmotions: ['fear', 'helplessness', 'panic', 'emptiness', 'hopelessness'],
    tone: `dark and suffocating`,
    lore: `Abyss is the place where the bottom drops out from within. It is the echo of panic, the paralysis of helplessness, and the void left by long-forgotten hope.`,
    metrics: { insight: 0, resonance: 0, momentum: 0, bravery: 0 },
    relationships: {
      bleedsInto: [],
      awakens: [],
      dampens: [],
      resolvesIn: [],
      driftsToward: []
    }
  },
  {
    id: 'glare',
    name: realms['glare'].realmName,
    color: realms['glare'].color,
    quote: `A searing stage of shame and judgment.`,
    clusters: combine(glareClusters, glarePlanets),
    coreEmotions: ['shame', 'humiliation', 'repression'],
    tone: `sharp and reflective`,
    lore: `Glare is the blistering awareness of being seen, judged, and diminished. A realm of mirrors too honest to forgive.`,
    metrics: { insight: 0, resonance: 0, momentum: 0, bravery: 0 },
    relationships: {
      bleedsInto: [],
      awakens: [],
      dampens: [],
      resolvesIn: [],
      driftsToward: []
    }
  },
  {
    id: 'oasis',
    name: realms['oasis'].realmName,
    color: realms['oasis'].color,
    quote: `A refuge of belonging and grateful joy.`,
    clusters: combine(oasisClusters, oasisPlanets),
    coreEmotions: ['peace', 'gratitude', 'joy', 'love'],
    tone: `soothing and nurturing`,
    lore: `Oasis is the sanctuary where the heart exhales. Every breeze is a welcome, every ripple a reunion.`,
    metrics: { insight: 0, resonance: 0, momentum: 0, bravery: 0 },
    relationships: {
      bleedsInto: [],
      awakens: [],
      dampens: [],
      resolvesIn: [],
      driftsToward: []
    }
  },
  {
    id: 'cavern',
    name: realms['cavern'].realmName,
    color: realms['cavern'].color,
    quote: `Twisting tunnels of jealousy and contempt.`,
    clusters: combine(cavernClusters, cavernPlanets),
    coreEmotions: ['idolization', 'resentment', 'envy'],
    tone: `echoing and obsessive`,
    lore: `Cavern is where admiration decays into obsession, and where bitterness clings to the walls like moss.`,
    metrics: { insight: 0, resonance: 0, momentum: 0, bravery: 0 },
    relationships: {
      bleedsInto: [],
      awakens: [],
      dampens: [],
      resolvesIn: [],
      driftsToward: []
    }
  },
  {
    id: 'zenith',
    name: realms['zenith'].realmName,
    color: realms['zenith'].color,
    quote: `The summit of empowerment and pride.`,
    clusters: combine(zenithClusters, zenithPlanets),
    coreEmotions: ['pride', 'confidence', 'truth'],
    tone: `clear and affirming`,
    lore: `Zenith is where identity aligns and the soul stands upright. Strength without cruelty. Truth without apology.`,
    metrics: { insight: 0, resonance: 0, momentum: 0, bravery: 0 },
    relationships: {
      bleedsInto: [],
      awakens: [],
      dampens: [],
      resolvesIn: [],
      driftsToward: []
    }
  },
  {
    id: 'languish',
    name: realms['languish'].realmName,
    color: realms['languish'].color,
    quote: `A cold plateau where despair and grief settle.`,
    clusters: combine(languishClusters, languishPlanets),
    coreEmotions: ['grief', 'despair', 'resignation'],
    tone: `still and heavy`,
    lore: `Languish is the realm of things left unsaid and undone—a landscape shaped by the weight of loss.`,
    metrics: { insight: 0, resonance: 0, momentum: 0, bravery: 0 },
    relationships: {
      bleedsInto: [],
      awakens: [],
      dampens: [],
      resolvesIn: [],
      driftsToward: []
    }
  },
  {
    id: 'dross',
    name: realms['dross'].realmName,
    color: realms['dross'].color,
    quote: `A wasteland steeped in revulsion and self-loathing.`,
    clusters: combine(drossClusters, drossPlanets),
    coreEmotions: ['disgust', 'self-loathing', 'contempt'],
    tone: `toxic and visceral`,
    lore: `Dross is the rancid field where rot is visible, where even one's thoughts curdle. Repulsion lives here, turned inward and outward.`,
    metrics: { insight: 0, resonance: 0, momentum: 0, bravery: 0 },
    relationships: {
      bleedsInto: [],
      awakens: [],
      dampens: [],
      resolvesIn: [],
      driftsToward: []
    }
  },
  {
    id: 'ember',
    name: realms['ember'].realmName,
    color: realms['ember'].color,
    quote: `Fields of frustration and reckless daring.`,
    clusters: combine(emberClusters, emberPlanets),
    coreEmotions: ['anger', 'defiance', 'frustration'],
    tone: `volatile and scorched`,
    lore: `Ember burns hot with unmet demands and bold attempts. It’s where the furious dare to act, again and again.`,
    metrics: { insight: 0, resonance: 0, momentum: 0, bravery: 0 },
    relationships: {
      bleedsInto: [],
      awakens: [],
      dampens: [],
      resolvesIn: [],
      driftsToward: []
    }
  },
  {
    id: 'mist',
    name: realms['mist'].realmName,
    color: realms['mist'].color,
    quote: `A labyrinth of curiosity and doubt.`,
    clusters: combine(mistClusters, mistPlanets),
    coreEmotions: ['confusion', 'curiosity', 'ambivalence'],
    tone: `dreamlike and elusive`,
    lore: `Mist veils the world in what-ifs and questions. Every step is fogged with multiple meanings.`,
    metrics: { insight: 0, resonance: 0, momentum: 0, bravery: 0 },
    relationships: {
      bleedsInto: [],
      awakens: [],
      dampens: [],
      resolvesIn: [],
      driftsToward: []
    }
  },
  {
    id: 'trace',
    name: realms['trace'].realmName,
    color: realms['trace'].color,
    quote: `Trails of nostalgia and yearning.`,
    clusters: combine(traceClusters, tracePlanets),
    coreEmotions: ['nostalgia', 'longing', 'sentimentality'],
    tone: `wistful and drifting`,
    lore: `Trace remembers everything. It keeps echoes of the past alive, soft and sorrowful, just out of reach.`,
    metrics: { insight: 0, resonance: 0, momentum: 0, bravery: 0 },
    relationships: {
      bleedsInto: [],
      awakens: [],
      dampens: [],
      resolvesIn: [],
      driftsToward: []
    }
  },
];

export default elysiumFullSchema;
