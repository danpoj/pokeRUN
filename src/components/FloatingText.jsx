import { Float, Text } from '@react-three/drei'

export default function FloatingText() {
  return (
    <>
      <Float floatIntensity={0.5} rotationIntensity={0.5}>
        <Text
          font='./bebas-neue-v9-latin-regular.woff'
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign='right'
          position={[2, 1.4, 7]}
          rotation-y={-0.25}
          scale={1}
          color='#f0ff22'
        >
          poke{`\n`}run
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>

      <Float floatIntensity={0.1} rotationIntensity={0.1}>
        <Text
          font='./bebas-neue-v9-latin-regular.woff'
          maxWidth={8}
          lineHeight={0.75}
          textAlign='right'
          position={[0, 1.4, -46]}
          rotation-y={0.25}
          scale={0.5}
          color='black'
        >
          github / @danpoj
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
    </>
  )
}
