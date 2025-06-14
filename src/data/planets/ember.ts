export interface CorePlanet {
  name: string
  emotion: string
  satellites?: string[]
}

export const corePlanets: CorePlanet[] = [
  { name: 'Agnera', emotion: 'frustrated' },
  { name: 'Fureza', emotion: 'rage', satellites: ['wrath', 'fury'] },
  { name: 'Romana', emotion: 'reckless' },
  { name: 'Provota', emotion: 'aggressive' }
]
