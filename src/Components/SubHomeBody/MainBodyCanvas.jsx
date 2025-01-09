import { OrbitControls, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function MainBodyCanvas() {
  return <>
    <div className="main-canvas-background w-[60%] h-full flex justify-center items-center">
      <Canvas
        style={{width: '100%', height: '100%'}}
        camera={{position: [0,0,6]}}
      >
        <mesh>
          <planeGeometry args={[3,5]}/>
          <meshNormalMaterial/>
        </mesh>

        <OrbitControls />
      </Canvas>
    </div>
  </>
}
