import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing'
import { useControls } from 'leva'

export default function App() {
  const { levels, intensity } = useControls({
    intensity: { value: 0.4, min: 0, max: 1.5, step: 0.01 },
    levels: { value: 8, min: 1, max: 9, step: 1 }
  })
  return (
    <div className='absoulte top-0 left-0 w-full h-full flex bg-black'>
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
    </div>
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
