import { Environment, OrbitControls, Sky, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const LowModel = () => {

    const { scene, nodes } = useGLTF('/lowpoly.glb')

    console.log(nodes)

    //to use the mesh we need the geometry, position , material, rotation and scale

    return (
        <group>
            <mesh geometry={nodes.Cube.geometry}  position={nodes.Cube.position} rotation={nodes.Cube.rotation} scale={nodes.Cube.scale} >
                <meshStandardMaterial color="white"  metalness={1} roughness={0} />
            </mesh>
            <mesh geometry={nodes.Cube001.geometry} position={nodes.Cube001.position} rotation={nodes.Cube001.rotation} scale={nodes.Cube001.scale}>
                <meshStandardMaterial />
            </mesh>
        </group>
    )
}

export default function LowPoly() {
    return (
        <div className="w-full h-full">
            <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight color="white" position={[0, 10, 2]} intensity={10}  />
                <Environment preset="city" background />
                <Sky
                     distance={450000} 
                     sunPosition={[10, 1, 1]} // Sun is low in the sky for a night look
                     inclination={0} // Low sun position for a night-like scene
                     azimuth={0.5}  // Adjust to move the sun
                     turbidity={10} // Lower turbidity for clear skies
                     rayleigh={0.1} // Reduce the scattering for darker skies
                     mieCoefficient={0.01} // Lower this for clearer skies
                     mieDirectionalG={0.85} // Tweaks the scattering
                />
                <LowModel />
                <OrbitControls />
            </Canvas>
        </div>
    )
}