import { clusters as clusterData } from '../clusters/glare'
import { corePlanets as planetData } from '../planets/glare'
import { realms } from '../realmMetadata'
import { Realm } from '../types'

export const clusters = clusterData
export const corePlanets = planetData

const realm: Realm = {
  realmName: realms['glare'].realmName,
  clusters,
  corePlanets,
}

export default realm
