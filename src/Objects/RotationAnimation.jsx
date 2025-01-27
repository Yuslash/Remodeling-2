import { Environment, OrbitControls, Stats, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from 'three'
import NewSurface from "../Animation/NewSurface";
import { useSpring, animated } from "@react-spring/three";
import { useControls } from "leva";

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

    const rotationSpeed = 3; // radians per second (0.03 * 60 FPS)
    const opacitySpeed = 3; // opacity units per second (0.005 * 60 FPS)

    // Move thetaLength update to useEffect
    useEffect(() => {
    if (startAnimation) {
        setThetaLength(0.5);
    }
    }, [startAnimation]);

    useFrame((state, delta) => {
    if (!startAnimation || !meshRef.current) return;

    // Handle rotation
    if (meshRef.current.rotation.z < 3) {
        meshRef.current.rotation.z += rotationSpeed * delta;
    } else if (!isDone) {
        setIsDone(true);
    }

    // Handle opacity fade-in
    if (isDone && opacity < 1) {
        setOpacity(prev => Math.min(prev + opacitySpeed * delta, 1));
    }
    });

    return (
      <>
        <mesh
            ref={meshRef}
            rotation={[-Math.PI / 2, 0, 0.5]}
            position={[3, -1.01, 0]}
            >
            <circleGeometry args={[2, 64, 4, thetaLength]} />
            <meshStandardMaterial color="red" emissive={new THREE.Color(0xff0000)} emissiveIntensity={10}/>
        </mesh>
        {isDone && (
        <mesh rotation={[-Math.PI / 2, 0, 0.5]} position={[3, -1.01, 0]}>
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

    useFrame((state, delta) => {
        if (!startAnimation) return;
        
        // Set thetaLength once (move this to useEffect if only needed once)
        setThetaLength(0.5);
      
        if (meshRef.current) {
          // Calculate rotation based on time rather than fixed value
          const rotationSpeed = 3; // radians per second
          meshRef.current.rotation.z -= rotationSpeed * delta;
      
          // Clamp rotation between -3 and initial value
          meshRef.current.rotation.z = Math.max(
            meshRef.current.rotation.z,
            -3
          );
        }
      });

    return (
      <>
      <EffectComposer disableNormalPass>
                  <Bloom intensity={1} mipmapBlur luminanceThreshold={0.8} levels={8}/>
                    <ToneMapping />
                </EffectComposer>
        <mesh
            ref={meshRef}
            rotation={[-Math.PI / 2, 0, 0.5]}
            position={[3, -1.01, 0]}
            >
            <circleGeometry args={[2, 64, 4, thetaLength]} />
            <meshStandardMaterial color="red" emissive={new THREE.Color(0xff0000)} emissiveIntensity={10}/>
        </mesh>
      </>
    )

}


function OuterRadiusCircle() {
  // Destructure BOTH opacity and color from the spring
  const { color } = useSpring({
    from: { color: '#000000' },
    to: { color: "#1f0834" },
    config: { duration: 20000 },
  })

  const { opacity } = useSpring({
    from: { opacity: 0 },
    to: {opacity: 1},
    config: {duration: 1500}
  })

  return (
    <animated.mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[3, -1, 0]}
      castShadow
    >
      <circleGeometry args={[1.97, 64]} />
      <animated.meshBasicMaterial
        color={color}  // Directly use the animated color value
        transparent={true}
        opacity={opacity}
      />
    </animated.mesh>
  );
}


// hexagons 3d model

// Predefine hover material outside the component
const hoverMaterial = new THREE.MeshStandardMaterial({
  color: 'red',
  emissive: 'red',
  emissiveIntensity: 5
});

function HexagonsModel() {
  const group = useRef();
  const originalMaterials = useRef({});
  const { scene, animations } = useGLTF('/wall.glb');
  const { actions } = useAnimations(animations, scene);

  // Store original materials and prepare scene
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // Store original material by UUID
        originalMaterials.current[child.uuid] = child.material;
      }
    });

    scene.rotation.set(Math.PI/2, Math.PI/2, 0);
    scene.position.set(-10, -1.7, -2);
  }, [scene]);

  // Handle animations
  useEffect(() => {
    Object.values(actions).forEach(action => action?.play());
  }, [actions]);

  // Hover handler
  const handleHover = (e) => {
    e.stopPropagation();
    const mesh = e.object;
    mesh.material = hoverMaterial;
  };

  // Unhover handler
  const handleUnhover = (e) => {
    e.stopPropagation();
    const mesh = e.object;
    mesh.material = originalMaterials.current[mesh.uuid];
  };

  return (
    <group 
      ref={group}
      onPointerOver={handleHover}
      onPointerOut={handleUnhover}
    >
      <primitive object={scene} />
    </group>
  );
}



function PlaneSurfaceFloor()  {
    return (
        <mesh rotation={[-Math.PI / 2,0,0]} position={[0,-2,0]} receiveShadow>
            <planeGeometry args={[30,10]} />
            <meshStandardMaterial color="black" metalness={1} roughness={0} />
        </mesh>
    )
}

function NewSurfaceModel() {

    const { scene, nodes, animations } = useGLTF('/surface.glb')

    const { actions } = useAnimations(animations, scene)

    useEffect(() => {

        scene.rotation.y = - Math.PI / 2
        scene.scale.setScalar(0.5)
        scene.position.y = -1.7

    }, [])

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

function Rig() {
    const [vec] = useState(() => new THREE.Vector3()) 
    const { camera, mouse } = useThree() 

    useFrame(() => {
        // Interpolate the camera position based on mouse movement
        const targetPosition = vec.set(mouse.x * 0.5, 0.5 + mouse.y, 8) 
        camera.position.lerp(targetPosition, 0.05) 
        camera.lookAt(-1, 0, 0) 
    })

    return null // No need to render anything in the scene
}

function CeritficateModel() {

    const { scene } = useGLTF("/robo.glb")

    useEffect(() => {

      scene.rotation.y = Math.PI 
      scene.position.y = -1
      scene.position.x = 3
      scene.scale.setScalar(1)

    },[])

    return <primitive object={scene} />
}

export default function RotationAnimation() {

    const {progress} = useSpring({
      from: {progress: 0},
      to: {progress: 1},
      config: {duration: 2000},
      delay: 1000,
    })

      return (
        <div className="w-full h-full bg-black">
            <Canvas 
                gl={{ antialias: false }}
                shadows dpr={[1, 2]}
                camera={{
                    position: [-1,2,4],
                }}
            >
                {/* <GetCameraPosition /> */}
                <Suspense fallback={null}>
                <animated.ambientLight intensity={progress.to(p => p * 0.5)} />
                <animated.directionalLight castShadow intensity={progress.to(p => p * 10)} color="purple" position={[0,3,3]} />
                <animated.directionalLight castShadow intensity={progress.to(p => p * 10)} color="purple" position={[0,3,0]} />

                <HexagonsModel />
                <RotatingCircle />
                <CeritficateModel />
                <AntiRotatingCircle />
                <OuterRadiusCircle />
                <NewSurfaceModel />
                <Rig />
                </Suspense>
                <OrbitControls enableZoom={false} makeDefault />
                <Stats />
            </Canvas>
        </div>
      )
}