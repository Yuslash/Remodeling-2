import { Environment, OrbitControls, useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

const TestEnv = () => {

    const { scene, nodes } = useGLTF()

}

export default function EnvTesting() {

    return (
        <div className="w-full h-full ">
             <Canvas>

             <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[5, 5, 5]} />
                    <meshStandardMaterial 
                    color="orange" 
                    metalness={1}
                    roughness={0}
                    />
                </mesh>

                <Environment
                background={true} 
                preset="city" />

                <OrbitControls />

                </Canvas>   
        </div>
    )

}