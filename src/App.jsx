import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Perf } from 'r3f-perf'
import Floors from './components/Floors'
import Lights from './components/Lights'
import Player from './components/Player'
import useGame from './stores/useGame'

function App() {
  const seed = useGame((state) => state.seed)
  // console.log(seed)

  return (
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [2.5, 8, 10],
      }}
    >
      <color args={['#87CEEB']} attach='background' />
      <Lights />

      <Physics>
        <Floors count={53} seed={seed} />
        <Player seed={seed} />
      </Physics>
      {/* <Perf /> */}
    </Canvas>
  )
}

export default App
