import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { useControls } from "leva";
import { PlaneGeometry } from "three";

export default function Experience() {

  const { levels, intensity } = useControls({
    intensity: { value: 0.4, min: 0, max: 1.5, step: 0.01 },
    levels: { value: 8, min: 1, max: 9, step: 1 }
  })

  return <>
    <div className="w-full h-full">
        <Canvas flat orthographic camera={{zoom: 100}}>
          <ambientLight intensity={0.5} />
          <EffectComposer disableNormalPass>
            <Bloom intensity={3} mipmapBlur luminanceThreshold={1} levels={10}/>
              <ToneMapping />
          </EffectComposer>
          <mesh>
            <planeGeometry args={[2,2]}/>
            <meshStandardMaterial color='yellow' emissive="yellow" emissiveIntensity={2} />
          </mesh>
          <OrbitControls />
        </Canvas>
    </div>
  </>
}

// got good animatino idea that try to rotate this plane in orbit controls it gives door openning animatio