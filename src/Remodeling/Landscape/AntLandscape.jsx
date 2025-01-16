import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const LandModel = () => {

    const { scene, nodes } = useGLTF('/landscape.glb')

    console.log(nodes)

    return (
        <group>
            <mesh geometry={nodes.Landscape001.geometry} rotation={nodes.Landscape001.rotation} position={nodes.Landscape001.position}>
                <meshStandardMaterial />
            </mesh>
            <mesh geometry={nodes.Landscape_plane.geometry} rotation={nodes.Landscape_plane.rotation} position={nodes.Landscape_plane.position}>
                <meshStandardMaterial metalness={0.8} roughness={0.2} />
            </mesh>
        </group>
    )

}

export default function AntLandscape() {
    return (
        <div className="w-full h-full bg-black">
            <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight position={[0, 5,2]} color={0xff2101} intensity={4} />
                <Environment preset="night" />
                <LandModel />
                <OrbitControls />
            </Canvas>
        </div>
    )
}