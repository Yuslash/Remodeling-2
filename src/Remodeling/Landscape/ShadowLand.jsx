import { Environment, OrbitControls, Stats, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Bloom, DepthOfField, EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import * as THREE  from 'three'

const CertificateModel = () => {

    const { scene, nodes } = useGLTF('/robo.glb')

    scene.rotation.y = Math.PI / 2
    scene.scale.setScalar(1)
    scene.position.y = -1.7

    return <primitive object={scene} /> 
    
} 

const EmissiveCube = ({bloomIn, luminanceThreshold, levels, cubeIn}) => {

    const config = useControls({
        autoRotate: !0,
        focusDistance: {
            value: 0.1,
            min: 0,
            max: 0.05,
            step: 0.0001
        },
        focalLength: {
            value: 0.01,
            min: 0,
            max: 0.1,
            step: 0.01
        },
        bokehScale: {
            value: 10,
            min: 0,
            max: 10,
            step: 0.1
        }
    })

    return (
    <>
         <EffectComposer disableNormalPass>
            <DepthOfField focusDistance={config.focusDistance} focalLength={config.focalLength} bokehScale={config.bokehScale} />
            <Bloom intensity={bloomIn} mipmapBlur luminanceThreshold={luminanceThreshold} levels={levels}/>
              <ToneMapping />
          </EffectComposer>
        <mesh position={[0,45,-50]}>
            <sphereGeometry args={[15,32,16]} />
            <meshStandardMaterial emissive={0xff0000} emissiveIntensity={cubeIn} color="red" />
        </mesh>
        </>
    )
}

export default function ShadowLand() {

    const { metalness, roughness,directionLightIntensity, bloomIn, luminanceThreshold, levels, cubeIn } = useControls({
        metalness: {value: 0.75, min: 0, max: 1, step: 0.01},
        roughness: {value: 0.35, min: 0, max: 1, step: 0.01},
        directionLightIntensity: {value: 1, min: 0, max: 10, step: 0.01},
        bloomIn: {value: 2, min: 0, max: 10, step: 0.01},
        luminanceThreshold: {value: 1, min: 0, max: 10, step: 0.01},
        levels: {value: 8, min: 0, max: 10, step: 1},
        cubeIn: {value: 5, min: 0, max: 10, step: 0.01}
    })

    const objectRef = useRef()

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
    
                // '/textures/rocky_terrain_diff_2k.jpg',
                // '/textures/rocky_terrain_nor_gl_2k.jpg',
                // '/textures/rocky_terrain_disp_2k.jpg',
                // '/textures/rocky_terrain_arm_2k.jpg',
            ]
        )

            const numTilesX = 4
            const numTilesY = 4

            colorMap.repeat.set(3, 3)
            normalMap.repeat.set(3, 3)
            displacementMap.repeat.set(3, 3)
            aoMap.repeat.set(3, 3)
        
            colorMap.offset.set(1 / numTilesX, 1 / numTilesY)
        
            colorMap.wrapS = THREE.RepeatWrapping
            normalMap.wrapS = THREE.RepeatWrapping
            displacementMap.wrapS = THREE.RepeatWrapping
            aoMap.wrapS = THREE.RepeatWrapping
        
            colorMap.wrapT = THREE.RepeatWrapping
            normalMap.wrapT = THREE.RepeatWrapping
            displacementMap.wrapT = THREE.RepeatWrapping
            aoMap.wrapT = THREE.RepeatWrapping;

    return (
        <div className="w-full h-full bg-black">
            <Canvas
            camera={{
                position: [0, 0.5, 2],
                fov: 75
                }}
            shadows>
                <ambientLight intensity={0.2} />
                <directionalLight color={0x9500ff} castShadow position={[5, 5, 5]} intensity={directionLightIntensity} />

                <mesh receiveShadow position={[0,-2.5,0]} rotation={[- Math.PI /2 , 0,0]}>
                    <planeGeometry args={[100,100]} />
                    <meshStandardMaterial 
                    map={colorMap}
                    normalMap={normalMap}
                    displacementMap={displacementMap}
                    displacementScale={3}
                    roughnessMap={aoMap}
                    metalnessMap={aoMap}
                    />
                </mesh>

                <mesh castShadow position={[0,-0.5,-5]}>
                    <boxGeometry args={[1,1,1]} />
                    <meshStandardMaterial roughness={1} metalness={0} color="lime" />
                </mesh>
                <CertificateModel />
                <EmissiveCube bloomIn={bloomIn} luminanceThreshold={luminanceThreshold} levels={levels} cubeIn={cubeIn} />
                <Environment files="/clearrnight.hdr" background />
                <Stats />
                <OrbitControls />
                {/* <OrbitControls makeDefault minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} /> */}
            </Canvas>
        </div>
    )

}