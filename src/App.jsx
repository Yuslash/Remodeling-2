import { Canvas } from '@react-three/fiber'
import './index.css'
import { OrbitControls } from '@react-three/drei'

export default function App() {

  return <div className='canvas-container w-full h-full'>

    <Canvas style={{ width: '100%', height: '100%', }}
      camera={{ position: [3, 3, 3] }}
    >

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 2]} />

      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />

      </mesh>

      <OrbitControls />
    </Canvas>

  </div>

}

