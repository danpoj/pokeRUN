import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

const modelInfo = {
  mimikyu: {
    scale: 1.6,
  },
  bellsprout: {
    scale: 0.01,
  },
  bulbasaur: {
    scale: 80,
  },
}

export default create(
  subscribeWithSelector((set) => {
    return {
      model: 'mimikyu',
      modelScale: modelInfo.mimikyu.scale,
      seed: 0,
      phase: 'ready',
      startTime: 0,
      endTime: 0,

      start: () => {
        set((state) => {
          if (state.phase === 'ready') {
            return { phase: 'playing', startTime: Date.now() }
          }
          return {}
        })
      },

      restart: () => {
        set((state) => {
          if (state.phase === 'playing' || state.phase === 'ended') {
            return { phase: 'ready', seed: Math.random() }
          }

          return {}
        })
      },

      end: () => {
        set((state) => {
          if (state.phase === 'playing') {
            return { phase: 'ended', endTime: Date.now() }
          }

          return {}
        })
      },

      changeModel: (modelName) => {
        set((state) => {
          if (state.model === modelName) return {}
          return { model: modelName, modelScale: modelInfo[modelName].scale }
        })
      },
    }
  })
)
