import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Mesh } from "three";

function Dodecahedron() {
  const { viewport } = useThree();
  // viewport = canvas in 3d units (meters)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const ref = useRef<Mesh>(null!);

  useEffect(() => {
    window.addEventListener("mousemove", (event) => {
      setMousePos({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    });
  }, []);

  useFrame(({ mouse }) => {
    const x = (mousePos.x * viewport.width) / 2;
    const y = (mousePos.y * viewport.height) / 2;
    ref.current.position.set(x, y, 0);
    ref.current.rotation.set(-y, x, 0);
  });

  return (
    <mesh ref={ref} castShadow>
      <dodecahedronBufferGeometry attach="geometry" />
      <meshNormalMaterial attach="material" />
    </mesh>
  );
}

const Model = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <spotLight
        intensity={0.6}
        position={[20, 10, 10]}
        angle={0.2}
        penumbra={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        castShadow
      />
      <mesh receiveShadow>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshPhongMaterial attach="material" color="#272727" />
      </mesh>
      <Dodecahedron />
    </Canvas>
  );
};

export default Model;
