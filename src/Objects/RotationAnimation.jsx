import { OrbitControls, Stats, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three'

function RotatingCircle() {

    const [thetaLength , setThetaLength] = useState(0)
    const [isDone, setIsDone] = useState(false)
    const [opacity, setOpacity] = useState(0)
    const [startAnimation, setStartAnimation] = useState(false)

    const meshRef = useRef()

    useEffect(() => {

        const timeout = setTimeout(() => {
            setStartAnimation(true)
        }, 2000)

        return () => clearTimeout(timeout)

    }, [])

    useFrame(() => {

        if (!startAnimation) {
            return 
        } else {
            setThetaLength(0.5)
        }
        
        if (meshRef.current && meshRef.current.rotation.z < 3) {
          meshRef.current.rotation.z += 0.03
        } else {
            setIsDone(true)
        }

        if(setIsDone && opacity< 1) {
            setOpacity((prevOpacity) => Math.min(prevOpacity + 0.005, 1))
        }
    
    })

    return (
      <>
        <mesh
            ref={meshRef}
            rotation={[-Math.PI / 2, 0, 0.5]}
            position={[0, -1.01, 0]}
            >
            <circleGeometry args={[2, 64, 4, thetaLength]} />
            <meshStandardMaterial color="red" emissive={new THREE.Color(0xff0000)} emissiveIntensity={10}/>
        </mesh>
        {isDone && (
        <mesh rotation={[-Math.PI / 2, 0, 0.5]} position={[0, -1.01, 0]}>
          <circleGeometry args={[2, 64, 4, 6.3]} />
          <meshStandardMaterial
            opacity={opacity}
            color="red"
            emissive={new THREE.Color(0xff0000)}
            emissiveIntensity={10}
            transparent={true} 
          />
        </mesh>
      )}
      </>
    )

}

function AntiRotatingCircle() {

    const [thetaLength , setThetaLength] = useState(0)
    const [startAnimation, setStartAnimation] = useState(false)

    const meshRef = useRef()

    useEffect(() =>{
        const timeout = setTimeout(() => {
            setStartAnimation(true)
        }, 2000)

        return () => clearTimeout(timeout)
    }, [])

    useFrame(() => {

        if (!startAnimation) {
            return 
        } else {
            setThetaLength(0.5)
        }

        if (meshRef.current && meshRef.current.rotation.z > -3) {
          meshRef.current.rotation.z -= 0.03
        }
    })

    return (
      <>
      <EffectComposer disableNormalPass>
                  <Bloom intensity={2} mipmapBlur luminanceThreshold={1} levels={8}/>
                    <ToneMapping />
                </EffectComposer>
        <mesh
            ref={meshRef}
            rotation={[-Math.PI / 2, 0, 0.5]}
            position={[0, -1.01, 0]}
            >
            <circleGeometry args={[2, 64, 4, thetaLength]} />
            <meshStandardMaterial color="red" emissive={new THREE.Color(0xff0000)} emissiveIntensity={10}/>
        </mesh>
      </>
    )

}


function OuterRadiusCircle() {

    return (
        <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1, 0]}
        >
            <circleGeometry args={[1.97, 64]} />
            <meshBasicMaterial color={new THREE.Color("#1f0834")} transparent={true} opacity={1} />
        </mesh>
    )

}


// hexagons 3d model
function HexagonsModel() {

    const {scene, nodes, animations} = useGLTF('/floor.glb')

    const {actions} = useAnimations(animations, scene)

    console.log(animations)

    useEffect(() => {
        if (actions) {
            Object.values(actions).forEach(action => {
                action.play()
            })
        }
    }, [actions])

    scene.rotation.y = Math.PI / 2 
    scene.position.x = -10
    scene.position.y = -1.7
    scene.rotation.x = Math.PI / 2
    scene.position.z = -2
    scene.receiveShadow = true

    return <primitive object={scene} />
}

function PlaneSurfaceFloor()  {
    return (
        <mesh rotation={[-Math.PI / 2,0,0]} position={[0,-2,0]}>
            <planeGeometry args={[30,10]} />
            <meshStandardMaterial color="black"  />
        </mesh>
    )
}

export default function RotationAnimation() {
    return (
        <div className="w-full h-full bg-black">
            <Canvas>
                <ambientLight color="purple" />
                <directionalLight castShadow color="purple" intensity={10} position={[0,3,3]} />
                <HexagonsModel />
                <RotatingCircle />
                <AntiRotatingCircle />
                <OuterRadiusCircle />
                <PlaneSurfaceFloor />
                <OrbitControls />
                <Stats />
            </Canvas>
        </div>
      )
}