import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { useRef } from "react";
import * as THREE from 'three'

function RotatingCircle() {

    const meshRef = useRef()

    useFrame(() => {
        if (meshRef.current) {
          meshRef.current.rotation.z += 0.03
        }
    })

    return (
      <>
      <EffectComposer disableNormalPass>
                  <Bloom intensity={2} mipmapBlur luminanceThreshold={1} levels={8}/>
                    <ToneMapping />
                </EffectComposer>
        <mesh
            ref={meshRef}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -1.01, 0]}
            >
            <circleGeometry args={[2, 64, 5, 0.5]} />
            <meshStandardMaterial color="red" emissive={new THREE.Color(0xff0000)} emissiveIntensity={10}/>
        </mesh>
      </>
    )

}

function AntiRotatingCircle() {

    const meshRef = useRef()

    useFrame(() => {
        if (meshRef.current) {
          meshRef.current.rotation.z -= 0.03
        }
    })

    return (
      <>
      <EffectComposer disableNormalPass>
                  <Bloom intensity={2} mipmapBlur luminanceThreshold={1} levels={8}/>
                    <ToneMapping />
                </EffectComposer>
        <mesh
            ref={meshRef}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -1.01, 0]}
            >
            <circleGeometry args={[2, 64, 5, 0.5]} />
            <meshStandardMaterial color="red" emissive={new THREE.Color(0xff0000)} emissiveIntensity={10}/>
        </mesh>
      </>
    )

}


function OuterRadiusCircle() {

    return (
        <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1, 0]}
        >
            <circleGeometry args={[1.97, 64]} />
            <meshBasicMaterial color="blue" />
        </mesh>
    )

}


export default function RotationAnimation() {
    return (
        <div className="w-full h-full bg-black">
            <Canvas>
                <ambientLight />
                <RotatingCircle />
                <AntiRotatingCircle />
                <OuterRadiusCircle />
                <OrbitControls />
            </Canvas>
        </div>
      )
}