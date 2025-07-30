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

// کامپوننت‌های رابط کاربری
import ARLoading from "./ARLoading";
import ARError from "./ARError";
// import WebXRPolyfill from "webxr-polyfill";

export default function AREarth() {
  // state‌ها برای مدیریت وضعیت‌های مختلف
  const [loading, setLoading] = useState(false);
  const [loadingMessege, setLoadingMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [arSupported, setArSupported] = useState<boolean | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  // اندازه پنجره برای تنظیم ابعاد renderer
  const [windowsDimention, setWindowsDimention] = useState<[number, number]>([
    0, 0,
  ]);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);

  // ref‌ها برای نگهداری session و سایر آبجکت‌های three.js
  const xrSessionRef = useRef<XRSession | null>(null);
  const stopButtonRef = useRef<HTMLButtonElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const earthRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const hitTestSourceRef = useRef<XRHitTestSource | undefined>(undefined); // Store the hitTestSource in a ref

  useEffect(() => {
    setWindowsDimention([window.innerWidth, window.innerHeight]);
    setLoading(true);
    setLoadingMessage("در حال بررسی امکانات سخت افزاری شما");
    // Check AR support
    const checkARSupport = async () => {
      if (!navigator.xr) {
        setLoading(false);
        setArSupported(false);
        setError("WebXR توسط مرورگر شما پشتیبانی نمی‌شود.");
        alert("WebXR توسط مرورگر شما پشتیبانی نمی‌شود.");
        return;
      }

      try {
        const supported = await navigator.xr.isSessionSupported("immersive-ar");
        setArSupported(supported);
        if (!supported) {
          setLoading(false);
          setError("دستگاه شما از واقعیت افزوده پشتیبانی نمی‌کند.");
          alert("دستگاه شما از واقعیت افزوده پشتیبانی نمی‌کند.");
        }
      } catch (err) {
        setLoading(false);
        setArSupported(false);
        setError("بررسی پشتیبانی AR با خطا مواجه شد.");
        alert("بررسی پشتیبانی AR با خطا مواجه شد.");
      }
      setLoading(false);
      setLoadingMessage("در حال بررسی امکانات سخت افزاری شما");
    };

    checkARSupport();
  }, []);
  let touchStartDistance = 0;
  let touchStartPos = { x: 0, y: 0 };
  useEffect(() => {
    // اضافه کردن تعامل لمسی
    const handleTouchStart = (event: any) => {
      if (event.touches.length === 2) {
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        touchStartDistance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
            Math.pow(touch2.clientY - touch1.clientY, 2)
        );
      }
    };

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
          const scaleFactor = newDistance / touchStartDistance;
          earthRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
        }
      }
    };

    const handleTouchEnd = (event: any) => {
      if (event.touches.length < 2) {
        touchStartDistance = 0;
      }
    };

    const handleTouchStartRotation = (event: any) => {
      if (event.touches.length === 1) {
        touchStartPos = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
      }
    };

    const handleTouchMoveRotation = (event: any) => {
      if (event.touches.length === 1) {
        const dx = event.touches[0].clientX - touchStartPos.x;
        // const dy = event.touches[0].clientY - touchStartPos.y;

        // چرخش مدل زمین بر اساس حرکت انگشت
        if (earthRef.current) {
          earthRef.current.rotation.y += dx * 0.005; // حساسیت چرخش
          // earthRef.current.rotation.x += dy * 0.005; // حساسیت چرخش
        }

        // بروزرسانی موقعیت اولیه انگشت
        touchStartPos = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
      }
    };

    // اضافه کردن رویدادهای لمسی
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchstart", handleTouchStartRotation);
    window.addEventListener("touchmove", handleTouchMoveRotation);

    // پاکسازی رویدادها هنگام unmount
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchstart", handleTouchStartRotation);
      window.removeEventListener("touchmove", handleTouchMoveRotation);
    };
  }, []); // خالی بودن این آرایه باعث می‌شود که فقط یکبار کد اجرا شود

  useEffect(() => {
    if (!arSupported || !hasStarted || !renderer) return;
    const initAR = async () => {
      try {
        // 1. بررسی پشتیبانی مرورگر
        if (!navigator.xr) {
          throw new Error("WebXR not supported");
        }

        // تنظیم رندرر
        renderer.setSize(window.innerWidth, window.innerHeight);
        const container = document.getElementById("ar-view");
        if (container) container.innerHTML = "";
        if (container) container.appendChild(renderer.domElement);

        // ایجاد صحنه
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        sceneRef.current = scene;

        // نورپردازی
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1);
        scene.add(ambientLight, directionalLight);

        // مدیریت session
        const startSession = async () => {
          try {
            const session = await navigator.xr!.requestSession("immersive-ar", {
              requiredFeatures: ["hit-test"],
              optionalFeatures: ["local-floor"],
            });

            let referenceSpace;
            try {
              referenceSpace = await session.requestReferenceSpace(
                "local-floor"
              );
            } catch (e) {
              console.warn("Using viewer reference space");
              referenceSpace = await session.requestReferenceSpace("viewer");
            }

            const hitTestSource = await session.requestHitTestSource!({
              space: referenceSpace,
            });
            hitTestSourceRef.current = hitTestSource;

            // بارگذاری مدل
            const loader = new GLTFLoader();
            loader.load(
              "/ar-earth/earth.glb",
              (gltf) => {
                const earth = gltf.scene;
                earth.scale.set(0.07, 0.07, 0.07);
                earth.rotation.y = Math.PI / 2;
                earth.visible = false;
                scene.add(earth);
                earthRef.current = earth;

                renderer.setAnimationLoop((time, frame) => {
                  if (!frame || !earthRef.current || !hitTestSourceRef.current)
                    return;

                  const hitTestResults = frame.getHitTestResults(
                    hitTestSourceRef.current
                  );
                  if (hitTestResults.length > 0) {
                    const pose = hitTestResults[0].getPose(referenceSpace);
                    if (pose) {
                      earthRef.current.position.set(
                        pose.transform.position.x,
                        pose.transform.position.y,
                        pose.transform.position.z
                      );
                      earthRef.current.visible = true;
                    }
                  }
                  earthRef.current.rotation.y += 0.002;
                  renderer.render(scene, camera);
                });
              },
              undefined,
              (error) => {
                console.error("Error loading model:", error);
                setError("Error loading Earth model");
                alert("Error loading Earth model");
              }
            );
          } catch (error) {
            console.error("Session error:", error);
            setError("Failed to start AR session");
            alert("Failed to start AR session");
          }
        };

        // اضافه کردن event listener فقط یکبار
        const button = document.getElementById("ar-start-button");

        if (button) {
          button.onclick = startSession;
        }

        // مدیریت تغییر سایز
        const onResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", onResize);

        return () => {
          window.removeEventListener("resize", onResize);
          const button = document.getElementById("ar-start-button");
          if (button) button.onclick = null;
        };
      } catch (error) {
        console.error("AR init error:", error);
        setError("AR initialization failed");
        alert("AR initialization failed");
      }
    };

    initAR();
  }, [arSupported, hasStarted, renderer]);

  useEffect(() => {
    if (arSupported !== true) return;
    setLoading(true);

    // ایجاد رندرر سه‌بعدی و فعال کردن WebXR
    const newRenderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    setRenderer(newRenderer); // استفاده از newRenderer برای جلوگیری از استفاده از renderer نال
    newRenderer.xr.enabled = true;
    rendererRef.current = newRenderer;

    // ساخت دکمه شروع AR
    const arButton = ARButton.createButton(newRenderer, {
      requiredFeatures: ["hit-test"],
      optionalFeatures: ["dom-overlay"],
      // optionalFeatures: ["dom-overlay", "dom-overlay-for-handheld-ar"],
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
    }

    // زمانی که دکمه کلیک شد، AR شروع شود
    const onClick = async () => {
      setHasStarted(true);
      const cameraButton = document.getElementById("ar-start-button");

      cameraButton!.style.display = "block";

      try {
        // درخواست دسترسی به دوربین
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        // اگر دسترسی داده شد، دستورات زیر اجرا می‌شود
        stream.getTracks().forEach((track) => track.stop()); // بستن دسترسی به دوربین پس از درخواست

        // تنظیم وضعیت دسترسی مجوز به دوربین
        setPermissionGranted(true);
        console.log("دوربین دسترسی داده شد!");

        // اقدامات بعدی که می‌خواهید انجام دهید
      } catch (error) {
        // اگر خطایی در دسترسی به دوربین رخ داد
        console.error("خطا در دریافت دسترسی دوربین:", error);
        alert("دسترسی به دوربین داده نشد.");
      }
      setLoading(false);
    };

    arButton.addEventListener("click", onClick);

    // پاکسازی هنگام unmount شدن
    return () => {
      arButton.removeEventListener("click", onClick);
      if (arButton.parentNode) arButton.parentNode.removeChild(arButton);
      newRenderer.dispose();
      rendererRef.current = null;
      sceneRef.current = null;
      setHasStarted(false);
      window.location.reload();
      alert("10. finish");
    };
  }, [arSupported]);

  return (
    <section>
      <script src="https://cdn.jsdelivr.net/npm/webxr-polyfill@latest/build/webxr-polyfill.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/webxr-api@latest/dist/webxr-api.js"></script>
      {/* لودینگ و خطا */}
      {loading && <ARLoading messege={loadingMessege} />}
      {error && <ARError error={error} />}
      <div id="ar-view" className="w-full h-full z-50" />
      <div id="ar-overlay" className="w-1/2 h-2/3 z-50" />

      {/* دکمه AR */}
      <div
        id="ar-button-container"
        className="w-full fixed bottom-0 left-0 z-50"
      ></div>
      <button
        className="fixed top-0 w-20 h-20 hidden bg-myblue z-50"
        id="ar-start-button"
      >
        Start Camera
      </button>
    </section>
  );
}
