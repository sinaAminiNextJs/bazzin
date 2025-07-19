"use client";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { ARButton } from "three/addons/webxr/ARButton.js";

export default function AREarth() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [arSupported, setArSupported] = useState<boolean | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const earthRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    // Check WebXR AR support
    const checkARSupport = async () => {
      if (!navigator.xr) {
        setArSupported(false);
        setError(
          "دستگاه شما از واقعیت افزوده پشتیبانی نمی‌کند. از موبایل و ترجیحا از مرورگر کروم استفاده کنید."
        );
        return false;
      }

      try {
        const supported = await navigator.xr.isSessionSupported("immersive-ar");
        setArSupported(supported);
        if (!supported) {
          setError(
            "دستگاه شما از واقعیت افزوده پشتیبانی نمی‌کند. از موبایل و ترجیحا از مرورگر کروم استفاده کنید."
          );
        }
        return supported;
      } catch (err) {
        setArSupported(false);
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
      arButton.style.position = "absolute";
      arButton.style.bottom = "20px";
      arButton.style.left = "50%";
      arButton.style.transform = "translateX(-50%)";
      arButton.style.zIndex = "10";
      document.body.appendChild(arButton);

      // Load Earth model
      const loader = new GLTFLoader();
      try {
        const gltf = await loader.loadAsync("/ar-earth/earth.glb");
        const earth = gltf.scene;
        earthRef.current = earth;

        // Adjust earth properties
        earth.scale.set(0.3, 0.3, 0.3);
        earth.rotation.y = Math.PI / 4; // Slight rotation for better viewing

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

      const arButton = document.querySelector(".ar-button");
      if (arButton) {
        document.body.removeChild(arButton);
      }

      window.removeEventListener("resize", () => {});
    };
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>
          بارگزاری مدل واقعیت افزوده.
          <br /> صبور باشید.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <p>لطفا از دستگاه اندروید با مرورگر کروم استفاده کنید.</p>
      </div>
    );
  }

  return (
    <div className="ar-container">
      <div id="ar-view" style={{ width: "100%", height: "100vh" }} />
    </div>
  );
}
