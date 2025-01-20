import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from 'three'

export default function Texture() {

    const [
        colorMap, 
        normalMap,
        displacementMap,
        aoMap,
    ] = useLoader(
        THREE.TextureLoader, [
            '/sandTexture/coast_sand_05_2k/coast_sand_05_diff_2k.jpg',
            '/sandTexture/coast_sand_05_2k/coast_sand_05_nor_gl_2k.jpg',
            '/sandTexture/coast_sand_05_2k/coast_sand_05_disp_2k.jpg',
            '/sandTexture/coast_sand_05_2k/coast_sand_05_arm_2k.jpg',
        ]
    )


    return (
        <div className="w-full h-full bg-black">
            <Canvas camera={{position: [0,1,1]}}>
                <ambientLight intensity={0.5} />
                <directionalLight intensity={1} position={[1,1,4]} />
                <Environment preset="city" background backgroundBlurriness={0.5}  />
                <mesh rotation={[- Math.PI / 2,0,0]}>
                    <planeGeometry args={[30,30,100, 100]} />
                    <meshStandardMaterial 
                    color={ new THREE.Color(0x6c3bff)}
                    side={THREE.DoubleSide}
                        map={colorMap}
                        normalMap={normalMap}
                        displacementMap={displacementMap}
                        displacementScale={0.3}
                        roughnessMap={aoMap}
                        metalnessMap={aoMap}
                    >
                    </meshStandardMaterial>
                </mesh>
                <OrbitControls />
            </Canvas>
        </div>
    )
}