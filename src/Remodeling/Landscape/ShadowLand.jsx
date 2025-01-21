import { ContactShadows, Environment, Lightformer, OrbitControls, Stats, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Bloom, DepthOfField, EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import * as THREE  from 'three'
import { Effects } from "../Effects";

const CertificateModel = () => {

    const { scene, nodes } = useGLTF('/certficitat.glb')

    scene.rotation.y = Math.PI / 2
    scene.scale.setScalar(2)

    return <primitive object={scene} /> 
    
} 

const EmissiveCube = ({bloomIn, luminanceThreshold, levels, cubeIn}) => {

    const config = useControls({
        autoRotate: !0,
        focusDistance: {
            value: 0.00,
            min: 0,
            max: 1,
            step: 0.0001
        },
        focalLength: {
            value: 0.06,
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

    return (
        <div className="w-full h-full bg-black">
            <Canvas gl={{ logarithmicDepthBuffer: true, antialias: false }} dpr={[1, 1.5]} camera={{ position: [0, 0, 15], fov: 25 }}>
            <color attach="background" args={['#15151a']} />
            <hemisphereLight intensity={0.5} />
            <ContactShadows resolution={1024} frames={1} position={[0, -1.16, 0]} scale={15} blur={0.5} opacity={1} far={20} />
                <ambientLight intensity={0.2} />
                <directionalLight color={0x9500ff} castShadow position={[5, 5, 5]} intensity={directionLightIntensity} />

               
                <CertificateModel />
                <EmissiveCube bloomIn={bloomIn} luminanceThreshold={luminanceThreshold} levels={levels} cubeIn={cubeIn} />
                <Environment resolution={512}>
                    {/* Ceiling */}
                    <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -9]} scale={[10, 1, 1]} />
                    <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -6]} scale={[10, 1, 1]} />
                    <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -3]} scale={[10, 1, 1]} />
                    <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[10, 1, 1]} />
                    <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 3]} scale={[10, 1, 1]} />
                    <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 6]} scale={[10, 1, 1]} />
                    <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 9]} scale={[10, 1, 1]} />
                    {/* Sides */}
                    <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-50, 2, 0]} scale={[100, 2, 1]} />
                    <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[50, 2, 0]} scale={[100, 2, 1]} />
                    {/* Key */}
                    <Lightformer form="ring" color="red" intensity={10} scale={2} position={[10, 5, 10]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
                </Environment>
                {/* <Effects /> */}
                <Stats />
                <OrbitControls autoRotate={true} />
                {/* <OrbitControls makeDefault minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} /> */}
            </Canvas>
        </div>
    )

}
