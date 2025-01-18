import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Effects } from "../Effects";


function Rig() {
  useFrame((state) => {
    state.camera.position.lerp({ x: 0, y: -state.pointer.y / 4, z: state.pointer.x / 2 }, 0.1)
    state.camera.lookAt(-1, 0, 0)
  })
}

const CertificateModel = () => {
  
  const { scene } = useGLTF('/certficitat.glb')

  const modelRef = useRef()

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.position.set(-5, -1, 0); // Set x, y, z coordinates
      modelRef.current.rotation.y = -Math.PI / 2
    }
  }, [])

  return <primitive ref={modelRef}  object={scene} />
}

const Model = ({...props}) => {

  const { scene, nodes } = useGLTF('/hall-transformed.glb')

  console.log(nodes)

  return <primitive object={scene}  {...props}/>
}

export default function HallModel() {
  return (
    <div className="w-full h-full bg-orange-500">
      <Canvas>
        <Model />
        <CertificateModel />
        <ambientLight />
        <OrbitControls />
        <Effects />
      </Canvas>
    </div>
  )
}
