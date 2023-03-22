import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import Floors from './components/Floors'
import Lights from './components/Lights'
import Player from './components/Player'

function App() {
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
        <Floors />
        <Player />
      </Physics>
    </Canvas>
  )
}

export default App
