"use client";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import ARLoading from "./components/ARLoading";
import ARError from "./components/ARError";
import BackButton from "@/app/components/BackButton";

export default function AREarth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [arSupported, setArSupported] = useState<boolean | null>(null);
  const [sessionStarted, setSessionStarted] = useState(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const earthRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sessionRef = useRef<XRSession | null | undefined>(null);

  // چک کردن پشتیبانی AR فقط یک بار
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

  // مقداردهی صحنه و شروع رندر بعد از شروع جلسه AR
  useEffect(() => {
    if (!sessionStarted) return;

    setLoading(true);

    // صحنه و رندرر
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      20
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    rendererRef.current = renderer;

    const container = document.getElementById("ar-view");
    if (container) container.appendChild(renderer.domElement);

    // چراغ‌ها
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(ambientLight, directionalLight);

    // بارگذاری مدل زمین
    const loader = new GLTFLoader();
    loader
      .loadAsync("/ar-earth/earth.glb")
      .then((gltf) => {
        const earth = gltf.scene;
        earth.scale.set(0.07, 0.07, 0.07);
        earth.rotation.y = Math.PI / 2;
        scene.add(earth);
        earthRef.current = earth;
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطا در بارگذاری مدل زمین:", err);
        setError("خطا در بارگذاری مدل زمین");
        setLoading(false);
      });

    // انیمیشن چرخش زمین و رندرینگ
    renderer.setAnimationLoop(() => {
      if (earthRef.current) {
        earthRef.current.rotation.y += 0.002;
      }
      renderer.render(scene, camera);
    });

    // تغییر سایز ویو
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // پاکسازی هنگام خروج
    return () => {
      window.removeEventListener("resize", onResize);
      if (rendererRef.current) {
        rendererRef.current.setAnimationLoop(null);
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      if (container) {
        container.innerHTML = "";
      }
      if (sessionRef.current) {
        sessionRef.current.end();
        sessionRef.current = null;
      }
    };
  }, [sessionStarted]);

  // تابعی که در هنگام کلیک دکمه اجرا می‌شود و AR Session را شروع می‌کند
  const startARSession = async () => {
    try {
      setLoading(true);
      // درخواست شروع جلسه AR با ویژگی hit-test (می‌توانید ویژگی‌ها را تغییر دهید)
      const session = await navigator.xr?.requestSession("immersive-ar", {
        requiredFeatures: ["hit-test"],
      });
      if (sessionRef) {
        sessionRef.current = session;
      }
      // اکنون که session گرفته شد، شروع صحنه و رندر
      setSessionStarted(true);
      setLoading(false);
    } catch (err) {
      console.error("شروع جلسه AR با خطا مواجه شد:", err);
      setError("شروع واقعیت افزوده امکان‌پذیر نیست.");
      setLoading(false);
    }
  };

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

      {/* دکمه شروع AR */}
      {!sessionStarted && arSupported && !loading && (
        <button
          onClick={startARSession}
          className="mt-32 text-black h-12 bg-myorange rounded-2xl border-2 border-myorangeLight font-iranyekan text-xl px-8 shadow-[0px_0px_20px_black]"
        >
          شروع واقعیت افزوده (AR)
        </button>
      )}

      {error && <ARError error={error} />}
      {loading && <ARLoading />}

      {/* کانتینر رندر WebGL */}
      <div className="ar-container">
        <div id="ar-view" style={{ width: "100%", height: "100vh" }} />
      </div>

      <BackButton pathName="/earthThD" />
    </section>
  );
}
