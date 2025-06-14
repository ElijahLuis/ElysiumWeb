import { clusters as clusterData } from '../clusters/ember'
import { corePlanets as planetData } from '../planets/ember'
import { realms } from '../realmMetadata'
import { Realm } from '../types'

export const clusters = clusterData
export const corePlanets = planetData

const realm: Realm = {
  realmName: realms['ember'].realmName,
  clusters,
  corePlanets,
}

export default realm
