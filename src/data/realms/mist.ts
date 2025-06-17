import { clusters as clusterData } from '../clusters/mist'
import { corePlanets as planetData } from '../planets/mist'
import { realms } from '../realmMetadata'
import { Realm } from '../types'

export const clusters = clusterData
export const corePlanets = planetData

const realm: Realm = {
  realmName: realms['mist'].realmName,
  color: realms['mist'].color,
  clusters,
  corePlanets,
}

export default realm
