import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function ShadowLand() {

    return (
        <div className="w-full h-full bg-black">
            <Canvas
            camera={{position: [1,2,3], fov: 75}}
            shadows>
                <ambientLight intensity={0.5} />
                <directionalLight castShadow position={[5, 5, 5]} intensity={1} />

                <mesh receiveShadow rotation={[- Math.PI /2 , 0,0]}>
                    <planeGeometry args={[5,5]} />
                    <meshStandardMaterial metalness={1} roughness={0} />
                </mesh>

                <mesh castShadow position={[0,0.5,0]}>
                    <boxGeometry args={[1,1,1]} />
                    <meshStandardMaterial color="lime" />
                </mesh>
                <OrbitControls />
            </Canvas>
        </div>
    )

}