import React from 'react'
import { CorePlanet } from '../data/types'

export interface RealmTemplateProps {
  realmName: string
  corePlanets: CorePlanet[]
}

const RealmTemplate: React.FC<RealmTemplateProps> = ({
  realmName,
  corePlanets,
}: RealmTemplateProps) => {
  return (
    <div className="realm">
      <h1>{realmName}</h1>
      <ul>
        {corePlanets.map(({ name, emotion }) => (
          <li key={name}>
            <strong>{name}</strong>: {emotion}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RealmTemplate
