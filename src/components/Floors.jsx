import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'

import { useMemo, useRef } from 'react'
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
  color: '#f66',
  metalness: 0,
  roughness: 1,
})
const wallMaterial = new THREE.MeshStandardMaterial({
  color: '#877',
  metalness: 0,
  roughness: 0,
})

export default function Floors({ count, seed }) {
  return (
    <>
      <group position={[0, 0, 2.1]}>
        {Array(53)
          .fill(0)
          .map((_, index) => (
            <Floor key={index} positionZ={7.35 - 1.05 * index} />
          ))}

        {Array(50)
          .fill(0)
          .map((_, index) => (
            <Obstacle key={index} positionZ={4.2 - 1.05 * index} />
          ))}
      </group>
    </>
  )
}

export function Floor({ positionZ = 7.35 }) {
  return (
    <RigidBody type='fixed'>
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, -0.4, positionZ]}
        scale={[40, 1, 1]}
        rotation={[0, 0, 0]}
        receiveShadow
        name='floor'
      />
    </RigidBody>
  )
}

export function Obstacle({ positionZ = 7.35 }) {
  const obstacleRef = useRef()

  const positionX = Math.random() * 20 - 10
  const speed = (Math.random() / 2 + 0.5) / 4
  const xLen = (Math.random() + 1) * 2
  let reverse = Math.random() < 0.5 ? true : false

  useFrame((state, delta) => {
    const { x, y, z } = obstacleRef.current.translation()
    if (reverse) {
      obstacleRef.current.setTranslation({ x: x - speed * delta * 14, y, z })
      if (x < -15) reverse = !reverse
    } else {
      obstacleRef.current.setTranslation({ x: x + speed * delta * 16, y, z })
      if (x > 15) reverse = !reverse
    }
  })

  return (
    <RigidBody
      position={[positionX, 0.25, positionZ]}
      ref={obstacleRef}
      name='obstacle'
      type='fixed'
    >
      <mesh
        geometry={boxGeometry}
        material={obstacleMaterial}
        scale={[xLen, 0.5, 0.5]}
        // receiveShadow
      />
    </RigidBody>
  )
}
