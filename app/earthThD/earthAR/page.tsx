"use client";
import { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { ARButton } from "three/addons/webxr/ARButton.js";

export default function AREarth() {
  useEffect(() => {
    // Initialize scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      20
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    document.getElementById("ar-view")?.appendChild(renderer.domElement);

    // Add AR button
    document.body.appendChild(ARButton.createButton(renderer));

    // Add Earth model
    const loader = new GLTFLoader();
    loader.load(
      "/ar-earth/earth.glb", // You'll need to provide this model
      (gltf: any) => {
        const earth = gltf.scene;
        earth.scale.set(0.5, 0.5, 0.5);
        scene.add(earth);
      }
    );

    // Animation loop
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

    return () => {
      renderer.dispose();
    };
  }, []);

  return <div id="ar-view" style={{ width: "100%", height: "100vh" }} />;
}
