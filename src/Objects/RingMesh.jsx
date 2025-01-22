import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function RingMesh() {

    return(
        <div className="w-full h-full ">
            <Canvas>
                <mesh>
                    <ringGeometry />
                    <meshStandardMaterial />
                </mesh>
                <OrbitControls />
            </Canvas>
        </div>
    )
}