"use client";
import BackButton from "@/app/components/BackButton";
import { useRef, useState } from "react";

interface ModelViewerElement extends HTMLElement {
  dismissPoster: () => void;
  scene?: any;
  // سایر متدها و properties اختصاصی
}

export default function ARPage() {
  const [showAR, setShowAR] = useState(false);
  const modelViewerRef = useRef<ModelViewerElement>(null);

  const startAR = () => {
    alert("کلیک شد");
    setShowAR(true);
    // نمایش مدل با تاخیر برای اطمینان از لود کامل
    setTimeout(() => {
      modelViewerRef.current?.dismissPoster?.();
    }, 300);
  };

  return (
    <section className="relative w-full min-h-screen text-white flex flex-col items-center bg-mybg/96">
      {/* پس‌زمینه */}
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
        className={`fixed left-0 right-0 bottom-0 max-w-md mx-auto bg-white shadow transition-all z-[10] px-10 duration-500 flex flex-col ${
          showAR ? "top-0 visible min-h-screen" : "top-[100%] invisible"
        }`}
      >
        <div className="w-full h-[50px] flex items-center justify-end px-3">
          <button
            onClick={() => {
              setShowAR(false);
            }}
          >
            بستن{" "}
          </button>
        </div>

        {/* @ts-ignore */}
        <model-viewer
          ref={modelViewerRef}
          ar
          ar-modes="scene-viewer quick-look webxr"
          src="/ar-earth/earth1.glb"
          // ios-src="/ar-earth/earth.usdz" // برای iOS
          camera-controls
          auto-rotate
          shadow-intensity="1"
          style={{ width: "100%", height: "100%", zIndex: "10" }}
          touch-action="pan-y"
          reveal="manual"
        >
          <button
            slot="ar-button"
            className="ar-button"
            style={{
              position: "absolute",
              bottom: "20px",
              padding: "12px 24px",
              borderRadius: "50px",
              background: "#4285f4",
              color: "white",
              border: "none",
              zIndex: "10",
            }}
          >
            View in AR
          </button>
          {/* @ts-ignore */}
        </model-viewer>
      </div>

      <button
        onClick={startAR}
        className="fixed top-10 z-50 w-[200px] h-[40px] rounded-full flex items-center justify-center text-white bg-res-100 text-sm"
      >
        Start AR Experience
      </button>

      <BackButton pathName="/menu" />
    </section>
  );
}
