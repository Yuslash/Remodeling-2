import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useState } from "react";

export default function RingMesh() {

    const { thetaLength,  } = useControls({
        thetaLength: {value: 0.5, min: 0, max: 7, step: 0.01},
        // thetaStart: {value: 5, min: 0, max: 7, step: 0.01},
    })

    const [thetaStart, setThetaStart] = useState(5); // Initial value

    // Animate the thetaStart value
    useFrame(() => {
      setThetaStart(prev => (prev + 0.01) % (Math.PI * 2)); // Increase and loop after full rotation
    });
 
    const outerRadius = 2
    const innerRadius = 1.95

    return (
        <div className="w-full h-full bg-black">
            <Canvas>
                <mesh rotation={[-Math.PI / 2,0,0]} position={[0,-1.01,0]}>
                    <circleGeometry args={[outerRadius, 64, thetaStart, thetaLength]} />
                    <meshBasicMaterial color="red" />
                </mesh>
                <mesh rotation={[- Math.PI / 2,0,0]} position={[0,-1,0.01]}>
                    <circleGeometry args={[innerRadius, 64]} />
                    <meshBasicMaterial color="blue" />
                </mesh>
                <OrbitControls />
            </Canvas>
        </div>
    )
}