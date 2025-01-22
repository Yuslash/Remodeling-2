import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";

export default function RingMesh() {

    const { thetaLength, thetaStart, meshRotationz } = useControls({
        thetaLength: {value: 0.5, min: 0, max: 7, step: 0.01},
        thetaStart: {value: 5, min: 0, max: 7, step: 0.01},
        meshRotationz: {value: 0, min: -3, max: 3, step: 0.001}
    })

    const outerRadius = 2
    const innerRadius = 1.95

    return (
        <div className="w-full h-full bg-black">
            <Canvas>
                <mesh rotation={[-Math.PI / 2,0,0]} position={[0,-1.01,0]}>
                    <circleGeometry args={[2, 64, 5, 0.5]} />
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