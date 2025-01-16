import { CameraShake, Hud, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three'

const Certificate = () => {
    
    const {scene, nodes} = useGLTF('/certficitat.glb')

    console.log(nodes);

    const planeGroup = nodes.Plane

    const [mesh1, mesh2] =  planeGroup.children

    const meshRef = useRef()

    useEffect(() => {
        if(meshRef.current) 
        {
            meshRef.current.rotation.y = - Math.PI / 2
        }
    }, [])


    return (
        <group ref={meshRef}>
            <mesh geometry={mesh1.geometry} >
                <meshStandardMaterial 
                {...mesh1.material}
                side={THREE.DoubleSide}
                />
            </mesh>
            <mesh geometry={mesh2.geometry} >
                <meshNormalMaterial 
                {...mesh2.material}
                side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    )
    

}

function Rig() {
    const [vec] = useState(() => new THREE.Vector3())
    const { camera, mouse } = useThree()
    useFrame(() => camera.position.lerp(vec.set(mouse.x * 2, 1, 60), 0.05))
    return <CameraShake maxYaw={0.01} maxPitch={0.01} maxRoll={0.01} yawFrequency={0.5} pitchFrequency={0.5} rollFrequency={0.4} />
  }
  

export default function CertificateModel() {

    return (
        <div className="w-full h-full bg-black">
            <Canvas
            shadows dpr={[1, 2]}
            camera={{zoom: 10}}
            >
                
                <ambientLight intensity={0.5} />
                <directionalLight color="white" intensity={10} position={[0,3,2]} />
                {/* <Hud> */}
                <Certificate />
                {/* </Hud> */}
                <Rig />
                <OrbitControls makeDefault />
            </Canvas>
        </div>
    )
}