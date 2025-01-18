import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";


const FollowModel = () => {
    
    const { scene, animations } = useGLTF('/pathanimation.glb')
    
    const {actions} = useAnimations(animations, scene)

    console.log(animations);

    React.useEffect(() => {
        actions['Action'].play()
    }, [actions])
    

    return <primitive object={scene} />

}

export default function FollowPath() {
    return (
        <div className="w-full h-full bg-orange-500">
            <Canvas>
                <ambientLight />
                <FollowModel />
                <OrbitControls />
            </Canvas>
        </div>
    )
}