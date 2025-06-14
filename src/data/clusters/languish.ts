export interface EmotionCluster {
  name: string
  emotions: string[]
}

export const clusters: EmotionCluster[] = [
  {
    name: 'Glass Crypt',
    emotions: ['despair', 'hopelessness', 'exhaustion', 'burnout', 'resignation']
  },
  {
    name: 'Blank Prism',
    emotions: ['numbness', 'lost', 'disconnected', 'detached', 'shut down']
  },
  {
    name: 'Sapphire Chamber',
    emotions: ['grief', 'sorrow', 'mourning', 'heartache']
  },
  {
    name: 'Empty House',
    emotions: ['isolation', 'unreachable', 'abandoned', 'unseen']
  }
]
