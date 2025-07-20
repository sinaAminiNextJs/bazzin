"use client";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { ARButton } from "three/addons/webxr/ARButton.js";
import ARLoading from "./components/ARLoading";
import ARError from "./components/ARError";
import BackButton from "@/app/components/BackButton";

export default function AREarth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [arSupported, setArSupported] = useState<boolean | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const earthRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Check for AR support once
  useEffect(() => {
    const checkARSupport = async () => {
      if (!navigator.xr) {
        setArSupported(false);
        setError("WebXR توسط مرورگر شما پشتیبانی نمی‌شود.");
        return;
      }
      try {
        const supported = await navigator.xr.isSessionSupported("immersive-ar");
        setArSupported(supported);
        if (!supported) {
          setError("دستگاه شما از واقعیت افزوده پشتیبانی نمی‌کند.");
        }
      } catch (err) {
        setArSupported(false);
        setError("بررسی پشتیبانی AR با خطا مواجه شد.");
      }
    };
    checkARSupport();
  }, []);

  // Init AR only after user clicks
  useEffect(() => {
    if (!hasStarted) return;

    const initAR = async () => {
      setLoading(true);

      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        20
      );

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.xr.enabled = true;
      rendererRef.current = renderer;

      const container = document.getElementById("ar-view");
      if (container) container.appendChild(renderer.domElement);

      // Add AR button
      const arButton = ARButton.createButton(renderer);
      arButton.style.display = "none"; // مخفی می‌کنیم
      document.body.appendChild(arButton);
      arButton.click(); // شبیه کلیک خودکار روی ARButton

      // Wait for AR session to start
      renderer.xr.addEventListener("sessionstart", async () => {
        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1);
        scene.add(ambientLight, directionalLight);

        // Load earth model
        const loader = new GLTFLoader();
        try {
          const gltf = await loader.loadAsync("/ar-earth/earth.glb");
          const earth = gltf.scene;
          earth.scale.set(0.07, 0.07, 0.07);
          earth.rotation.y = Math.PI / 2;
          scene.add(earth);
          earthRef.current = earth;
        } catch (err) {
          console.error("مدل بارگذاری نشد:", err);
          setError("خطا در بارگذاری مدل زمین");
        }

        // Animate
        renderer.setAnimationLoop(() => {
          if (earthRef.current) {
            earthRef.current.rotation.y += 0.002;
          }
          renderer.render(scene, camera);
        });
      });

      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });

      setLoading(false);
    };

    initAR();

    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
    };
  }, [hasStarted]);

  return (
    <section className="relative overflow-hidden w-full min-h-screen text-white flex flex-col items-center bg-mybg/96">
      {/* Backgrounds */}
      <div className="absolute top-0 left-0 -z-10 w-full h-screen">
        <img
          src="/clipart/earth.png"
          alt="Earth"
          className="w-40 absolute top-20 -right-3"
        />
        <img
          src="/clipart/earth.png"
          alt="Earth"
          className="w-96 absolute -bottom-7 -left-44"
        />
      </div>

      {/* Start AR Button */}
      {!hasStarted && arSupported && !loading && (
        <button
          onClick={() => setHasStarted(true)}
          className="mt-32 text-black h-12 bg-myorange rounded-2xl border-2 border-myorangeLight font-iranyekan text-xl px-8 shadow-[0px_0px_20px_black]"
        >
          شروع واقعیت افزوده (AR)
        </button>
      )}

      {/* Error */}
      {error && <ARError error={error} />}
      {loading && <ARLoading />}

      {/* WebGL Renderer output */}
      <div className="ar-container">
        <div id="ar-view" style={{ width: "100%", height: "100vh" }} />
      </div>

      <BackButton pathName="/earthThD" />
    </section>
  );
}
