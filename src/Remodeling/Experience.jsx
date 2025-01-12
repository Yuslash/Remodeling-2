import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";

const Model = () => {
  const { scene, materials } = useGLTF("/bloom_light_and_mountain.glb");  // Load the .glb file

  useEffect(() => {
    // Ensure the model and materials are loaded
    if (scene && materials) {
      console.log('Materials:', materials);

      // Assuming 'lambert1', 'lambert2', and 'lambert3' are the material names
      // You can assign materials to specific meshes in the scene:
      scene.traverse((child) => {
        if (child.isMesh) {
          if (child.name === 'MeshName1') {
            child.material = materials.lambert1;  // Replace material
          } else if (child.name === 'MeshName2') {
            child.material = materials.lambert2;  // Replace material
          } else if (child.name === 'MeshName3') {
            child.material = materials.lambert3;  // Replace material
          }
        }
      });
    }
  }, [scene, materials]);

  return <primitive object={scene} />;
};

export default function Experience() {
  return <>
    <div className="canvas-container w-full h-full bg-black">
      <Canvas
        camera={{ position: [0, 2, 5] }}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[2, 3, 2]} intensity={1} />
        <Model />
        <OrbitControls />
      </Canvas>
    </div>
  </>
}
