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

  const reset = () => {
    body.current.setTranslation({ x: 0, y: 0.1, z: 7.35 })
    body.current.setLinvel({ x: 0, y: 0, z: 0 })
    body.current.setAngvel({ x: 0, y: 0, z: 0 })
  }

  useFrame((state, delta) => {
    console.log(body.current.translation())
    const bodyZPos = new Vector3(0, 0, body.current.translation().z)

    const cameraPosition = new Vector3()
    cameraPosition.copy(bodyZPos)
    cameraPosition.z += 8
    cameraPosition.y += 10
    cameraPosition.x += 2

    const cameraTarget = new Vector3()
    cameraTarget.copy(bodyZPos)
    cameraTarget.y += 0.1
    cameraTarget.z += -3

    smoothedCameraPosition.lerp(cameraPosition, 3 * delta)
    smoothedCameraTarget.lerp(cameraTarget, 3 * delta)

    state.camera.position.copy(smoothedCameraPosition)
    state.camera.lookAt(smoothedCameraTarget)
  })

  const goForward = () => {
    const { x, y, z } = body.current.translation()

    body.current.setTranslation({
      x,
      y,
      z: z - 1.05,
    })

    player.current.rotation.y = Math.PI
  }

  const goBackWard = () => {
    const { x, y, z } = body.current.translation()

    body.current.setTranslation({
      x,
      y,
      z: z + 1.05,
    })

    player.current.rotation.y = 0
  }

  const goLeftWard = () => {
    const { x, y, z } = body.current.translation()

    body.current.setTranslation({
      x: x - 0.7,
      y,
      z,
    })

    player.current.rotation.y = (Math.PI / 2) * 3
  }

  const goRightWard = () => {
    const { x, y, z } = body.current.translation()

    body.current.setTranslation({
      x: x + 0.7,
      y,
      z,
    })

    player.current.rotation.y = Math.PI / 2
  }

  useEffect(() => {
    body.current.setTranslation({ x: 0, y: 0, z: 7.35 })

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
      onCollisionEnter={({ other }) => {
        if (other.colliderObject.name === 'obstacle') {
          reset()
        }
      }}
      name='player'
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
