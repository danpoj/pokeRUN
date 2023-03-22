import { useGLTF, useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { useEffect, useRef, useState } from 'react'
import { Vector3 } from 'three'

export default function Player() {
  const body = useRef()
  const player = useRef()
  const [subscribeKeys, getKeys] = useKeyboardControls()
  const character = useGLTF('/players/mimikyu.glb')
  const [smoothedCameraPosition] = useState(() => new Vector3(20, 20, 20))
  const [smoothedCameraTarget] = useState(() => new Vector3())

  character.scene.rotation.y = Math.PI
  character.scene.position.z = 7.35

  useFrame((state, delta) => {
    const playerPosition = new Vector3(0, 0, player.current.position.z)

    const cameraPosition = new Vector3()
    cameraPosition.copy(playerPosition)
    cameraPosition.z += 8
    cameraPosition.y += 10
    cameraPosition.x += 2

    const cameraTarget = new Vector3()
    cameraTarget.copy(playerPosition)
    cameraTarget.y += 0.1
    cameraTarget.z += -3

    smoothedCameraPosition.lerp(cameraPosition, 3 * delta)
    smoothedCameraTarget.lerp(cameraTarget, 3 * delta)

    state.camera.position.copy(smoothedCameraPosition)
    state.camera.lookAt(smoothedCameraTarget)
  })

  const goForward = () => {
    player.current.position.z -= 1.05
    player.current.rotation.y = Math.PI
  }

  const goBackWard = () => {
    player.current.position.z += 1.05
    player.current.rotation.y = 0
  }

  const goLeftWard = () => {
    player.current.position.x -= 1.05
    player.current.rotation.y = (Math.PI / 2) * 3
  }

  const goRightWard = () => {
    player.current.position.x += 1.05
    player.current.rotation.y = Math.PI / 2
  }

  useEffect(() => {
    const unsubscribeForward = subscribeKeys(
      (state) => {
        return state.forward
      },
      (value) => {
        if (value === false) {
          goForward()
        }
      }
    )

    const unsubscribeBackWard = subscribeKeys(
      (state) => {
        return state.backward
      },
      (value) => {
        if (value === false) {
          goBackWard()
        }
      }
    )

    const unsubscribeLeftWard = subscribeKeys(
      (state) => {
        return state.leftward
      },
      (value) => {
        if (value === false) {
          goLeftWard()
        }
      }
    )

    const unsubscribeRightWard = subscribeKeys(
      (state) => {
        return state.rightward
      },
      (value) => {
        if (value === false) {
          goRightWard()
        }
      }
    )

    return () => {
      unsubscribeForward()
      unsubscribeBackWard()
      unsubscribeLeftWard()
      unsubscribeRightWard()
    }
  }, [])

  return (
    <RigidBody
      ref={body}
      type='fixed'
      linearDamping={0.5}
      angularDamping={0.5}
      colliders='ball'
      restitution={0.2}
      friction={1}
      position={[0, 0, 0]}
    >
      <primitive ref={player} object={character.scene} scale={1.4} />
    </RigidBody>
  )
}
