export interface EmotionCluster {
  name: string
  emotions: string[]
}

export const clusters: EmotionCluster[] = [
  {
    name: 'Silent Chase',
    emotions: ['fear', 'anxiety', 'suspicion', 'dread']
  },
  {
    name: 'Hollow Veil',
    emotions: ['emptiness', 'numbness', 'dysregulation', 'isolated']
  },
  {
    name: 'Frozen Nerve',
    emotions: ['panic', 'disoriented', 'overwhelmed', 'paranoia']
  },
  {
    name: 'Bound Breath',
    emotions: ['helplessness', 'collapse', 'suffocation', 'powerlessness']
  },
  {
    name: 'Null Horizon',
    emotions: ['hopelessness', 'despair', 'derealization', 'meaninglessness']
  }
]
