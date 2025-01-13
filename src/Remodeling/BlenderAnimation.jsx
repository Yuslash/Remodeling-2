import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

function Animation() {
  const { scene, animations } = useGLTF('/different.glb');
  const { actions } = useAnimations(animations, scene);
  const meshRef = useRef();

  useEffect(() => {
    // Play the first animation in the list when the model is loaded
    if (actions && Object.keys(actions).length > 0) {
      actions[Object.keys(actions)[0]].play(); // Plays the first animation
    }
  }, [actions]);

  return (
    <primitive ref={meshRef} object={scene} />
  );
}

function BlenderAnimation() {
  return (
    <div className='w-full h-full bg-black'>
    <Canvas>
      <ambientLight />
      <spotLight position={[10, 10, 10]} />
      <Animation />
      <OrbitControls />
    </Canvas>
    </div>
  );
}

export default BlenderAnimation;
