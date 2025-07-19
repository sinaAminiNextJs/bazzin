"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import { TextureLoader, WebGLRenderer } from "three";
import { useLoader } from "@react-three/fiber";

function EarthSphere() {
  const texture = useLoader(TextureLoader, "/day-sky.webp");

  return (
    <mesh scale={0.2} position={[0, 0, -0.5]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default function AREarthPage() {
  const handleStartAR = async () => {
    if (navigator.xr) {
      try {
        const session = await navigator.xr.requestSession("immersive-ar", {
          optionalFeatures: ["local-floor", "bounded-floor"],
        });
        const canvas = document.querySelector("canvas");
        if (!canvas) return;
        const gl = canvas as unknown as WebGLRenderer;
        gl.xr.enabled = true;
        await gl.xr.setSession(session);
        console.log("AR session started!");
      } catch (e) {
        console.error("Failed to start AR session:", e);
      }
    } else {
      alert("WebXR not supported on this device/browser.");
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas gl={{ alpha: true }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 2, 3]} />
        <Suspense fallback={null}>
          <EarthSphere />
        </Suspense>
      </Canvas>
      {/* دکمه رو بیرون از Canvas و Html قرار میدیم */}
      <button
        onClick={handleStartAR}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          padding: "10px 20px",
          background: "#fbbf24", // amber-400 رنگ Tailwind
          border: "none",
          borderRadius: 4,
          color: "#000",
          cursor: "pointer",
          zIndex: 9999,
        }}
      >
        Start AR
      </button>
    </div>
  );
}
