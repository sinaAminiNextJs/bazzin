// components/ARScene.jsx
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import ARButton from "./ARButton";

export default function ARScene() {
  const mountRef = useRef(null);
  const earthRef = useRef(null);
  const rendererRef = useRef(null);
  const hitTestSourceRef = useRef(null);

  useEffect(() => {
    // تنظیمات اولیه
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      20
    );

    // رندرر
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // نورپردازی
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 3);
    scene.add(light);

    // بارگذاری مدل
    const loader = new GLTFLoader();
    loader.load(
      "/ar-earth/earth.glb",
      (gltf) => {
        earthRef.current = gltf.scene;
        earthRef.current.scale.set(0.07, 0.07, 0.07);
        earthRef.current.visible = false;
        scene.add(earthRef.current);
      },
      undefined,
      (error) => console.error("خطا در بارگذاری مدل:", error)
    );

    // Hit Test
    const reticle = new THREE.Mesh(
      new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0xffff00 })
    );
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    scene.add(reticle);

    // انیمیشن
    const animate = (timestamp, frame) => {
      if (frame && renderer.xr.isPresenting) {
        if (!hitTestSourceRef.current) {
          const session = renderer.xr.getSession();
          session.requestReferenceSpace("viewer").then((refSpace) => {
            session.requestHitTestSource({ space: refSpace }).then((source) => {
              hitTestSourceRef.current = source;
            });
          });
        }

        if (hitTestSourceRef.current && earthRef.current) {
          const hits = frame.getHitTestResults(hitTestSourceRef.current);
          if (hits.length > 0) {
            const hit = hits[0];
            reticle.visible = true;
            earthRef.current.visible = true;
            hit
              .getPose(renderer.xr.getReferenceSpace())
              .transform.matrix.decompose(
                earthRef.current.position,
                earthRef.current.quaternion,
                earthRef.current.scale
              );
          } else {
            reticle.visible = false;
            earthRef.current.visible = false;
          }
        }
      }
      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    // پاکسازی
    return () => {
      if (rendererRef.current) {
        rendererRef.current.setAnimationLoop(null);
        rendererRef.current.dispose();
      }
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="ar-scene">
      <div ref={mountRef} />
      <ARButton renderer={rendererRef} />
    </div>
  );
}
