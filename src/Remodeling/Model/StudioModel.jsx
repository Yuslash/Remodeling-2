import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const Model = () => {

    const { scene, nodes } = useGLTF('/studio.glb')

    console.log(nodes)

    return <primitive object={scene} />

}

export default function StudioModel() {
    return (
        <div className="w-full h-full bg-black">
            <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight  /> 
                <Model />
                <OrbitControls />
            </Canvas>
        </div>
    )
}