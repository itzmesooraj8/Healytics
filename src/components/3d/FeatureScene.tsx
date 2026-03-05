import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const FloatingShape = ({ position, color, speed, distort }: {
  position: [number, number, number];
  color: string;
  speed: number;
  distort: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
      ref.current.rotation.z = state.clock.elapsedTime * speed * 0.3;
    }
  });

  return (
    <Float speed={speed * 2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.9}
          distort={distort}
          speed={2}
        />
      </mesh>
    </Float>
  );
};

const FeatureScene = () => (
  <div className="absolute inset-0 z-0 opacity-40">
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} />
        <pointLight position={[3, 3, 3]} color="#00d4ff" intensity={2} />
        <pointLight position={[-3, -2, 2]} color="#7c3aed" intensity={1.5} />
        <FloatingShape position={[-2, 1, 0]} color="#00d4ff" speed={0.3} distort={0.4} />
        <FloatingShape position={[2.5, -1, -1]} color="#7c3aed" speed={0.2} distort={0.3} />
        <FloatingShape position={[0, 2, -2]} color="#10b981" speed={0.25} distort={0.5} />
      </Suspense>
    </Canvas>
  </div>
);

export default FeatureScene;
