import { OrbitControls, useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Bloom, EffectComposer } from "@react-three/postprocessing"
import { useEffect } from "react"

function Model() {
  const {scene} = useGLTF("/bloom.glb")

  const mesh = scene.children[0]
  const geometry = mesh.geometry
  const material = mesh.material

  useEffect(() => {
    console.log("emassive color", material.emissive);
    console.log("emissive intensity", material.emissiveIntensity);
  })
  

  return (
    <mesh geometry={geometry} material={material} />
  )
}

export default function Experience() {
  return (
   <div className="absoulte top-0 left-0 flex w-full h-full bg-black">
       <Canvas>
      <ambientLight intensity={1} />
      <Model />
      <OrbitControls />
      <EffectComposer>
          <Bloom 
          intensity={1}          // Controls glow intensity
          luminanceThreshold={0.1} // Lower this value to target brighter areas
          luminanceSmoothing={0.1} // Lower this value for less blur
          radius={0}   
           />
        </EffectComposer>
    </Canvas>
   </div>
  )
}