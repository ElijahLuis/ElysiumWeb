export interface EmotionCluster {
  name: string
  emotions: string[]
}

export const clusters: EmotionCluster[] = [
  {
    name: 'Lucid Thread',
    emotions: ['curious', 'intrigue', 'spark', 'suspense']
  },
  {
    name: 'Ancient Quiet',
    emotions: ['awe', 'wonder', 'reverence', 'timelessness']
  },
  {
    name: 'Fractal Maze',
    emotions: ['confusion', 'ambiguity', 'unease', 'lost', 'disoriented', 'bewildered']
  },
  {
    name: 'Shallow Anchor',
    emotions: ['doubt', 'skeptical', 'suspicious', 'distrust', 'second guessing']
  },
  {
    name: 'Myriad Glitch',
    emotions: ['surreal', 'uncanny', 'absurd', 'nonsensical', 'paradoxical']
  }
]
