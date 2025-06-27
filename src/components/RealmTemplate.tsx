import React from 'react'
import { CorePlanet, EmotionCluster } from '../data/types'

export interface RealmTemplateProps {
  realmName: string
  corePlanets: CorePlanet[]
  clusters: EmotionCluster[]
  icon: string
  color: string
}

const RealmTemplate: React.FC<RealmTemplateProps> = ({
  realmName,
  corePlanets,
  clusters,
  icon,
  color,
}: RealmTemplateProps) => {
  return (
    <div
      className={`realm realm-${realmName.toLowerCase()}`}
      style={{
        '--realm-color': color,
      } as React.CSSProperties}
    >
      <h1>{realmName}</h1>
      <section id="realm-space" className="realm-section">
        <div className="cluster-bubbles">
          {clusters.map((cluster, i) => {
            const planet = corePlanets[i]
            return (
              <div className="cluster" key={cluster.name}>
                <button type="button" className="cluster-bubble" aria-expanded="false">
                  {cluster.name}
                </button>
                <div className="cluster-menu">
                  {planet && <h2>{planet.name}</h2>}
                  {cluster.emotions[0] && (
                    <>
                      <div className="core-emotion">{cluster.emotions[0]}</div>
                      {cluster.emotions.length > 1 && (
                        <hr className="cluster-divider" />
                      )}
                    </>
                  )}
                  {cluster.emotions.length > 1 && (
                    <ul>
                      {cluster.emotions.slice(1).map(emotion => (
                        <li key={emotion}>{emotion}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <hr className="realm-divider" />
        <div className="realm-bottom">
          <div className="realm-icon">{icon}</div>
          <h2>Realm Space</h2>
          <button className="select-btn">Visit {realmName} Space</button>
        </div>
      </section>
    </div>
  )
}

export default RealmTemplate
