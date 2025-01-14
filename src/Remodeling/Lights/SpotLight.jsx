import { OrbitControls, useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

const LightModel = () => {

    const { scene, nodes } = useGLTF("/light1.glb")

    console.log(nodes)

    return (
        <primitive object={scene} />
    )
}

export default function SpotLight() {
    return (
        <div className="w-full h-full bg-black">
            <Canvas
                flat
                orthographic
                camera={{zoom: 100}}
            >
                <ambientLight intensity={0.5} />
                <LightModel />
                <OrbitControls />

            </Canvas>
        </div>
    )
}