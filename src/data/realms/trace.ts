import { clusters as clusterData } from '../clusters/trace'
import { corePlanets as planetData } from '../planets/trace'
import { realms } from '../realmMetadata'
import { Realm } from '../types'

export const clusters = clusterData
export const corePlanets = planetData

const realm: Realm = {
  realmName: realms['trace'].realmName,
  clusters,
  corePlanets,
}

export default realm
