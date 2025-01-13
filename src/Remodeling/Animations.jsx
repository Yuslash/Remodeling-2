import React from 'react';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from 'three'
import { Bloom, EffectComposer, ToneMapping } from '@react-three/postprocessing';

function RotatingModel() {
    //user controler
    const { speed, eIntent } = useControls({
        speed: {value: 0.01, min: 0.001, max: 1, step: 0.001},
        eIntent: {value: 1, min: 0.001, max: 10, step: 0.001}
    })

    const { scene } = useGLTF('/different.glb'); // Ensure this path is correct
    const modelRef = React.useRef();

    React.useEffect(() => {

        const meshes = scene.children.filter(child => child.isMesh)

        if(meshes.length > 0) {
            meshes.forEach(mesh => {
                mesh.material.color = new THREE.Color(0xff000)
                mesh.material.emissive = new THREE.Color(0xff000)
                mesh.material.emissiveIntensity = eIntent
            })
        }

    }, [])

    useFrame(() => {
        // if (modelRef.current) {
            modelRef.current.rotation.y += speed; // Adjust rotation speed as needed
        // }
    });

    return <primitive ref={modelRef} object={scene} />;
}

export default function Animations() {

    const { intensity, levels} = useControls({
        intensity: {value: 0.4, min: 0.01, max: 10, step: 0.01},
        levels: {value: 8, min: 1, max: 9, step: 1},
    })

    return (
        <div className="w-full h-full bg-black">
            <Canvas
                flat
                orthographic
                camera={{zoom: 100}}
            >
                <ambientLight intensity={0.5} />
                <EffectComposer disbaleNormalPass>
                    <Bloom
                    intensity={intensity * 4}
                        mipmapBlur 
                        luminanceThreshold={0.5}
                        levels={levels}
                    />
                    <ToneMapping /> 
                </EffectComposer>
                <RotatingModel />
                <OrbitControls />
            </Canvas>
        </div>
    );
}
