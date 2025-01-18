import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const NoiseTextureModel = () => {
    const { scene, nodes } = useGLTF('/noise.glb')

    console.log(nodes)

    return <primitive object={scene} />
}

export default function NoiseTexture() {
    return (
        <div className="w-full h-full bg-black">
            <Canvas>
                <ambientLight />
                <NoiseTextureModel />
                <OrbitControls />
            </Canvas>
        </div>
    )
}