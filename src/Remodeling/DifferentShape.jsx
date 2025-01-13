import { OrbitControls, useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from 'three'

export default function DifferentShape() {

    const { scene, nodes } = useGLTF("/different.glb")

    const meshs = []
    const meshRef = useRef()

    for (let i = 0; i < scene.children.length; i++) {
        const child = scene.children[i]
        if(child.isMesh) {
            child.rotation.y = Math.PI / 2
            //change the gloom mesh color 
            if(i === 1) {
                child.material.color = new THREE.Color(0xff0000)
            }
            meshs.push(child)
        }
    }

    console.log(meshs)

    return (
        <div className="w-full h-full bg-black">
            <Canvas flat orthographic camera={{zoom: 100}}>
                <ambientLight intensity={1} />
                <directionalLight intensity={2} position={[2,2,2]} />
                    {meshs.map((mesh, index) => (
                        <primitive 
                        key={mesh.uuid} 
                        object={mesh}
                        
                           />
                    ))}
                <OrbitControls />
            </Canvas>
        </div>
    )
}