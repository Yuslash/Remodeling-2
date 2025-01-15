import { OrbitControls, useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

const ModelBending = () => {
    
    const { scene, nodes, animations } = useGLTF('/bend.glb')

    console.log(scene)

    return <primitive object={scene} />
}

export default function Bending() {

    return (
        <div className="w-full h-full bg-black">
            <Canvas>
                <ambientLight intensity={1} />
            <ModelBending />
            <OrbitControls />
            </Canvas>
        </div>
    )
}