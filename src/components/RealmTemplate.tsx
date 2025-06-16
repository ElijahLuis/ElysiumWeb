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
      <section id="feed-section">
        <h2 className="stellar-heading">Live Feed</h2>
        <ul id="live-feed" aria-live="polite">
          <li className="feed-item">
            <time className="feed-time">10:30 AM</time>
            <p className="feed-text">Nova just joined the cosmic voyage.</p>
          </li>
          <li className="feed-item">
            <time className="feed-time">10:25 AM</time>
            <p className="feed-text">Lumen earned the Explorer badge.</p>
          </li>
          <li className="feed-item">
            <time className="feed-time">10:00 AM</time>
            <p className="feed-text">Stella shared a glowing reflection.</p>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default RealmTemplate
