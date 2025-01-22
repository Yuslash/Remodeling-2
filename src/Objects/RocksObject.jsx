import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function RocksObject() {
    return (
        <div className="w-full h-full bg-green-500">
            <Canvas gl={{ logarithmicDepthBuffer: true, antialias: false }} dpr={[1, 1.5]} camera={{ position: [0, 10, 25], fov: 25 }}>
                <ambientLight intensity={0.5} />
                <directionalLight color={0x5100ff} position={[5, 5, 5]} intensity={1} />
            <color attach="background" args={['#15151a']} />
                <mesh>
                    <boxGeometry args={[1,1,1]} />
                    <meshStandardMaterial />
                </mesh>
                <OrbitControls />
            </Canvas>
        </div>
    )
}