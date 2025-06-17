import { clusters as clusterData } from '../clusters/oasis'
import { corePlanets as planetData } from '../planets/oasis'
import { realms } from '../realmMetadata'
import { Realm } from '../types'

export const clusters = clusterData
export const corePlanets = planetData

const realm: Realm = {
  realmName: realms['oasis'].realmName,
  color: realms['oasis'].color,
  clusters,
  corePlanets,
}

export default realm
