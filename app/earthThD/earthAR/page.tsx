"use client";
import BackButton from "@/app/components/BackButton";
import { useEffect, useState, useRef, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { ARButton } from "three/addons/webxr/ARButton.js";
import ARError from "./components/ARError";
import ARLoading from "./components/ARLoading";

export default function AREarth() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const earthRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const handleResize = useCallback(() => {
    if (rendererRef.current) {
      const camera = rendererRef.current.xr.getCamera();
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Check WebXR AR support
    const checkARSupport = async () => {
      if (!navigator.xr) {
        setError(
          "دستگاه شما از واقعیت افزوده پشتیبانی نمی‌کند. از موبایل و ترجیحا از مرورگر کروم استفاده کنید."
        );
        return false;
      }

      try {
        const supported = await navigator.xr.isSessionSupported("immersive-ar");
        if (!supported) {
          setError(
            "دستگاه شما از واقعیت افزوده پشتیبانی نمی‌کند. از موبایل و ترجیحا از مرورگر کروم استفاده کنید."
          );
        }
        return supported;
      } catch (err) {
        setError(
          "دستگاه شما از واقعیت افزوده پشتیبانی نمی‌کند. از موبایل و ترجیحا از مرورگر کروم استفاده کنید."
        );
        return false;
      }
    };

    const initScene = async () => {
      const isARSupported = await checkARSupport();
      if (!isARSupported) {
        setLoading(false);
        return;
      }

      // Initialize scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      // Initialize camera
      const camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        20
      );

      // Initialize renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      rendererRef.current = renderer;
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.xr.enabled = true;

      // Add AR button with better styling
      const arButton = ARButton.createButton(renderer, {
        requiredFeatures: ["hit-test"],
      });
      arButton.textContent = "واقعیت افزوده (AR)";
      arButton.className = "ar-button";
      Object.assign(arButton.style, {
        width: "100%",
        height: "3rem",
        backgroundColor: "#FFA500",
        color: "#000",
        borderRadius: "1rem",
        border: "2px solid #FFC87A",
        fontFamily: "iranyekan, sans-serif",
        fontSize: "1.25rem",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.6)",
        transition: "all 0.1s ease-in-out",
        display: "block",
        boxSizing: "border-box",
        padding: "8px",
      });
      arButton.onmousedown = () => {
        arButton.style.transform = "translateY(2px) scale(0.95)";
      };
      arButton.onmouseup = () => {
        arButton.style.transform = "translateY(0) scale(1)";
      };

      const container = document.getElementById("ar-button-container");
      if (container) {
        container.appendChild(arButton);
      }

      // Load Earth model
      const loader = new GLTFLoader();
      try {
        const gltf = await loader.loadAsync("/ar-earth/earth.glb");
        const earth = gltf.scene;
        earthRef.current = earth;

        // Adjust earth properties
        earth.scale.set(0.07, 0.07, 0.07);
        earth.rotation.y = Math.PI / 2; // Slight rotation for better viewing

        // Add rotation animation
        const animate = () => {
          if (earthRef.current) {
            earthRef.current.rotation.y += 0.002;
          }
        };

        scene.add(earth);

        // Handle window resize
        const onResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", onResize);

        // Start AR session
        renderer.setAnimationLoop(() => {
          animate();
          renderer.render(scene, camera);
        });

        // Add to DOM
        const arView = document.getElementById("ar-view");
        if (arView) {
          arView.appendChild(renderer.domElement);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error loading model:", err);
        setError("بارگزاری مدل ناموفق بود.");
        setLoading(false);
      }
    };

    initScene();

    return () => {
      // Cleanup
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }

      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loading) return <ARLoading />;
  if (error) return <ARError error={error} />;

  return (
    <section className="relative overflow-hidden w-full text-white flex flex-col items-center bg-mybg/96">
      {/* background */}
      <div className="absolute top-0 left-0 -z-10 w-full h-screen">
        <img
          src="/clipart/earth.png"
          alt="Earth illustration"
          className="w-40 absolute top-20 -right-3"
        />
        <img
          src="/clipart/earth.png"
          alt="Earth illustration"
          className="w-96 absolute -bottom-7 -left-44"
        />
      </div>
      <div
        id="ar-button-container"
        className="w-full h-full flex justify-center align-middle"
      />
      <div id="ar-view" className="w-full h-full" />
      <BackButton pathName="/earthThD" />
    </section>
  );
}
