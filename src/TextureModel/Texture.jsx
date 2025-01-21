import { Environment, OrbitControls, PointerLockControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing";
import * as THREE from 'three'

const EmissiveCube = () => {
    return (
        <mesh position={[0,20,-50]}>
                    <planeGeometry 
                    args={[10,10]}
                    />
                    <meshStandardMaterial 
                    emissive={new THREE.Color(0x00ff00)}
                    emissiveIntensity={20}
                    fog={false}

                    color="purple" />
                </mesh>
    )
}

export default function Texture() {

    const [
        colorMap, 
        normalMap,
        displacementMap,
        aoMap,
    ] = useLoader(
        THREE.TextureLoader, [
            // '/sandTexture/coast_sand_05_2k/coast_sand_05_diff_2k.jpg',
            // '/sandTexture/coast_sand_05_2k/coast_sand_05_nor_gl_2k.jpg',
            // '/sandTexture/coast_sand_05_2k/coast_sand_05_disp_2k.jpg',
            // '/sandTexture/coast_sand_05_2k/coast_sand_05_arm_2k.jpg',

            '/textures/rocky_terrain_diff_2k.jpg',
            '/textures/rocky_terrain_nor_gl_2k.jpg',
            '/textures/rocky_terrain_disp_2k.jpg',
            '/textures/rocky_terrain_arm_2k.jpg',
        ]
    )

    const numTilesX = 4; // Number of tiles in the texture atlas horizontally
    const numTilesY = 4; // Number of tiles in the texture atlas vertically

    colorMap.repeat.set(3, 3);
    normalMap.repeat.set(3, 3);
    displacementMap.repeat.set(3, 3);
    aoMap.repeat.set(3, 3);

    colorMap.offset.set(1 / numTilesX, 1 / numTilesY);

    colorMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapS = THREE.RepeatWrapping;
    displacementMap.wrapS = THREE.RepeatWrapping;
    aoMap.wrapS = THREE.RepeatWrapping;

    colorMap.wrapT = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;
    displacementMap.wrapT = THREE.RepeatWrapping;
    aoMap.wrapT = THREE.RepeatWrapping;


    return (
        <div className="w-full h-full bg-black">
            <Canvas shadows
            camera={{position: [0,3,1]}}>
                  <EffectComposer disableNormalPass>
                            <Bloom intensity={2} mipmapBlur luminanceThreshold={1} levels={8}/>
                              <ToneMapping />
                          </EffectComposer>
                <fog attach="fog" args={['gray', 5, 30]} />
                {/* <ambientLight intensity={0.2} /> */}
                <Environment preset="night" background backgroundBlurriness={0.8}  />
                <mesh rotation={[- Math.PI / 2,0,0]} castShadow receiveShadow>
                    <planeGeometry args={[100,100,100, 100]} />
                    <meshStandardMaterial 
                    // color={ new THREE.Color(0x1e1e1f)}
                    // side={THREE.DoubleSide}
                        map={colorMap}
                        normalMap={normalMap}
                        displacementMap={displacementMap}
                        displacementScale={3}
                        roughnessMap={aoMap}
                        metalnessMap={aoMap}
                    />
                </mesh>
                <mesh castShadow>
                    <boxGeometry args={[2,4,2]} />
                    <meshBasicMaterial color="blue" />
                </mesh>

                <EmissiveCube />                
                
                <OrbitControls
                />
            </Canvas>
        </div>
    )
}