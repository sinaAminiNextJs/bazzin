"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import { TextureLoader, WebGLRenderer } from "three";
import { useLoader } from "@react-three/fiber";
import { Html } from "@react-three/drei";

function EarthSphere() {
  const textureUrl = "/day-sky.webp";
  const texture = useLoader(TextureLoader, textureUrl);
  console.log("texture", texture);

  return (
    <mesh scale={0.2} position={[0, 0, -0.5]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function StartARButtonInScene() {
  const { gl, scene, camera } = useThree();

  const handleStartAR = async () => {
    if (navigator.xr) {
      try {
        const session = await navigator.xr.requestSession("immersive-ar", {
          optionalFeatures: ["local-floor", "bounded-floor"],
        });

        const renderer = gl as WebGLRenderer;
        renderer.xr.enabled = true;
        await renderer.xr.setSession(session);

        console.log("AR session started!");

        // در R3F نیازی به animationLoop نیست چون خودش هندل می‌کند
      } catch (e) {
        console.error("Failed to start AR session:", e);
      }
    } else {
      alert("WebXR not supported on this device/browser.");
    }
  };

  return (
    <Html
      position={[0, 0, -1]}
      transform
      className="z-20"
      style={{ pointerEvents: "auto" }}
    >
      <button
        onClick={handleStartAR}
        className="bg-amber-400 border z-20 text-black"
      >
        Start AR
      </button>
    </Html>
  );
}

export default function AREarthPage() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Canvas
        gl={{ alpha: true }}
        style={{
          background: "transparent",
          width: "100%",
          height: "100%",
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 2, 3]} />
        <Suspense fallback={null}>
          <EarthSphere />
          <StartARButtonInScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
