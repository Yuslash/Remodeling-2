import { OrbitControls, useGLTF } from "@react-three/drei"
import { Canvas, useThree } from "@react-three/fiber"
import { useEffect } from "react"
import * as THREE from 'three'

const LightModel = () => {

    const {  nodes } = useGLTF("/light1.glb")

    const monkey = nodes.Suzanne
    const plane = nodes.Plane

      return (
        <>
        <primitive object={monkey} />
        <primitive object={plane} />
        </>
      )
}

const RectangleAreaLight = () => {
    const {scene} = useThree()
    
    useEffect(() => {
        const rectLight = new THREE.RectAreaLight(0x03fca9, 5, 10, 1)  // (color, intensity, width, height)
        rectLight.position.set(0,3,3)
        rectLight.lookAt(0,0,0)

        scene.add(rectLight)

        return () => {
            scene.remove(rectLight)
        }
    },[scene])

    return null
}

export default function SpotLight() {
    return (
        <div className="w-full h-full bg-black">
            <Canvas
                flat
                orthographic
                camera={{zoom: 100}}
            >
                <ambientLight intensity={0.5} />
                <LightModel />
                <RectangleAreaLight />
                <OrbitControls />

            </Canvas>
        </div>
    )
}