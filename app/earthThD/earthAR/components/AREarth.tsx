// importهای ضروری برای سه‌بعدی‌سازی و AR
"use client";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { ARButton } from "three/addons/webxr/ARButton.js";

// کامپوننت‌های رابط کاربری
import ARLoading from "./ARLoading";
import ARError from "./ARError";

// شروع تابع اصلی کامپوننت
export default function AREarth() {
  // state‌ها برای مدیریت وضعیت‌های مختلف
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [arSupported, setArSupported] = useState<boolean | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  // refها برای نگهداری session و سایر آبجکت‌های three.js
  const xrSessionRef = useRef<XRSession | null>(null);
  const stopButtonRef = useRef<HTMLButtonElement | null>(null);

  // اندازه پنجره برای تنظیم ابعاد renderer
  const [windowsDimention, setWindowsDimention] = useState<[number, number]>([
    0, 0,
  ]);

  // مراجع به عناصر صحنه، مدل زمین و رندرر
  const sceneRef = useRef<THREE.Scene | null>(null);
  const earthRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  useEffect(() => {
    setWindowsDimention([window.innerWidth, window.innerHeight]);

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
  useEffect(() => {
    if (arSupported !== true) return;

    // ساخت رندرر سه‌بعدی
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.xr.enabled = true;
    rendererRef.current = renderer;

    // ساخت دکمه شروع AR
    var arButton = ARButton.createButton(renderer, {
      requiredFeatures: ["hit-test"],
      optionalFeatures: ["dom-overlay", "dom-overlay-for-handheld-ar"],
      domOverlay: { root: document.body },
    });
    // اعمال استایل سفارشی به دکمه
    Object.assign(arButton.style, {
      minWidth: "fit-content",
      opacity: "1",
      position: "fixed",
      bottom: "20px",
      left: "20px",
      padding: "8px 32px",
      backgroundColor: "#ffc585",
      color: "#000",
      borderRadius: "1rem",
      border: "2px solid #fff7c4",
      fontFamily: "iranyekan, sans-serif",
      fontSize: "1.25rem",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.6)",
      cursor: "pointer",
      zIndex: "11000",
    });

    // اضافه کردن به container
    const btnContainer = document.getElementById("ar-button-container");
    if (btnContainer) {
      btnContainer.appendChild(arButton);
    } else {
      alert("مشکلی در نمایش دکمه شروع پیش آمده");
      // document.body.appendChild(arButton);
    }

    // زمانی که دکمه کلیک شد، AR شروع شود
    const onClick = () => {
      setHasStarted(true);
    };
    arButton.addEventListener("click", onClick);

    // پاکسازی هنگام unmount شدن
    return () => {
      arButton.removeEventListener("click", onClick);
      if (arButton.parentNode) arButton.parentNode.removeChild(arButton);
      renderer.dispose();
      rendererRef.current = null;
    };
  }, [arSupported]);
  useEffect(() => {
    if (!hasStarted) return;

    // حذف بکگراند
    const bg = document.getElementById("background-images");
    if (bg) bg.style.display = "none";

    setLoading(true);

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // ساخت دوربین
    const camera = new THREE.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.01,
      20
    );
    camera.position.set(0, 0, 3);

    // گرفتن رندرر از ref و تنظیم سایز
    const renderer = rendererRef.current!;
    renderer.setSize(window.innerWidth, window.innerHeight);

    // اضافه کردن canvas به DOM
    const container = document.getElementById("ar-view");
    if (container) container.appendChild(renderer.domElement);

    // نورپردازی
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(ambientLight, directionalLight);

    // بارگذاری مدل glTF زمین
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

        // انیمیشن چرخش زمین
        renderer.setAnimationLoop(() => {
          if (earthRef.current) {
            earthRef.current.rotation.y += 0.002;
          }
          renderer.render(scene, camera);
        });

        // دکمه توقف AR
        const showStopButton = () => {
          // حذف دکمه قبلی
          if (stopButtonRef.current) {
            stopButtonRef.current.remove();
          }

          // ایجاد دکمه جدید
          const stopButton = document.createElement("button");
          Object.assign(stopButton.style, {
            // استایل سفارشی
          });

          stopButton.addEventListener("click", () => {
            if (rendererRef.current?.xr.getSession()) {
              rendererRef.current.xr.getSession()?.end();
            }
          });

          document.body.appendChild(stopButton);
          stopButtonRef.current = stopButton;

          // حذف دکمه هنگام پایان session
          const onSessionEnd = () => {
            if (stopButtonRef.current) {
              stopButtonRef.current.remove();
              stopButtonRef.current = null;
            }
          };

          rendererRef.current?.xr.addEventListener("sessionend", onSessionEnd);
        };

        // هندل کردن شروع session
        renderer.xr.addEventListener("sessionstart", () => {
          xrSessionRef.current = renderer.xr.getSession();
          showStopButton();
        });

        // در حالت dev هم دکمه نشان داده شود
        if (process.env.NODE_ENV === "development") {
          showStopButton();
        }
      },
      undefined,
      (error) => {
        console.error("خطا در بارگذاری مدل:", error);
        setError("خطا در بارگذاری مدل زمین");
        setLoading(false);
      }
    );

    // هندل تغییر سایز پنجره
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onResize);

    // پاکسازی session هنگام خروج
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
      window.location.reload();
    });

    return () => {
      window.removeEventListener("resize", onResize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      if (stopButtonRef.current) {
        stopButtonRef.current.remove();
      }
    };
  }, [hasStarted]);
  return (
    <section>
      {/* لودینگ و خطا */}
      {loading && <ARLoading />}
      {error && <ARError error={error} />}
      <div id="ar-view" className="w-full h-full" />
      {/* دکمه AR */}
      <div
        id="ar-button-container"
        className="w-full fixed bottom-0 left-0"
      ></div>
    </section>
  );
}
