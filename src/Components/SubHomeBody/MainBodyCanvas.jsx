import { OrbitControls, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function MainBodyCanvas() {
  return <>
    <div className="w-[40%] h-full bg-blue-500 flex justify-center items-center">
      <Canvas
        style={{width: '100%', height: '100%'}}
        camera={{position: [0,0,6]}}
      >
        <mesh>
          <planeGeometry args={[3,5]}/>
          <meshNormalMaterial/>
        </mesh>

     <Text
        position={[0, 3, 0]} // Position above the box
        fontSize={0.5}          // Adjust font size
        color="white"           // Text color
        anchorX="center"        // Horizontal alignment
        anchorY="middle"        // Vertical alignment
      >
       Here is your Certificate
      </Text>

        <OrbitControls />
      </Canvas>
    </div>
  </>
}
