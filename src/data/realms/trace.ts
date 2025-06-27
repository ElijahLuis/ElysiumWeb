import { clusters as clusterData } from '../clusters/trace'
import { corePlanets as planetData } from '../corePlanets/trace'
import { realms } from '../realmMetadata'
import { Realm } from '../types'

export const clusters = clusterData
export const corePlanets = planetData

const realm: Realm = {
  realmName: realms['trace'].realmName,
  color: realms['trace'].color,
  clusters,
  corePlanets,
}

export default realm
