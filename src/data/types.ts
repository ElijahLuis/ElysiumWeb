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
