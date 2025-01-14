import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { EffectComposer, Bloom, ToneMapping } from "@react-three/postprocessing"
import { useEffect, useRef } from "react"
import * as THREE from 'three'

const Animations = () => {

  const { scene, animations, nodes } = useGLTF('/different.glb')
  const { actions } = useAnimations(animations, scene)

  const modelRef = useRef()

  console.log(scene)

  useEffect(() => {
    if (modelRef.current) { 
      modelRef.current.rotation.y = Math.PI / 2
      
      modelRef.current.children.forEach((child, index) => {
        if(index === 0) {
          child.material.color = new THREE.Color(0xff0000)
          child.material.emissive = new THREE.Color(0xff0000)
          child.material.emissiveIntensity = 10
        }
      })

    }
    if (actions && Object.keys(actions).length > 0) {
      actions[Object.keys(actions)[0]].play()
    }

  }, [actions])

  return (
    <primitive ref={modelRef} object={scene} />
  )
}

export default function PartTwoBlenderAnimations() {

  return (
    <div className="w-full h-full bg-black">
      <Canvas
        flat
        orthographic
        camera={{ zoom: 100 }}
      >
        <EffectComposer disbaleNormalPass>
          <Bloom
            intensity={0.4 * 4}
            mipmapBlur
            luminanceThreshold={0.5}
            levels={9}
          />
          <ToneMapping /> 
        </EffectComposer>
        <ambientLight intensity={0.5} />
        <Animations />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

