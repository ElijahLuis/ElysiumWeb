import { todo } from 'node:test'
import React from 'react'

export interface RealmTemplateProps {
  realmName: string
  corePlanets: string[]
}

const RealmTemplate: React.FC<RealmTemplateProps> = ({ realmName, corePlanets }) => {
  return (
    <div className="realm">
      <h1>{realmName}</h1>
      <ul>
        {corePlanets.map(planet => (
          <li key={planet}>{planet}</li>
        ))}
      </ul>
    </div>
  )
}

export default RealmTemplate
