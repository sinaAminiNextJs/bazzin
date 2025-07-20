"use client";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { ARButton } from "three/addons/webxr/ARButton.js";
import ARLoading from "./components/ARLoading";
import ARError from "./components/ARError";
import BackButton from "@/app/components/BackButton";

export default function AREarth() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [arSupported, setArSupported] = useState<boolean | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const earthRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const container = document.getElementById("ar-button-container");

  useEffect(() => {
    // Check WebXR AR support
    const checkARSupport = async () => {
      if (!navigator.xr) {
        setArSupported(false);
        setError("WebXR not supported in your browser");
        return false;
      }

      try {
        const supported = await navigator.xr.isSessionSupported("immersive-ar");
        setArSupported(supported);
        if (!supported) {
          setError(
            "دستگاه شما از واقعیت افزوده پشتیبانی نمیکند. از موبایل و مرورگر کروم استفاده کنید."
          );
        }
        return supported;
      } catch (err) {
        setArSupported(false);
        setError("Failed to check AR support");
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
      if (container) {
        container.appendChild(arButton);
      }
      // document.body.appendChild(arButton);
      arButton.textContent = "واقعیت افزوده (AR)";
      arButton.removeAttribute("style"); // Remove inline styles

      Object.assign(arButton.style, {
        // position: "absolute",
        top: "0px",
        // botton: "50vh",
        minWidth: "80vw",
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
        setError("بارگذاری مدل ناموفق بود.");
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

      const arButton = document.querySelector(".ar-button");
      if (arButton) {
        document.body.removeChild(arButton);
      }

      window.removeEventListener("resize", () => {});
    };
  }, []);

  if (loading) return <ARLoading />;
  if (error) return <ARError error={error} />;

  return (
    <section className="relative overflow-hidden w-full min-h-screen text-white flex flex-col items-center bg-mybg/96">
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
        className="fixed top-0 left-0 w-full px-4 z-50 flex justify-center bg-amber-500"
      >
        hiiiii im here{container ? "yes" : "no"}
      </div>

      <div className="ar-container">
        <div id="ar-view" style={{ width: "100%", height: "100vh" }} />
      </div>
      <BackButton pathName="/earthThD" />
    </section>
  );
}
