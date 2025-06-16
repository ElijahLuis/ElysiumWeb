import React from 'react'
import { CorePlanet, EmotionCluster } from '../data/types'

export interface RealmTemplateProps {
  realmName: string
  corePlanets: CorePlanet[]
  clusters: EmotionCluster[]
  icon: string
}

const RealmTemplate: React.FC<RealmTemplateProps> = ({
  realmName,
  corePlanets,
  clusters,
  icon,
}: RealmTemplateProps) => {
  return (
    <div className="realm">
      <h1>{realmName}</h1>
      <div className="cluster-bubbles">
        {clusters.map((cluster, i) => {
          const planet = corePlanets[i]
          return (
            <div className="cluster" key={cluster.name}>
              <button
                type="button"
                className="cluster-bubble"
                aria-expanded="false"
              >
                {cluster.name}
              </button>
              <div className="cluster-menu" hidden>
                {planet && <h2>{planet.name}</h2>}
                <ul>
                  {cluster.emotions.map(emotion => (
                    <li key={emotion}>{emotion}</li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
      <section id="realm-space" className="realm-section">
        <div className="realm-icon">{icon}</div>
        <h2>Realm Space</h2>
        <button className="select-btn">Visit {realmName} Space</button>
      </section>
    </div>
  )
}

export default RealmTemplate
