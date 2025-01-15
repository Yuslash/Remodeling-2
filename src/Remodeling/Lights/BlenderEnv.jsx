import { OrbitControls, Sky, useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useControls } from "leva"

const EnvModel = () => {

    const { scene, nodes } = useGLTF('/env.glb')
    
    console.log(nodes)

    return (
        <primitive object={scene} />
    )
}

export default function BlenderEnv() {

    const { distance, xsunPosition, ysunPosition, zsunPosition, inclination, azimuth } = useControls({
        distance: {value: 450000, min: 0, max: 500000, step: 1},
        xsunPosition: {value: 100, min: 0, max: 100, step: 1},
        ysunPosition: {value: 20, min: 0, max: 100, step: 1},
        zsunPosition: {value: 100, min: 0, max: 100, step: 1},
        inclination: {value: 0, min: 0, max: 180, step: 1},
        azimuth: {value: 0.25, min: 0, max: 10, step: 1},
    })
    
    return (
        <div className="w-full h-full bg-black">
            <Canvas
                flat 
                orthographic
                camera={{zoom: 100}}
            >
                 <Sky
        distance={distance} // Camera distance
        sunPosition={[xsunPosition, ysunPosition, zsunPosition]} // Sun position [x, y, z]
        inclination={inclination} // Sun angle
        azimuth={azimuth} // Orientation
      />
                <ambientLight intensity={0.5} />
                <EnvModel />
                <OrbitControls />
            </Canvas>
        </div>
    )
}