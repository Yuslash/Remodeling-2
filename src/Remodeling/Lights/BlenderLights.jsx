import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three'

const LightInBlender = () => {

    const { intensity, lightColor } = useControls({ // here the position will come xPosition, yPosition, zPosition
        intensity: {value: 100, min: 0.1, max: 1000, step: 0.01},
        // xPosition: {value: -2, min: -5, max: 5, step: 0.001 },
        // yPosition: {value: 1, min: -5, max: 5, step: 0.001 },
        // zPosition: {value: 0, min: -5, max: 5, step: 0.001 },
        lightColor: {value: "#ff0000"}
    })

    const [zPosition, setZPosition] = useState(0);
    const [xPosition, setxPosition] = useState(0);
    const [yPosition, setyPosition] = useState(0);


    const { scene, nodes } = useGLTF('/light1.glb')

    const spotlightRef = useRef(null)
    const suzanneRef = useRef(null)

    useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.key.toLowerCase() === 'w') {
            setZPosition((prevZPosition) => prevZPosition + 0.5); // Increase zPosition by 1
          }
          if (event.key.toLowerCase() === 'a') {
            setxPosition((prevZPosition) => prevZPosition - 0.5); // Increase zPosition by 1
          }
          if (event.key.toLowerCase() === 'd') {
            setxPosition((prevZPosition) => prevZPosition + 0.5); // Increase zPosition by 1
          }
          if (event.key.toLowerCase() === 's') {
            setZPosition((prevZPosition) => prevZPosition - 0.5); // Increase zPosition by 1
          }
        };
    
        document.addEventListener('keydown', handleKeyDown);
    
        // Cleanup the event listener when the component unmounts
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, []);


    //   important code to look down

    useEffect(() => {


        if (nodes.Spot && nodes.Suzanne) {
            spotlightRef.current = nodes.Spot
            suzanneRef.current = nodes.Suzanne
        
            spotlightRef.current.intensity = intensity
            spotlightRef.current.color = new THREE.Color(parseInt(lightColor.replace('#', '0x'))); // Convert to 0x format


            suzanneRef.current.position.set(xPosition, yPosition + 1, zPosition);


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