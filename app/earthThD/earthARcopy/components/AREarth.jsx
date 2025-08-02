"use client";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { ARButton } from "three/addons/webxr/ARButton.js";

export default function AREarth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [arSupported, setArSupported] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [windowsDimention, setWindowsDimention] = useState([0, 0]);

  const xrSessionRef = useRef(null);
  const stopButtonRef = useRef(null);
  const sceneRef = useRef(null);
  const earthRef = useRef(null);
  const rendererRef = useRef(null);
  const hitTestSourceRef = useRef(null);
  const hitTestSourceRequestedRef = useRef(false);
  const reticleRef = useRef(null);

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
        if (!supported)
          setError("دستگاه شما از واقعیت افزوده پشتیبانی نمی‌کند.");
      } catch (err) {
        setArSupported(false);
        setError("بررسی پشتیبانی AR با خطا مواجه شد.");
      }
    };

    checkARSupport();
  }, []);

  useEffect(() => {
    if (arSupported !== true) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.xr.enabled = true;
    rendererRef.current = renderer;

    const arButton = ARButton.createButton(renderer, {
      requiredFeatures: ["hit-test"],
      optionalFeatures: ["dom-overlay"],
      domOverlay: { root: document.body },
    });

    Object.assign(arButton.style, {
      minWidth: "fit-content",
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

    const btnContainer = document.getElementById("ar-button-container");
    if (btnContainer) btnContainer.appendChild(arButton);

    const onClick = () => setHasStarted(true);
    arButton.addEventListener("click", onClick);

    return () => {
      arButton.removeEventListener("click", onClick);
      if (arButton.parentNode) arButton.parentNode.removeChild(arButton);
      renderer.dispose();
    };
  }, [arSupported]);

  useEffect(() => {
    if (!hasStarted) return;

    const bg = document.getElementById("background-images");
    if (bg) bg.style.display = "none";

    setLoading(true);

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      20
    );

    const renderer = rendererRef.current;
    renderer.setSize(window.innerWidth, window.innerHeight);

    const container = document.getElementById("ar-view");
    if (container) container.appendChild(renderer.domElement);

    // نورپردازی
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 3);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    // ایجاد رتیکل پیشرفته‌تر برای نمایش سطح تشخیص داده شده
    const reticle = new THREE.Mesh(
      new THREE.RingGeometry(0.1, 0.2, 32).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.8,
      })
    );
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    scene.add(reticle);
    reticleRef.current = reticle;

    // تابع برای درخواست Hit-Test
    const requestHitTestSource = async (session) => {
      try {
        const referenceSpace = await session.requestReferenceSpace("viewer");
        const hitTestSource = await session.requestHitTestSource({
          space: referenceSpace,
          entityTypes: ["plane", "estimated-plane"], // تشخیص هم سطوح تخت و هم تخمینی
        });

        hitTestSourceRef.current = hitTestSource;
        hitTestSourceRequestedRef.current = true;

        // فعال کردن تشخیص مداوم سطوح
        session.requestReferenceSpace("local").then((localSpace) => {
          session.updateRenderState({
            baseLayer: new XRWebGLLayer(session, renderer.context),
            depthFar: 20,
            depthNear: 0.1,
            inlineVerticalFieldOfView: true,
            space: localSpace,
          });
        });
      } catch (error) {
        console.error("Error setting up hit test:", error);
      }
    };

    // تابع اصلی انیمیشن با قابلیت تشخیص سطح بهبود یافته
    const animate = (timestamp, frame) => {
      if (frame && earthRef.current && reticleRef.current) {
        const hitTestResults = hitTestSourceRef.current
          ? frame.getHitTestResults(hitTestSourceRef.current)
          : [];

        if (hitTestResults.length > 0) {
          const hit = hitTestResults[0];
          const pose = hit.getPose(renderer.xr.getReferenceSpace());

          if (pose) {
            // نمایش رتیکل در محل تشخیص سطح
            reticleRef.current.visible = true;
            reticleRef.current.matrix.fromArray(pose.transform.matrix);

            // قرار دادن مدل زمین روی سطح تشخیص داده شده
            earthRef.current.visible = true;
            earthRef.current.position.setFromMatrixPosition(
              reticleRef.current.matrix
            );
            earthRef.current.rotation.y += 0.002;

            // تنظیم جهت مدل متناسب با سطح
            const rotation = new THREE.Quaternion();
            rotation.setFromRotationMatrix(reticleRef.current.matrix);
            earthRef.current.quaternion.copy(rotation);
          }
        } else {
          reticleRef.current.visible = false;
          earthRef.current.visible = false;
        }
      }
      renderer.render(scene, camera);
    };

    // بارگذاری مدل زمین
    const loader = new GLTFLoader();
    loader.load(
      "/ar-earth/earth.glb",
      (gltf) => {
        const earth = gltf.scene;
        earth.scale.set(0.07, 0.07, 0.07);
        earth.visible = false; // ابتدا مدل مخفی است
        scene.add(earth);
        earthRef.current = earth;
        setLoading(false);

        // شروع انیمیشن پس از بارگذاری مدل
        renderer.setAnimationLoop(animate);

        // تنظیم Hit-Test هنگام شروع session
        renderer.xr.addEventListener("sessionstart", (event) => {
          xrSessionRef.current = event.session;
          requestHitTestSource(event.session);
        });
      },
      undefined,
      (error) => {
        console.error("خطا در بارگذاری مدل:", error);
        setError("خطا در بارگذاری مدل زمین");
        setLoading(false);
      }
    );

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onResize);

    renderer.xr.addEventListener("sessionend", () => {
      renderer.setAnimationLoop(null);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      setHasStarted(false);
    });

    return () => {
      window.removeEventListener("resize", onResize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [hasStarted]);

  return (
    <section>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <div id="ar-view" className="w-full h-full z-50" />
      <div
        id="ar-button-container"
        className="w-full fixed bottom-0 left-0 z-50"
      ></div>
    </section>
  );
}
