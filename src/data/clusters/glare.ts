export interface EmotionCluster {
  name: string
  emotions: string[]
}

export const clusters: EmotionCluster[] = [
  {
    name: 'Fractured Stage',
    emotions: ['shame', 'humiliation', 'exposure', 'unworthiness']
  },
  {
    name: 'Deadlight Hall',
    emotions: ['repressed', 'tension', 'avoidance', 'self-denial']
  },
  {
    name: 'Glaring Eye',
    emotions: ['judged', 'mocked', 'spotlighted', 'accused']
  }
]
