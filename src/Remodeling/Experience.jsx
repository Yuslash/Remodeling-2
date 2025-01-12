import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing'

export default function Experience() {
 
  return (
    <Canvas flat orthographic camera={{ zoom: 100 }}>
      <color attach="background" args={['#111']} />
      <ambientLight />
      <EffectComposer disableNormalPass>
        <Bloom mipmapBlur luminanceThreshold={1} levels={levels} intensity={intensity * 4} />
        <ToneMapping />
      </EffectComposer>
      <Shape color="hotpink" position={[-2, 0, 0]}>
        <planeGeometry args={[1.5, 1.5]} />
      </Shape>
      <Shape color="orange" position={[0, -0.25, 0]} rotation={[0, 0, Math.PI / 2]}>
        <circleGeometry args={[1, 1]} />
      </Shape>
      <Shape color="skyblue" position={[2, 0, 0]}>
        <circleGeometry args={[0.8, 64]} />
      </Shape>
    </Canvas>
  )
}

function Shape({ children, color, ...props }) {
  const [hovered, hover] = useState(true)
  return (
    <mesh {...props} onPointerOver={() => hover(false)} onPointerOut={() => hover(true)}>
      {children}
      {/* In order to get selective bloom we must crank colors out of
        their 0-1 spectrum. We push them way out of range. What previously was [1, 1, 1] now could
        for instance be [10, 10, 10]. */}
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={!hovered ? 4 : 0} />
    </mesh>
  )
}