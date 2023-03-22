import { RigidBody } from '@react-three/rapier'
import { useControls } from 'leva'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

THREE.ColorManagement.enabled = true

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const floor1Material = new THREE.MeshStandardMaterial({
  color: '#222',
  metalness: 0,
  roughness: 0,
})
const floor2Material = new THREE.MeshStandardMaterial({
  color: '#222',
  metalness: 0,
  roughness: 0,
})
const obstacleMaterial = new THREE.MeshStandardMaterial({
  color: '#f00',
  metalness: 0,
  roughness: 1,
})
const wallMaterial = new THREE.MeshStandardMaterial({
  color: '#877',
  metalness: 0,
  roughness: 0,
})

export default function Floors() {
  const { floorsPos } = useControls({
    floorsPos: [0, 0, 2.1],
  })

  return (
    <>
      <group position={floorsPos}>
        {Array(30)
          .fill(0)
          .map((floor, index) => (
            <Floor key={index} positionZ={7.35 - 1.05 * index} />
          ))}
      </group>
    </>
  )
}

export function Floor({ positionZ = 7.35 }) {
  const { floorScale } = useControls({
    floorScale: [40, 0.1, 1],
  })

  return (
    <RigidBody type='fixed'>
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, -0.1, positionZ]}
        scale={floorScale}
        receiveShadow
      />
    </RigidBody>
  )
}
