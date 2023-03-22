import { addEffect } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import useGame from '../stores/useGame'

export default function Interface() {
  const time = useRef()
  const restart = useGame((state) => state.restart)
  const phase = useGame((state) => state.phase)

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState()
      //   console.log(state)
      let elapsedTime = 0
      if (state.phase === 'playing') {
        elapsedTime = Date.now() - state.startTime
      } else if (state.phase === 'ended') {
        elapsedTime = state.endTime - state.startTime
      }

      elapsedTime /= 1000
      elapsedTime = elapsedTime.toFixed(1)

      if (time.current) {
        time.current.textContent = elapsedTime
      }
    })

    return () => {
      unsubscribeEffect()
    }
  }, [])

  return (
    <div className='w-full h-full pointer-events-none'>
      {phase === 'ended' ? (
        <>
          <div
            ref={time}
            className='absolute top-[20%] left-0 w-full flex justify-center items-center text-white text-8xl bg-gradient-to-r from-cyan-400 to-fuchsia-600 py-2 px-4 rounded text-transparent bg-clip-text font-bold'
          >
            0.00초
          </div>
          <div className='absolute top-[40%] left-0 w-full flex items-center justify-center h-16'>
            <button
              className='h-full rounded w-40 text-white bg-transparent text-4xl font-bold pointer-events-auto cursor-pointer hover:bg-gradient-to-r hover:from-cyan-600 hover:to-fuchsia-600 transition-all'
              onClick={restart}
            >
              PLAY
            </button>
          </div>
        </>
      ) : (
        <div
          ref={time}
          className='absolute bottom-0 right-0 text-white text-3xl bg-gradient-to-r from-cyan-400 to-violet-500 py-2 px-4 rounded text-transparent bg-clip-text font-bold'
        >
          0.00
        </div>
      )}
    </div>
  )
}
