import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {Text3D, Text, Float, Sparkles, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface StreakBadge3DProps {
  current: number;
  best: number;
}

const BadgeText: React.FC<{ text: string; position: [number, number, number] }> = ({ text, position }) => {
  return (
  // <>
  //   <Text3D
  //         curveSegments={32}
  //         bevelEnabled
  //         bevelSize={0.04}
  //         bevelThickness={0.1}
  //         height={0.5}
  //         lineHeight={0.5}
  //         letterSpacing={-0.06}
  //         size={1.5}
  //         font="/Inter_Bold.json">
  //         {text}
  //         <meshNormalMaterial />
  //     </Text3D>
  // </>
    <Text
      position={position}
      fontSize={0.6}
      color="black"
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
    
  );
};

const RotatingBadge = ({ current, best }: StreakBadge3DProps) => {
  const badgeRef = useRef<THREE.Group>(null!);
  const clockTarget = useRef<THREE.Vector3>(new THREE.Vector3());

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const radius = 3;
    const x = Math.cos(t) * radius;
    const y = Math.sin(t) * radius;
    const z = 0;

    
    clockTarget.current.set(x, y, z+10);
    badgeRef.current.lookAt(clockTarget.current);
  });

  return (
    <group ref={badgeRef}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh>
          <torusGeometry args={[3.5, 0.75, 24, 100]} />
          <meshStandardMaterial color="#FF5733" metalness={0.8} roughness={0.2} />
        </mesh>
        <BadgeText text={`🔥 ${current} Day Streak`} position={[0, 0.8, 1]} />
        <BadgeText text={`🏆 Best: ${best}`} position={[0, -0.8, 1]} />
        <Sparkles count={60} scale={[6, 6, 6]} size={2} speed={0.3} />
      </Float>
    </group>
  );
};

export default function StreakBadge3D({ current, best }: StreakBadge3DProps) {
  return (
    <div style={{ width: '100%', height: '350px' }}>
      <Canvas gl={{ alpha: true }} camera={{ position: [0, 0, 10], fov: 50 }}>
        {/* <color attach="background" args={['#111']}/> */}
        <ambientLight intensity={1} />
        <directionalLight position={[0, 10, 5]} intensity={2} />
        <Environment preset="sunset" />
        <RotatingBadge current={current} best={best} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};
