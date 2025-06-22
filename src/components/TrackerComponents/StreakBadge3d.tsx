import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Sparkles, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Flame } from 'lucide-react';

interface StreakBadge3DProps {
  current: number;
  best: number;
}

const BadgeText: React.FC<{ text: string; position: [number, number, number] }> = ({ text, position }) => {
  return (
    <Text
      position={position}
      fontSize={0.4}
      color="white"
      anchorX="center"
      anchorY="middle"
      font="/fonts/Inter-Bold.woff"
    >
      {text}
    </Text>
  );
};

const RotatingBadge = ({ current, best }: StreakBadge3DProps) => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    groupRef.current.rotation.y += 0.005;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh>
          <torusGeometry args={[2.5, 0.5, 16, 100]} />
          <meshStandardMaterial color="#FF5733" metalness={0.8} roughness={0.2} />
        </mesh>
        <BadgeText text={`🔥 ${current} Day Streak`} position={[0, 0.6, 0]} />
        <BadgeText text={`🏆 Best: ${best}`} position={[0, -0.6, 0]} />
        <Sparkles count={60} scale={[6, 6, 6]} size={2} speed={0.3} />
      </Float>
    </group>
  );
};

export default function StreakBadge3D({ current, best }: StreakBadge3DProps) {
  return (
    <div className="w-full h-[400px] rounded-xl shadow-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <color attach="background" args={['#111']} />
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} />
        <Environment preset="sunset" />
        <RotatingBadge current={current} best={best} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};
