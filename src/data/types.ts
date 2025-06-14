export interface EmotionCluster {
  name: string
  emotions: string[]
}

export interface CorePlanet {
  name: string
  emotion: string
  satellites?: string[]
}

export interface RealmDetail {
  clusters: EmotionCluster[]
  corePlanets: CorePlanet[]
}

import type { RealmMeta } from './realmMetadata'

/**
 * Full data for a realm including its meta information.
 */
export interface Realm extends RealmMeta, RealmDetail {}
