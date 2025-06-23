import { clusters as clusterData } from '../clusters/glare'
import { corePlanets as planetData } from '../corePlanets/glare'
import { realms } from '../realmMetadata'
import { Realm } from '../types'

export const clusters = clusterData
export const corePlanets = planetData

const realm: Realm = {
  realmName: realms['glare'].realmName,
  color: realms['glare'].color,
  clusters,
  corePlanets,
}

export default realm
