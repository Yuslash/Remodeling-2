import { Environment, OrbitControls, Stats, useAnimations, useGLTF } from "@react-three/drei";
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
        castShadow
        >
            <circleGeometry args={[1.97, 64]} />
            <meshBasicMaterial color={new THREE.Color("#1f0834")} transparent={true} opacity={1} />
        </mesh>
    )

}


// hexagons 3d model
    function HexagonsModel() {
        
        const [hovered, setHovered] = useState(null) // State for the currently hovered object
        const originalMaterials = useRef({}) // Ref to store original materials of objects
        const ref = useRef()
        
        const { scene, nodes, animations } = useGLTF('/floor.glb') // Load the GLTF model
        const { actions } = useAnimations(animations, scene) // Handle animations

        // Play all animations from the GLTF file
        useEffect(() => {
            if (actions) {
                Object.values(actions).forEach(action => {
                    action.play()
                })
            }
        }, [actions])

        // Adjust the position and rotation of the loaded scene
        useEffect(() => {
            scene.rotation.y = Math.PI / 2
            scene.position.set(-10, -1.7, -2)
            scene.rotation.x = Math.PI / 2
        }, [scene])

        // Handle hover detection and material updates using raycaster
        useFrame(({ raycaster, mouse, camera }) => {
            if (!ref.current) return
        
            raycaster.setFromCamera(mouse, camera) // Update raycaster
            const intersects = raycaster.intersectObjects(scene.children, true) // Find intersections
        
            if (intersects.length > 0) {
                const intersectedObject = intersects[0].object
        
                // If the hovered object has changed
                if (hovered !== intersectedObject) {
                    // Restore the material of the previously hovered object
                    if (hovered) {
                        const originalMaterial = originalMaterials.current[hovered.uuid]
                        if (originalMaterial) {
                            hovered.material.dispose()
                            hovered.material = originalMaterial
                        }
                    }
        
                    // Save the original material of the new object
                    if (!originalMaterials.current[intersectedObject.uuid]) {
                        originalMaterials.current[intersectedObject.uuid] = intersectedObject.material
                    }
        
                    // Apply the new material
                    intersectedObject.material = new THREE.MeshStandardMaterial({
                        color: new THREE.Color('red'),
                        emissive: new THREE.Color('red'),
                        emissiveIntensity: 5,
                    })
        
                    setHovered(intersectedObject) // Update hovered state
                }
            } else if (hovered) {
                // Restore the material if no intersection
                const originalMaterial = originalMaterials.current[hovered.uuid]
                if (originalMaterial) {
                    hovered.material.dispose()
                    hovered.material = originalMaterial
                }
                setHovered(null) // Clear hovered state
            }
        })
        

        return (
            <group ref={ref}>
                <primitive object={scene} />
            </group>
        )
    }

    


function PlaneSurfaceFloor()  {
    return (
        <mesh rotation={[-Math.PI / 2,0,0]} position={[0,-2,0]} receiveShadow>
            <planeGeometry args={[30,10]} />
            <meshStandardMaterial color="black" metalness={1} roughness={0} />
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
                {/* <Environment background preset="night" blur={1} /> */}
                <Stats />
            </Canvas>
        </div>
      )
}