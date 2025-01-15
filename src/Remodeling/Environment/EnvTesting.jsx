import { Environment, Html, OrbitControls, useGLTF, useProgress } from "@react-three/drei"
import { Canvas, useLoader } from "@react-three/fiber"
import { Suspense } from "react"
import { CubeTextureLoader } from "three"

function Loader() {
    
    const { progress } = useProgress()

    return (
        <Html center>
            <div className="w-full h-full" style={{color: "white"}}>{Math.floor(progress)}%</div>
        </Html>
    )
}

export default function EnvTesting() {

    const cubeTexture = useLoader(CubeTextureLoader, [
        'map/px.png',
        'map/nx.png',
        'map/py.png',
        'map/ny.png',
        'map/pz.png',
        'map/nz.png',
    ])


    return (
        <div className="w-full h-full bg-black">
             <Canvas>

             <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[2, 2, 2]} />
                    <meshStandardMaterial 
                    color="orange" 
                    metalness={1}
                    roughness={0}
                    />
                </mesh>

                <Suspense fallback={<Loader />}>
                <Environment
                background
                files={cubeTexture}
                 />
                </Suspense>

                <OrbitControls />

                </Canvas>   
        </div>
    )

}