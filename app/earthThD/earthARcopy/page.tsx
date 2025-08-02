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
    setShowAR(true);
    // نمایش مدل با تاخیر برای اطمینان از لود کامل
    setTimeout(() => {
      modelViewerRef.current?.dismissPoster?.();
    }, 300);
  };

  return (
    <section className="relative w-full min-h-screen text-white flex flex-col items-center bg-mybg/96 overflow-hidden">
      {/* پس‌زمینه */}
      <div
        className={`absolute top-0 left-0 -z-10 w-full h-screen  ${
          showAR ? "hidden" : "block"
        }`}
      >
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
        className={`absolute top-0 left-0 z-50 w-full h-screen mx-auto bg-white shadow transition-all flex flex-col items-center justify-center ${
          showAR ? "block" : "hidden"
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
          src="/ar-earth/earth1.glb" // Android / Web
          ios-src="/ar-earth/earth.usdz" // iOS
          camera-controls
          auto-rotate
          shadow-intensity="1"
          style={{ width: "100%", height: "100%", zIndex: "10" }}
          touch-action="pan-y"
          reveal="manual"
          scale="0.5 0.5 0.5" // تغییر مقیاس مدل به نصف
          camera-position="0 1.6 3" // تنظیم موقعیت دوربین
        >
          <div className="progress-bar hide" slot="progress-bar">
            <div className="update-bar"></div>
            <p>بارگذاری مدل. صبور باشید.</p>
          </div>
          <div id="error" className="hide">
            واقعیت افزوده در دستگاه شما پشتیبانی نمیشود
          </div>

          <button
            slot="ar-button"
            className="ar-button"
            style={{
              minWidth: "fit-content",
              opacity: "1",
              position: "fixed",
              bottom: "20px",
              marginRight: "auto",
              marginLeft: "auto",
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
            }}
          >
            شروع واقیعت افزوده{" "}
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
