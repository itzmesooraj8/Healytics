import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Molecule = ({ position, color, speed, size }: { position: [number, number, number]; color: string; speed: number; size: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  const initialPos = useRef(position);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed;
      ref.current.position.x = initialPos.current[0] + Math.sin(t) * 0.5;
      ref.current.position.y = initialPos.current[1] + Math.cos(t * 0.7) * 0.4;
      ref.current.position.z = initialPos.current[2] + Math.sin(t * 0.5) * 0.3;
      ref.current.rotation.x = t * 0.5;
      ref.current.rotation.z = t * 0.3;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[size, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        roughness={0.1}
        metalness={0.9}
        wireframe
      />
    </mesh>
  );
};

const FloatingMolecules = () => {
  const molecules = [
    { position: [-3, 2, -2] as [number, number, number], color: "#00d4ff", speed: 0.4, size: 0.3 },
    { position: [3.5, -1, -3] as [number, number, number], color: "#7c3aed", speed: 0.3, size: 0.25 },
    { position: [-2, -2, -1] as [number, number, number], color: "#00d4ff", speed: 0.5, size: 0.2 },
    { position: [2, 3, -4] as [number, number, number], color: "#10b981", speed: 0.35, size: 0.15 },
    { position: [-4, 0, -3] as [number, number, number], color: "#7c3aed", speed: 0.45, size: 0.18 },
    { position: [4, 1.5, -2] as [number, number, number], color: "#00d4ff", speed: 0.25, size: 0.22 },
    { position: [0, -3, -5] as [number, number, number], color: "#10b981", speed: 0.55, size: 0.12 },
    { position: [-1, 3.5, -3] as [number, number, number], color: "#f59e0b", speed: 0.3, size: 0.16 },
  ];

  return (
    <group>
      {molecules.map((m, i) => (
        <Molecule key={i} {...m} />
      ))}
    </group>
  );
};

export default FloatingMolecules;
