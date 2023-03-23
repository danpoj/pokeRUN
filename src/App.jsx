import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Perf } from 'r3f-perf'
import { FinishLine1, FinishLine2 } from './components/FinishLine'
import FloatingText from './components/FloatingText'
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
      <FloatingText />
      {/* <FinishLine1 scale={10} position={[0, 3, 10]} /> */}
      <FinishLine2 position={[0, 1, -47]} />
      {/* <Perf /> */}
    </Canvas>
  )
}

export default App
