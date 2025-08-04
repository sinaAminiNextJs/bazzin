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
  // اندازه پنجره برای تنظیم ابعاد renderer
  const [windowsDimention, setWindowsDimention] = useState<[number, number]>([
    0, 0,
  ]);

  // refها برای نگهداری session و سایر آبجکت‌های three.js
  const xrSessionRef = useRef<XRSession | null>(null);
  const stopButtonRef = useRef<HTMLButtonElement | null>(null);
  // مراجع به عناصر صحنه، مدل زمین و رندرر
  const sceneRef = useRef<THREE.Scene | null>(null);
  const earthRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const reticleRef = useRef<THREE.Object3D | null>(null);
  const hitTestSourceRequested = useRef<boolean>(false);
  const hitTestSourceRef = useRef<XRHitTestSource>(null);

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

  let touchStartDistance = 0;
  let touchStartPos = { x: 0, y: 0 };
  let defaultScale = 0.01;
  //متغیر های تغییر مکان رتیکل
  const fixedDistance = 2.0; // فاصله ثابت ۲ متری
  let reticleYOffset = 0; // مقدار جابجایی عمودی
  const moveSensitivity = 0.05; // حساسیت حرکت
  useEffect(() => {
    // محاسبه نقطه شروع زوم تاچ
    const handleTouchStart = (event: any) => {
      if (event.touches.length === 2) {
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        //محاسبه فاصله دو تاچ
        touchStartDistance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
            Math.pow(touch2.clientY - touch1.clientY, 2)
        );
      }
    };
    //محاسبه تغییر فاصله زوم تاچ
    const handleTouchMove = (event: any) => {
      if (event.touches.length === 2) {
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const newDistance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
            Math.pow(touch2.clientY - touch1.clientY, 2)
        );

        // مقیاس مدل زمین بر اساس فاصله تغییر کند
        if (earthRef.current) {
          const scaleFactor =
            (newDistance * defaultScale) / (10 * touchStartDistance) +
            (9 * defaultScale) / 10; //کاهش تغییرات به یک دهم تغییر
          defaultScale = scaleFactor;
          earthRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
        }
      }
    };
    // پایان دادن به زوم تاچ
    const handleTouchEnd = (event: any) => {
      if (event.touches.length < 2) {
        touchStartDistance = 0;
      }
    };
    let startY = 0;

    const handleTouchStartForReticle = (event: any) => {
      if (event.touches.length === 1) {
        startY = event.touches[0].clientY;
      }
    };

    const handleTouchMoveForReticle = (event: any) => {
      if (event.touches.length === 1) {
        const deltaY = startY - event.touches[0].clientY;
        reticleYOffset += deltaY * moveSensitivity;
        startY = event.touches[0].clientY;
      }
    };

    // اضافه کردن رویدادهای لمسی
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchstart", handleTouchStartForReticle);
    window.addEventListener("touchmove", handleTouchMoveForReticle);

    // پاکسازی رویدادها هنگام unmount
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchstart", handleTouchStartForReticle);
      window.removeEventListener("touchmove", handleTouchMoveForReticle);
    };
  }, []); // خالی بودن این آرایه باعث می‌شود که فقط یکبار کد اجرا شود

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
    camera.position.set(0, 0, 5);

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

    // تشخیص سطح
    const reticle = new THREE.Mesh(
      new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial()
    );
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    reticleRef.current = reticle;
    scene.add(reticle);

    // بارگذاری مدل glTF زمین
    const loader = new GLTFLoader();
    loader.load(
      "/ar-earth/m1/untitled.gltf",

      (gltf) => {
        const earth = gltf.scene;
        earth.scale.set(defaultScale, defaultScale, defaultScale);
        earth.rotation.y = Math.PI / 2;
        scene.add(earth);
        earthRef.current = earth;

        setLoading(false);

        // تنظیم موقعیت مدل نسبت به دوربین فقط یک بار
        if (earthRef.current) {
          // موقعیت مدل را نسبت به دوربین تنظیم می‌کنیم (3 واحد جلوتر)
          earthRef.current.position.set(0, 0, -3); // مدل 3 واحد از دوربین فاصله دارد
        }
        async function animate(timestamp: number, frame: XRFrame) {
          if (frame) {
            const referenceSpace = renderer.xr.getReferenceSpace();
            const session = renderer.xr.getSession() as XRSession | null; // تایپ session را به صورت واضح مشخص می‌کنیم

            if (session && !hitTestSourceRequested.current) {
              try {
                // درخواست فضای مرجع برای "viewer"
                const referenceSpace = await session.requestReferenceSpace(
                  "viewer"
                );

                // درخواست HitTestSource با استفاده از عملگر اختیاری
                const hitTestSource = await session.requestHitTestSource?.({
                  space: referenceSpace,
                });

                if (hitTestSource) {
                  // ذخیره Source پس از دریافت آن
                  hitTestSourceRef.current = hitTestSource;
                } else {
                  console.warn("HitTestSource is not available");
                }
              } catch (error) {
                setError("Error in hit test source:" + error);
              }

              // اضافه کردن event listener برای پایان session
              session.addEventListener("end", () => {
                hitTestSourceRequested.current = false;
                hitTestSourceRef.current = null;
              });

              hitTestSourceRequested.current = true;
            }

            // بررسی اینکه hitTestSourceRef و hitTestSourceRef.current مقداردهی شده‌اند
            if (hitTestSourceRef.current) {
              const hitTestResults = frame.getHitTestResults(
                hitTestSourceRef.current
              );

              if (hitTestResults.length && referenceSpace) {
                const hit = hitTestResults[0];
                const pose = hit.getPose(referenceSpace);

                if (pose) {
                  // بررسی اینکه پوز مقداردهی شده است
                  reticle.visible = true;
                  reticle.matrix.fromArray(pose.transform.matrix); //  استفاده از ماتریکس زمانی که پوز موجود باشد
                  // محاسبه جهت بدون تغییر فاصله

                  const hitPosition = new THREE.Vector3().setFromMatrixPosition(
                    new THREE.Matrix4().fromArray(
                      Array.from(pose.transform.matrix)
                    )
                  );

                  const cameraPosition =
                    new THREE.Vector3().setFromMatrixPosition(
                      camera.matrixWorld
                    );
                  const direction = hitPosition.sub(cameraPosition).normalize();

                  // اعمال فاصله ثابت و جابجایی عمودی
                  const targetPosition = cameraPosition
                    .clone()
                    .add(direction.multiplyScalar(fixedDistance))
                    .add(new THREE.Vector3(0, reticleYOffset, 0));

                  reticle.position.copy(targetPosition);
                } else {
                  reticle.visible = false;
                }
              } else {
                reticle.visible = false;
              }
              // تابع برای قرار دادن مدل روی رتیکل
              function placeModelAtReticle() {
                if (!reticleRef.current || !earthRef.current) return;

                // ایجاد متغیرهای موقت
                const position = new THREE.Vector3();
                const quaternion = new THREE.Quaternion();
                const dummyScale = new THREE.Vector3(); // فقط برای دریافت داده

                // استخراج موقعیت و چرخش از رتیکل
                reticleRef.current.matrix.decompose(
                  position,
                  quaternion,
                  dummyScale
                );

                // اعمال روی مدل
                earthRef.current.position.copy(position);
                earthRef.current.quaternion.copy(quaternion);
              }
              if (hitTestResults.length && reticleRef.current?.visible) {
                // قرار دادن مدل هنگام تعامل کاربر
                if (earthRef.current) {
                  placeModelAtReticle();
                }
              }
            }
          }
          // انیمیشن چرخش زمین
          if (earthRef.current) {
            earthRef.current.rotation.y += 0.002;
          }
          renderer.render(scene, camera);
        }

        renderer.setAnimationLoop(animate);

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
      {loading && <ARLoading messege="loading" />}
      {error && <ARError error={error} />}
      <div id="ar-view" className="w-full h-full z-50" />
      {/* دکمه AR */}
      <div
        id="ar-button-container"
        className="w-full fixed bottom-0 left-0 z-50"
      ></div>
    </section>
  );
}
