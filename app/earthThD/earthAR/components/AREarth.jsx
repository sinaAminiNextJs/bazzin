// // importهای ضروری برای سه‌بعدی‌سازی و AR
// "use client";
// import { useEffect, useState, useRef } from "react";
// import * as THREE from "three";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// import { ARButton } from "three/addons/webxr/ARButton.js";

// // کامپوننت‌های رابط کاربری
// import ARLoading from "./ARLoading";
// import ARError from "./ARError";

// // شروع تابع اصلی کامپوننت
// export default function AREarth() {
//   // state‌ها برای مدیریت وضعیت‌های مختلف
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [arSupported, setArSupported] = useState<boolean | null>(null);
//   const [hasStarted, setHasStarted] = useState(false);
//   // اندازه پنجره برای تنظیم ابعاد renderer
//   const [windowsDimention, setWindowsDimention] = useState<[number, number]>([
//     0, 0,
//   ]);

//   // refها برای نگهداری session و سایر آبجکت‌های three.js
//   const xrSessionRef = useRef<XRSession | null>(null);
//   const stopButtonRef = useRef<HTMLButtonElement | null>(null);
//   // مراجع به عناصر صحنه، مدل زمین و رندرر
//   const sceneRef = useRef<THREE.Scene | null>(null);
//   const earthRef = useRef<THREE.Group | null>(null);
//   const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

//   useEffect(() => {
//     setWindowsDimention([window.innerWidth, window.innerHeight]);

//     const checkARSupport = async () => {
//       if (!navigator.xr) {
//         setArSupported(false);
//         setError("WebXR توسط مرورگر شما پشتیبانی نمی‌شود.");
//         return;
//       }

//       try {
//         const supported = await navigator.xr.isSessionSupported("immersive-ar");
//         setArSupported(supported);

//         if (!supported) {
//           setError("دستگاه شما از واقعیت افزوده پشتیبانی نمی‌کند.");
//         }
//       } catch (err) {
//         setArSupported(false);
//         setError("بررسی پشتیبانی AR با خطا مواجه شد.");
//       }
//     };

//     checkARSupport();
//   }, []);

//   let touchStartDistance = 0;
//   let touchStartPos = { x: 0, y: 0 };

//   useEffect(() => {
//     // اضافه کردن تعامل لمسی
//     const handleTouchStart = (event: any) => {
//       if (event.touches.length === 2) {
//         const touch1 = event.touches[0];
//         const touch2 = event.touches[1];
//         touchStartDistance = Math.sqrt(
//           Math.pow(touch2.clientX - touch1.clientX, 2) +
//             Math.pow(touch2.clientY - touch1.clientY, 2)
//         );
//       }
//     };

//     const handleTouchMove = (event: any) => {
//       if (event.touches.length === 2) {
//         const touch1 = event.touches[0];
//         const touch2 = event.touches[1];
//         const newDistance = Math.sqrt(
//           Math.pow(touch2.clientX - touch1.clientX, 2) +
//             Math.pow(touch2.clientY - touch1.clientY, 2)
//         );

//         // مقیاس مدل زمین بر اساس فاصله تغییر کند
//         if (earthRef.current) {
//           const scaleFactor = newDistance / touchStartDistance;
//           earthRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
//         }
//       }
//     };

//     const handleTouchEnd = (event: any) => {
//       if (event.touches.length < 2) {
//         touchStartDistance = 0;
//       }
//     };

//     const handleTouchStartRotation = (event: any) => {
//       if (event.touches.length === 1) {
//         touchStartPos = {
//           x: event.touches[0].clientX,
//           y: event.touches[0].clientY,
//         };
//       }
//     };

//     const handleTouchMoveRotation = (event: any) => {
//       if (event.touches.length === 1) {
//         const dx = event.touches[0].clientX - touchStartPos.x;
//         // const dy = event.touches[0].clientY - touchStartPos.y;

//         // چرخش مدل زمین بر اساس حرکت انگشت
//         if (earthRef.current) {
//           earthRef.current.rotation.y += dx * 0.005; // حساسیت چرخش
//           // earthRef.current.rotation.x += dy * 0.005; // حساسیت چرخش
//         }

//         // بروزرسانی موقعیت اولیه انگشت
//         touchStartPos = {
//           x: event.touches[0].clientX,
//           y: event.touches[0].clientY,
//         };
//       }
//     };

//     // اضافه کردن رویدادهای لمسی
//     window.addEventListener("touchstart", handleTouchStart);
//     window.addEventListener("touchmove", handleTouchMove);
//     window.addEventListener("touchend", handleTouchEnd);
//     window.addEventListener("touchstart", handleTouchStartRotation);
//     window.addEventListener("touchmove", handleTouchMoveRotation);

//     // پاکسازی رویدادها هنگام unmount
//     return () => {
//       window.removeEventListener("touchstart", handleTouchStart);
//       window.removeEventListener("touchmove", handleTouchMove);
//       window.removeEventListener("touchend", handleTouchEnd);
//       window.removeEventListener("touchstart", handleTouchStartRotation);
//       window.removeEventListener("touchmove", handleTouchMoveRotation);
//     };
//   }, []); // خالی بودن این آرایه باعث می‌شود که فقط یکبار کد اجرا شود

//   useEffect(() => {
//     if (arSupported !== true) return;

//     // ساخت رندرر سه‌بعدی
//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.xr.enabled = true;
//     rendererRef.current = renderer;

//     // ساخت دکمه شروع AR
//     var arButton = ARButton.createButton(renderer, {
//       requiredFeatures: ["hit-test"],
//       optionalFeatures: ["dom-overlay", "dom-overlay-for-handheld-ar"],
//       domOverlay: { root: document.body },
//     });
//     // اعمال استایل سفارشی به دکمه
//     Object.assign(arButton.style, {
//       minWidth: "fit-content",
//       opacity: "1",
//       position: "fixed",
//       bottom: "20px",
//       left: "20px",
//       padding: "8px 32px",
//       backgroundColor: "#ffc585",
//       color: "#000",
//       borderRadius: "1rem",
//       border: "2px solid #fff7c4",
//       fontFamily: "iranyekan, sans-serif",
//       fontSize: "1.25rem",
//       boxShadow: "0 0 20px rgba(0, 0, 0, 0.6)",
//       cursor: "pointer",
//       zIndex: "11000",
//     });

//     // اضافه کردن به container
//     const btnContainer = document.getElementById("ar-button-container");
//     if (btnContainer) {
//       btnContainer.appendChild(arButton);
//     } else {
//       alert("مشکلی در نمایش دکمه شروع پیش آمده");
//       // document.body.appendChild(arButton);
//     }

//     // زمانی که دکمه کلیک شد، AR شروع شود
//     const onClick = () => {
//       setHasStarted(true);
//     };
//     arButton.addEventListener("click", onClick);

//     // پاکسازی هنگام unmount شدن
//     return () => {
//       arButton.removeEventListener("click", onClick);
//       if (arButton.parentNode) arButton.parentNode.removeChild(arButton);
//       renderer.dispose();
//       rendererRef.current = null;
//     };
//   }, [arSupported]);

//   useEffect(() => {
//     if (!hasStarted) return;

//     // حذف بکگراند
//     const bg = document.getElementById("background-images");
//     if (bg) bg.style.display = "none";

//     setLoading(true);

//     const scene = new THREE.Scene();
//     sceneRef.current = scene;

//     // ساخت دوربین
//     const camera = new THREE.PerspectiveCamera(
//       90,
//       window.innerWidth / window.innerHeight,
//       0.01,
//       20
//     );
//     camera.position.set(0, 0, 5);

//     // گرفتن رندرر از ref و تنظیم سایز
//     const renderer = rendererRef.current!;
//     renderer.setSize(window.innerWidth, window.innerHeight);

//     // اضافه کردن canvas به DOM
//     const container = document.getElementById("ar-view");
//     if (container) container.appendChild(renderer.domElement);

//     // نورپردازی
//     const ambientLight = new THREE.AmbientLight(0xffffff, 1);
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//     directionalLight.position.set(1, 1, 1);
//     scene.add(ambientLight, directionalLight);

//     // بارگذاری مدل glTF زمین
//     const loader = new GLTFLoader();
//     loader.load(
//       "/ar-earth/earth.glb",

//       (gltf) => {
//         const earth = gltf.scene;
//         earth.scale.set(0.07, 0.07, 0.07);
//         earth.rotation.y = Math.PI / 2;
//         scene.add(earth);
//         earthRef.current = earth;

//         setLoading(false);

//         // تنظیم موقعیت مدل نسبت به دوربین فقط یک بار
//         if (earthRef.current) {
//           // موقعیت مدل را نسبت به دوربین تنظیم می‌کنیم (3 واحد جلوتر)
//           earthRef.current.position.set(0, 0, -3); // مدل 3 واحد از دوربین فاصله دارد
//         }
//         // انیمیشن چرخش زمین
//         renderer.setAnimationLoop(() => {
//           if (earthRef.current) {
//             earthRef.current.rotation.y += 0.002;
//           }
//           renderer.render(scene, camera);
//         });

//         // دکمه توقف AR
//         const showStopButton = () => {
//           // حذف دکمه قبلی
//           if (stopButtonRef.current) {
//             stopButtonRef.current.remove();
//           }

//           // ایجاد دکمه جدید
//           const stopButton = document.createElement("button");
//           Object.assign(stopButton.style, {
//             // استایل سفارشی
//           });

//           stopButton.addEventListener("click", () => {
//             if (rendererRef.current?.xr.getSession()) {
//               rendererRef.current.xr.getSession()?.end();
//             }
//           });

//           document.body.appendChild(stopButton);
//           stopButtonRef.current = stopButton;

//           // حذف دکمه هنگام پایان session
//           const onSessionEnd = () => {
//             if (stopButtonRef.current) {
//               stopButtonRef.current.remove();
//               stopButtonRef.current = null;
//             }
//           };

//           rendererRef.current?.xr.addEventListener("sessionend", onSessionEnd);
//         };

//         // هندل کردن شروع session
//         renderer.xr.addEventListener("sessionstart", () => {
//           xrSessionRef.current = renderer.xr.getSession();
//           showStopButton();
//         });

//         // در حالت dev هم دکمه نشان داده شود
//         if (process.env.NODE_ENV === "development") {
//           showStopButton();
//         }
//       },
//       undefined,
//       (error) => {
//         console.error("خطا در بارگذاری مدل:", error);
//         setError("خطا در بارگذاری مدل زمین");
//         setLoading(false);
//       }
//     );

//     // هندل تغییر سایز پنجره
//     const onResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };

//     window.addEventListener("resize", onResize);

//     // پاکسازی session هنگام خروج
//     renderer.xr.addEventListener("sessionend", () => {
//       renderer.setAnimationLoop(null);
//       if (earthRef.current && sceneRef.current) {
//         sceneRef.current.remove(earthRef.current);
//         earthRef.current = null;
//       }
//       if (container && renderer.domElement.parentNode === container) {
//         container.removeChild(renderer.domElement);
//       }
//       renderer.dispose();
//       rendererRef.current = null;
//       sceneRef.current = null;
//       setHasStarted(false);
//       window.location.reload();
//     });

//     return () => {
//       window.removeEventListener("resize", onResize);
//       if (rendererRef.current) {
//         rendererRef.current.dispose();
//         rendererRef.current = null;
//       }
//       if (stopButtonRef.current) {
//         stopButtonRef.current.remove();
//       }
//     };
//   }, [hasStarted]);

//   return (
//     <section>
//       {/* لودینگ و خطا */}
//       {loading && <ARLoading />}
//       {error && <ARError error={error} />}
//       <div id="ar-view" className="w-full h-full z-50" />
//       {/* دکمه AR */}
//       <div
//         id="ar-button-container"
//         className="w-full fixed bottom-0 left-0 z-50"
//       ></div>
//     </section>
//   );
// }
///////////////
"use client";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { ARButton } from "three/addons/webxr/ARButton.js";
import ARLoading from "./ARLoading";
import ARError from "./ARError";

export default function AREarth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [arSupported, setArSupported] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const earthModelRef = useRef(null); // فقط مدل را ذخیره می‌کنیم، نه نمونه ای از آن در صحنه
  const reticleRef = useRef(null);
  const hitTestSourceRef = useRef(null);
  const hitTestSourceRequested = useRef(false);

  useEffect(() => {
    const checkARSupport = async () => {
      if (!navigator.xr) {
        setArSupported(false);
        setError("WebXR not supported by your browser.");
        return;
      }

      try {
        const supported = await navigator.xr.isSessionSupported("immersive-ar");
        setArSupported(supported);
      } catch (err) {
        setArSupported(false);
        setError("Error checking AR support.");
      }
    };

    checkARSupport();
  }, []);

  useEffect(() => {
    if (arSupported === false) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.xr.enabled = true;
    rendererRef.current = renderer;

    const arButton = ARButton.createButton(renderer, {
      requiredFeatures: ["hit-test"],
      onSessionStart: () => {
        setHasStarted(true);
      },
      onSessionEnd: () => {
        setHasStarted(false);
      },
    });
    document.body.appendChild(arButton);

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.01,
      20
    );
    camera.position.set(0, 0, 5);

    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // فقط مدل را بارگذاری می‌کنیم اما به صحنه اضافه نمی‌کنیم
    const loader = new GLTFLoader();
    loader.load("/ar-earth/earth.glb", (gltf) => {
      const earth = gltf.scene;
      earth.scale.set(0.07, 0.07, 0.07);
      earth.rotation.y = Math.PI / 2;
      earthModelRef.current = earth; // ذخیره مدل برای استفاده بعدی
    });

    const reticle = new THREE.Mesh(
      new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial()
    );
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    reticleRef.current = reticle;
    scene.add(reticle);

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener("resize", onWindowResize);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate(timestamp, frame) {
      if (frame) {
        const referenceSpace = renderer.xr.getReferenceSpace();
        const session = renderer.xr.getSession();

        if (!hitTestSourceRequested.current) {
          session.requestReferenceSpace("viewer").then((referenceSpace) => {
            session
              .requestHitTestSource({ space: referenceSpace })
              .then((source) => {
                hitTestSourceRef.current = source;
              });
          });

          session.addEventListener("end", () => {
            hitTestSourceRequested.current = false;
            hitTestSourceRef.current = null;
          });

          hitTestSourceRequested.current = true;
        }

        if (hitTestSourceRef.current) {
          const hitTestResults = frame.getHitTestResults(
            hitTestSourceRef.current
          );

          if (hitTestResults.length) {
            const hit = hitTestResults[0];
            reticle.visible = true;
            reticle.matrix.fromArray(
              hit.getPose(referenceSpace).transform.matrix
            );
          } else {
            reticle.visible = false;
          }
        }
      }

      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);

    return () => {
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose();
      rendererRef.current = null;
    };
  }, [arSupported]);

  useEffect(() => {
    if (!hasStarted || !earthModelRef.current) return;

    const placeEarth = () => {
      if (reticleRef.current.visible && earthModelRef.current) {
        // یک کپی از مدل اصلی ایجاد می‌کنیم
        const earth = earthModelRef.current.clone();
        reticleRef.current.matrix.decompose(
          earth.position,
          earth.quaternion,
          earth.scale
        );
        sceneRef.current.add(earth);
      }
    };

    // رویدادهای تاچ
    const onTap = (event) => {
      alert("selected");

      placeEarth();
    };

    // رویدادهای کنترلر
    const onSelect = () => {
      placeEarth();
    };
    const buttonn = document.getElementById("but");
    buttonn.addEventListener("touchend", onTap);

    const controller1 = rendererRef.current.xr.getController(0);
    controller1.addEventListener("select", onSelect);
    sceneRef.current.add(controller1);

    const controller2 = rendererRef.current.xr.getController(1);
    controller2.addEventListener("select", onSelect);
    sceneRef.current.add(controller2);

    return () => {
      window.removeEventListener("touchend", onTap);
      if (rendererRef.current) {
        controller1.removeEventListener("select", onSelect);
        controller2.removeEventListener("select", onSelect);
      }
    };
  }, [hasStarted]);

  return (
    <section className="overflow-hidden">
      {loading && <ARLoading />}
      {error && <ARError error={error} />}
      <div id="ar-view" className="w-full h-full z-50" />
      <button id="but" className="w-20 h-20 bg-amber-300 z-50">
        tap
      </button>
    </section>
  );
}
