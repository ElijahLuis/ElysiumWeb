import React from 'react'
import { CorePlanet, EmotionCluster } from '../data/types'

export interface RealmTemplateProps {
  realmName: string
  corePlanets: CorePlanet[]
  clusters: EmotionCluster[]
}

const RealmTemplate: React.FC<RealmTemplateProps> = ({
  realmName,
  corePlanets,
  clusters,
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
    </div>
  )
}

export default RealmTemplate
