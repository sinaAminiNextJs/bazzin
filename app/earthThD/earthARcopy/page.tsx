"use client";
import BackButton from "@/app/components/BackButton";
import { useRef, useState } from "react";

interface ModelViewerElement extends HTMLElement {
  dismissPoster: () => void;
  scene?: any;
  // سایر متدها و properties اختصاصی
}

export default function ARPage() {
  // const [showAR, setShowAR] = useState(false);
  const modelViewerRef = useRef<ModelViewerElement>(null);

  return (
    <section className="relative w-full min-h-screen text-white flex flex-col items-center bg-mybg/96 overflow-hidden">
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
        // ar-scale="fixed" // ثابت نگه داشتن مقیاس
        ar-placement="floor" // تشخیص سطوح
        interaction-prompt="none" // غیرفعال کردن prompt پیش‌فرض
        style={{ width: "100%", height: "100%", zIndex: "10" }}
        touch-action="pan-y"
        reveal="manual"
        scale="0.05 0.05 0.05" // تغییر مقیاس مدل به نصف
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
            left: "20px",
            transform: "translate(-50%, -50%)",
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
      <BackButton pathName="/menu" />
    </section>
  );
}
