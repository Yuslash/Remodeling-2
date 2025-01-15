import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const EnvBlend = () => {
    
    const { scene, nodes } = useGLTF('/env.glb')

    console.log(nodes)

    return <primitive object={scene} />
}


export default function BlenderEnv() {
    
    return (
        <div className="w-full h-full bg-black">
            <Canvas
                flat
                orthographic
                camera={{zoom: 100}}
            >
                <ambientLight />
                <EnvBlend />
                <OrbitControls />
            </Canvas>
        </div>
    )
}