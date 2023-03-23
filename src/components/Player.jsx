import { useGLTF, useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Vector3 } from 'three'
import useGame from '../stores/useGame'

export default function Player({ seed }) {
  const body = useRef()
  const player = useRef()
  const [subscribeKeys, getKeys] = useKeyboardControls()
  const [smoothedCameraPosition] = useState(() => new Vector3(20, 20, 20))
  const [smoothedCameraTarget] = useState(() => new Vector3())
  const model = useGame((state) => state.model)
  const modelScale = useGame((state) => state.modelScale)
  const character = useGLTF(`/players/${model}.glb`)

  const end = useGame((state) => state.end)
  const start = useGame((state) => state.start)
  const restart = useGame((state) => state.restart)
  const phase = useGame((state) => state.phase)

  const reset = () => {
    body.current.setTranslation({ x: 0, y: 0.1, z: 7.35 })
    body.current.setLinvel({ x: 0, y: 0, z: 0 })
    body.current.setAngvel({ x: 0, y: 0, z: 0 })
  }

  useFrame((state, delta) => {
    const bodyZPos = new Vector3(0, 0, body.current.translation().z)

    if (bodyZPos.z < -45) {
      end()
      body.current.setTranslation({ x: 0, y: 0.1, z: 7.35 })
      body.current.setLinvel({ x: 0, y: 0, z: 0 })
      body.current.setAngvel({ x: 0, y: 0, z: 0 })
    }

    if (body.current.translation().y < -4) {
      restart()
      body.current.setTranslation({ x: 0, y: 0.1, z: 7.35 })
      body.current.setLinvel({ x: 0, y: 0, z: 0 })
      body.current.setAngvel({ x: 0, y: 0, z: 0 })
    }

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

    if (model === 'mimikyu' || model === 'bulbasaur') {
      player.current.rotation.y = Math.PI
    } else if (model === 'bellsprout') {
      player.current.rotation.y = (Math.PI / 2) * 3
    }
  }

  const goBackWard = () => {
    const { x, y, z } = body.current.translation()

    body.current.setTranslation({
      x,
      y,
      z: z + 1.05,
    })

    if (model === 'mimikyu' || model === 'bulbasaur') {
      player.current.rotation.y = 0
    } else if (model === 'bellsprout') {
      player.current.rotation.y = Math.PI / 2
    }
  }

  const goLeftWard = () => {
    const { x, y, z } = body.current.translation()

    body.current.setTranslation({
      x: x - 0.7,
      y,
      z,
    })

    if (model === 'mimikyu' || model === 'bulbasaur') {
      player.current.rotation.y = (Math.PI / 2) * 3
    } else if (model === 'bellsprout') {
      player.current.rotation.y = Math.PI * 2
    }
  }

  const goRightWard = () => {
    const { x, y, z } = body.current.translation()

    body.current.setTranslation({
      x: x + 0.7,
      y,
      z,
    })

    if (model === 'mimikyu' || model === 'bulbasaur') {
      player.current.rotation.y = Math.PI / 2
    } else if (model === 'bellsprout') {
      player.current.rotation.y = Math.PI
    }
  }

  useEffect(() => {
    body.current.setTranslation({ x: 0, y: 0, z: 7.35 })
    if (model === 'bellsprout') player.current.rotation.y = Math.PI / 2

    const unsubscribeForward = subscribeKeys(
      (state) => {
        return state.forward
      },
      (value) => {
        if (phase === 'ended') return
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
        if (phase === 'ended') return
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
        if (phase === 'ended') return
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
        if (phase === 'ended') return
        if (value === false) {
          goRightWard()
        }
      }
    )

    const unsubscribeAny = subscribeKeys(() => {
      if (phase === 'ended') return
      start()
    })

    return () => {
      unsubscribeForward()
      unsubscribeBackWard()
      unsubscribeLeftWard()
      unsubscribeRightWard()
      unsubscribeAny()
    }
  }, [phase, model])

  return (
    <RigidBody
      ref={body}
      onCollisionEnter={({ other }) => {
        if (other.colliderObject.name === 'obstacle') {
          reset()
          restart()
        }
      }}
      name='player'
      type='dynamic'
      colliders='cuboid'
      position={[0, 0, 0]}
    >
      <primitive ref={player} object={character.scene} scale={modelScale} />
    </RigidBody>
  )
}
