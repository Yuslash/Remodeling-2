import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef } from "react";

const LightInBlender = () => {

    const { intensity, xPosition, yPosition, zPosition } = useControls({
        intensity: {value: 10, min: 0.1, max: 100, step: 0.01},
        xPosition: {value: -2, min: -5, max: 5, step: 0.001 },
        yPosition: {value: 1, min: -5, max: 5, step: 0.001 },
        zPosition: {value: 0, min: -5, max: 5, step: 0.001 }
    })

    const { scene, nodes } = useGLTF('/light1.glb')

    const spotlightRef = useRef(null)
    const suzanneRef = useRef(null)

    useEffect(() => {
        if (nodes.Spot && nodes.Suzanne) {
            spotlightRef.current = nodes.Spot
            suzanneRef.current = nodes.Suzanne
        
            spotlightRef.current.intensity = intensity

            suzanneRef.current.position.set(xPosition, yPosition, zPosition);


            spotlightRef.current.lookAt(suzanneRef.current.position)
        }
    },[intensity, nodes, xPosition, yPosition, zPosition, ])

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