import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const LowModel = () => {

    const { scene, nodes } = useGLTF('/lowpoly.glb')

    console.log(nodes)

    //to use the mesh we need the geometry, position , material, rotation and scale

    return (
        <group>
            <mesh geometry={nodes.Cube.geometry}  position={nodes.Cube.position} rotation={nodes.Cube.rotation} scale={nodes.Cube.scale} >
                <meshStandardMaterial  />
            </mesh>
        </group>
    )
}

export default function LowPoly() {
    return (
        <div className="w-full h-full bg-black">
            <Canvas>
                <ambientLight />
                <directionalLight color="red" position={[0, 10, 2]} intensity={10} />
                <LowModel />
                <OrbitControls />
            </Canvas>
        </div>
    )
}