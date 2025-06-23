import { clusters as clusterData } from '../clusters/cavern'
import { corePlanets as planetData } from '../corePlanets/cavern'
import { realms } from '../realmMetadata'
import { Realm } from '../types'

export const clusters = clusterData
export const corePlanets = planetData

const realm: Realm = {
  realmName: realms['cavern'].realmName,
  color: realms['cavern'].color,
  clusters,
  corePlanets,
}

export default realm
