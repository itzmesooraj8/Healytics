import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

const GlassOrb = ({ position = [0, 0, 0] as [number, number, number] }) => {
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (innerRef.current) {
      innerRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      innerRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1} floatingRange={[-0.2, 0.2]}>
      <group position={position}>
        {/* Outer glass sphere */}
        <mesh>
          <sphereGeometry args={[1.2, 64, 64]} />
          <MeshTransmissionMaterial
            backside
            samples={6}
            thickness={0.5}
            chromaticAberration={0.3}
            anisotropy={0.3}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.1}
            roughness={0}
            color="#00d4ff"
            transmission={0.95}
            ior={1.5}
          />
        </mesh>

        {/* Inner rotating icosahedron */}
        <mesh ref={innerRef} scale={0.5}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#7c3aed"
            emissive="#7c3aed"
            emissiveIntensity={1}
            wireframe
          />
        </mesh>

        {/* Core glow */}
        <mesh scale={0.3}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={2}
          />
        </mesh>

        {/* Ring */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.6, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={0.8}
            opacity={0.6}
            transparent
          />
        </mesh>
      </group>
    </Float>
  );
};

export default GlassOrb;
