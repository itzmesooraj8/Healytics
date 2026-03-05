import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DNAHelix = ({ position = [0, 0, 0] as [number, number, number], scale = 1 }) => {
  const groupRef = useRef<THREE.Group>(null);
  const count = 24;
  const radius = 0.8;
  const height = 6;

  const spheres = useMemo(() => {
    const items: { pos1: [number, number, number]; pos2: [number, number, number]; y: number }[] = [];
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const y = (t - 0.5) * height;
      const angle = t * Math.PI * 4;
      items.push({
        pos1: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
        pos2: [Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius],
        y: t,
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {spheres.map((s, i) => (
        <group key={i}>
          <mesh position={s.pos1}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? "#00d4ff" : "#7c3aed"}
              emissive={i % 3 === 0 ? "#00d4ff" : "#7c3aed"}
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
          <mesh position={s.pos2}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? "#7c3aed" : "#00d4ff"}
              emissive={i % 3 === 0 ? "#7c3aed" : "#00d4ff"}
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
          {i % 2 === 0 && (
            <mesh position={[(s.pos1[0] + s.pos2[0]) / 2, s.pos1[1], (s.pos1[2] + s.pos2[2]) / 2]}>
              <cylinderGeometry args={[0.015, 0.015, radius * 2, 8]} />
              <meshStandardMaterial color="#00d4ff" opacity={0.3} transparent />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
};

export default DNAHelix;
