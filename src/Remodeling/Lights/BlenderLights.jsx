import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect } from "react";

const LightInBlender = () => {

    const { intensity } = useControls({
        intensity: {value: 10, min: 0.1, max: 100, step: 0.01}
    })

    const { scene, nodes } = useGLTF('/light1.glb')

    useEffect(() => {
        if(nodes.Spot) {
            nodes.Spot.intensity = intensity
            nodes.Spot.lookAt(nodes.Suzanne.position)
        }

        if (nodes.Suzanne) {
            nodes.Suzanne.position.set(-2,1,0)
        }
    },[intensity, nodes])


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