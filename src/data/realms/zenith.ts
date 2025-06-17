import { clusters as clusterData } from '../clusters/zenith'
import { corePlanets as planetData } from '../planets/zenith'
import { realms } from '../realmMetadata'
import { Realm } from '../types'

export const clusters = clusterData
export const corePlanets = planetData

const realm: Realm = {
  realmName: realms['zenith'].realmName,
  color: realms['zenith'].color,
  clusters,
  corePlanets,
}

export default realm
