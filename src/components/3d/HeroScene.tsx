import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import DNAHelix from "./DNAHelix";
import FloatingMolecules from "./FloatingMolecules";
import GlassOrb from "./GlassOrb";
import ParticleField from "./ParticleField";

const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
          <pointLight position={[-3, 2, 4]} intensity={1.5} color="#00d4ff" distance={15} />
          <pointLight position={[3, -2, 3]} intensity={1} color="#7c3aed" distance={12} />
          <pointLight position={[0, 3, 2]} intensity={0.5} color="#10b981" distance={10} />

          {/* Main glass orb - center right */}
          <GlassOrb position={[2.5, 0.3, 0]} />

          {/* DNA Helix - left side */}
          <DNAHelix position={[-3, 0, -2]} scale={0.7} />

          {/* Floating molecules everywhere */}
          <FloatingMolecules />

          {/* Particle field background */}
          <ParticleField count={400} />

          {/* Environment for reflections */}
          <Environment preset="night" />

          {/* Subtle ground shadows */}
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.3}
            scale={15}
            blur={2.5}
            far={4}
            color="#00d4ff"
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
