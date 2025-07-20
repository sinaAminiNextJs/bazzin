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

  // 1. فقط یکبار پشتیبانی AR چک شود
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

  // 2. ایجاد و اضافه کردن دکمه AR فقط یکبار و اگر پشتیبانی باشد
  useEffect(() => {
    if (!arSupported) return;

    // ساخت renderer فقط برای دکمه (ممکنه با initAR مجزا باشد)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.xr.enabled = true;
    rendererRef.current = renderer;

    // ساخت دکمه AR
    const arButton = ARButton.createButton(renderer, {
      requiredFeatures: ["hit-test"],
    });
    arButton.textContent = "شروع واقعیت افزوده";
    Object.assign(arButton.style, {
      padding: "1rem 2rem",
      backgroundColor: "#ffc585",
      color: "#000",
      borderRadius: "1rem",
      border: "2px solid #fff7c4",
      fontFamily: "iranyekan, sans-serif",
      fontSize: "1.25rem",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.6)",
      cursor: "pointer",
      zIndex: "1000",
    });

    document.getElementById("ar-button-container")?.appendChild(arButton);

    const btnContainer = document.getElementById("ar-button-container");
    if (btnContainer) {
      btnContainer.appendChild(arButton);
    } else {
      document.body.appendChild(arButton);
    }

    // وقتی دکمه زده شد، state تغییر می‌کند
    const onClick = () => {
      setHasStarted(true);
    };
    arButton.addEventListener("click", onClick);

    return () => {
      arButton.removeEventListener("click", onClick);
      if (arButton.parentNode) arButton.parentNode.removeChild(arButton);
      renderer.dispose();
      rendererRef.current = null;
    };
  }, [arSupported]);

  // 3. وقتی کاربر شروع کرد، بارگذاری و اجرای AR
  useEffect(() => {
    if (!hasStarted) return;

    setLoading(true);

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      20
    );

    const renderer = rendererRef.current!;
    renderer.setSize(window.innerWidth, window.innerHeight);

    const container = document.getElementById("ar-view");
    if (container) container.appendChild(renderer.domElement);

    // نورپردازی
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(ambientLight, directionalLight);

    // بارگذاری مدل زمین
    const loader = new GLTFLoader();
    loader.load(
      "/ar-earth/earth.glb",
      (gltf) => {
        const earth = gltf.scene;
        earth.scale.set(0.07, 0.07, 0.07);
        earth.rotation.y = Math.PI / 2;
        scene.add(earth);
        earthRef.current = earth;

        setLoading(false);

        // شروع حلقه رندر و انیمیشن
        renderer.setAnimationLoop(() => {
          if (earthRef.current) {
            earthRef.current.rotation.y += 0.002;
          }
          renderer.render(scene, camera);
        });
      },
      undefined,
      (error) => {
        console.error("خطا در بارگذاری مدل:", error);
        setError("خطا در بارگذاری مدل زمین");
        setLoading(false);
      }
    );

    // هندل resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);
    renderer.xr.addEventListener("sessionend", () => {
      renderer.setAnimationLoop(null);
      if (earthRef.current && sceneRef.current) {
        sceneRef.current.remove(earthRef.current);
        earthRef.current = null;
      }
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      rendererRef.current = null;
      sceneRef.current = null;
      setHasStarted(false);
    });

    return () => {
      window.removeEventListener("resize", onResize);
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

      <div
        id="ar-button-container"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
      ></div>

      {loading && <ARLoading />}
      {error && <ARError error={error} />}

      <div className="ar-container">
        <div id="ar-view" style={{ width: "100%", height: "100vh" }} />
      </div>

      <BackButton pathName="/menu" />
    </section>
  );
}
