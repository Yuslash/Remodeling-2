import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { useControls } from "leva";
import { useEffect, useRef } from "react";

const EmissiveCube = ({bloomIn, luminanceThreshold, levels, cubeIn}) => {
    return (
    <>
         <EffectComposer disableNormalPass>
            <Bloom intensity={bloomIn} mipmapBlur luminanceThreshold={luminanceThreshold} levels={levels}/>
              <ToneMapping />
          </EffectComposer>
        <mesh position={[0,45,-50]}>
            <planeGeometry args={[100,100]} />
            <meshStandardMaterial emissive={0xff0000} emissiveIntensity={cubeIn} color="red" />
        </mesh>
        </>
    )
}

export default function ShadowLand() {

    const { metalness, roughness, cameraX, cameraY, cameraZ,directionLightIntensity, bloomIn, luminanceThreshold, levels, cubeIn } = useControls({
        metalness: {value: 0.75, min: 0, max: 1, step: 0.01},
        roughness: {value: 0.35, min: 0, max: 1, step: 0.01},
        cameraX: {value: 1, min: -10, max: 10, step: 0.000001},
        cameraY: {value: 2, min: -10, max: 10, step: 0.000001},
        cameraZ: {value: 3, min: -10, max: 10, step: 0.000001},
        directionLightIntensity: {value: 1, min: 0, max: 10, step: 0.01},
        bloomIn: {value: 2, min: 0, max: 10, step: 0.01},
        luminanceThreshold: {value: 1, min: 0, max: 10, step: 0.01},
        levels: {value: 8, min: 0, max: 10, step: 1},
        cubeIn: {value: 5, min: 0, max: 10, step: 0.01}
    })


    return (
        <div className="w-full h-full bg-black">
            <Canvas
            camera={{
                position: [cameraX, cameraY, cameraZ],
                fov: 75
                }}
            shadows>
                <CameraUpdater cameraX={cameraX} cameraY={cameraY} cameraZ={cameraZ} />
                <ambientLight intensity={0.2} />
                <directionalLight color={0x9500ff} castShadow position={[5, 5, 5]} intensity={directionLightIntensity} />

                <mesh receiveShadow position={[0,-1.5,0]} rotation={[- Math.PI /2 , 0,0]}>
                    <planeGeometry args={[100,100]} />
                    <meshStandardMaterial metalness={metalness} roughness={roughness} />
                </mesh>

                <mesh castShadow position={[0,-0.5,0]}>
                    <boxGeometry args={[1,1,1]} />
                    <meshStandardMaterial roughness={1} metalness={0} color="lime" />
                </mesh>
                <EmissiveCube bloomIn={bloomIn} luminanceThreshold={luminanceThreshold} levels={levels} cubeIn={cubeIn} />
                <Environment preset="night" background  backgroundBlurriness={0.5}/>
                <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
            </Canvas>
        </div>
    )

}

const CameraUpdater = ({cameraX, cameraY, cameraZ}) => {

    // useFrame(({camera}) => {
    //     camera.position.set(cameraX, cameraY, cameraZ)
    // })

    return null
}