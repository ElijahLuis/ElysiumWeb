import { clusters as clusterData } from '../clusters/abyss'
import { corePlanets as planetData } from '../planets/abyss'
import { realms } from '../realmMetadata'
import { Realm } from '../types'

export const clusters = clusterData
export const corePlanets = planetData

const realm: Realm = {
  realmName: realms['abyss'].realmName,
  color: realms['abyss'].color,
  clusters,
  corePlanets,
}

export default realm
