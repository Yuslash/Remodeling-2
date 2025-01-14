import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import * as THREE from 'three'

const LightInBlender = () => {

    const { intensity, xPosition, yPosition, zPosition, lightColor } = useControls({
        intensity: {value: 10, min: 0.1, max: 1000, step: 0.01},
        xPosition: {value: -2, min: -5, max: 5, step: 0.001 },
        yPosition: {value: 1, min: -5, max: 5, step: 0.001 },
        zPosition: {value: 0, min: -5, max: 5, step: 0.001 },
        lightColor: {value: "#ff0000"}
    })

    const { scene, nodes } = useGLTF('/light1.glb')

    const spotlightRef = useRef(null)
    const suzanneRef = useRef(null)

    useEffect(() => {
        if (nodes.Spot && nodes.Suzanne) {
            spotlightRef.current = nodes.Spot
            suzanneRef.current = nodes.Suzanne
        
            spotlightRef.current.intensity = intensity
            spotlightRef.current.color = new THREE.Color(parseInt(lightColor.replace('#', '0x'))); // Convert to 0x format


            suzanneRef.current.position.set(xPosition, yPosition, zPosition);


            spotlightRef.current.lookAt(suzanneRef.current.position)
        }
    },[intensity, nodes, xPosition, yPosition, zPosition, lightColor ])

    if (!nodes.Spot || !nodes.Suzanne) {
        return null; // Wait until the necessary nodes are available
    }

    return <primitive object={scene}  />
}


export default function BlenderLights() {
    return (
        <div className="w-full h-full bg-black">
            <Canvas
                flat
                orthographic
                camera={{zoom: 100}}
            >
                <ambientLight intensity={0.2} />
            <LightInBlender />
            <OrbitControls />
            </Canvas>
        </div>
    )
}