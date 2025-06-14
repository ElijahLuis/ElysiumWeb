import { todo } from 'node:test'
import React from 'react'

export interface RealmTemplateProps {
  realmName: string
  tagline: string
  gradientColors: [string, string]
  corePlanets: string[]
//ambientSound: string
  particleStyle: string
}

const RealmTemplate: React.FC<RealmTemplateProps> = ({
  realmName,
  tagline,
  gradientColors,
  corePlanets,
//ambientSound,
  particleStyle,
}) => {
  const backgroundStyle = {
    background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
  }

  return (
    <div className="realm" style={backgroundStyle} data-particles={particleStyle}>
      <h1>{realmName}</h1>
      <p className="tagline">{tagline}</p>
      <ul>
        {corePlanets.map(planet => (
          <li key={planet}>{planet}</li>
        ))}
      </ul>
    <audio src={'PLACE-AUDIO-HERE'} autoPlay loop />
    </div>
  )
}

export default RealmTemplate
