import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useEffect } from "react"

function NewSurfaceModel() {

    const { scene, nodes, animations } = useGLTF('/surface.glb')

    const { actions } = useAnimations(animations, scene)

    useEffect(() => {
        if (actions) {
            Object.values(actions).forEach(action => {
                action.play()
            })
        }
    }, [actions])

    console.log(nodes)



    return <primitive object={scene} />
}

export default function NewSurface() {

    return (
        <div className="w-full h-full bg-black">
            <Canvas camera={{position: [0,5,30]}}>
                <ambientLight />
                <directionalLight />
                <NewSurfaceModel />
                <OrbitControls />
            </Canvas>
        </div>
    )
}