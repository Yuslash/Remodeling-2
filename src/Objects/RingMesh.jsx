import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";

export default function RingMesh() {

    const { thetaLength } = useControls({
        thetaLength: {value: 0, min: 0, max: 7, step: 0.01}
    })
 
    const outerRadius = 2
    const innerRadius = 1.95

    return (
        <div className="w-full h-full">
            <Canvas>
                <mesh>
                    <circleGeometry args={[outerRadius, 64, 0, thetaLength]} />
                    <meshBasicMaterial color="red" />
                </mesh>
                <mesh position={[0,0,0.01]}>
                    <circleGeometry args={[innerRadius, 64]} />
                    <meshBasicMaterial color="blue" />
                </mesh>
                <OrbitControls />
            </Canvas>
        </div>
    )
}