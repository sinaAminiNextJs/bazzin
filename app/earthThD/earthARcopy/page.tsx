"use client";
import BackButton from "@/app/components/BackButton";
import AREarth from "./components/AREarth";
import { useRef, useState } from "react";

// شروع تابع اصلی کامپوننت
export default function ARPage() {
  const [visibleModel, setVisibleModal] = useState<boolean>(false);
  const modelRef: any = useRef(0);

  const startModel = () => {
    setVisibleModal(true);
    modelRef?.current?.dismissPoster();
  };
  return (
    <>
      <section
        id="background-images"
        className="relative overflow-hidden w-full min-h-screen text-white flex flex-col items-center bg-mybg/96"
      >
        {/* پس‌زمینه‌های تصویری */}
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
        {/* @ts-ignore */}
        <model-viewer
          ar
          modes="scene-viewer quick-look webxr"
          src={"/ar-earth/earth1.glb"} // AR Android/Web
          // ios-src={"/model/pizza.usdz"} // AR iOS
          touch-action="pan-y"
          reveal="manual"
          auto-rotate
          shadow-intensity="1"
          camera-controls
          style={{ width: "100%", height: "100%" }}
          ref={modelRef}
        >
          <button slot="ar-button" id="ar-button">
            View in your space
          </button>
          {/* @ts-ignore */}
        </model-viewer>
        <button
          onClick={startModel}
          className="fixed top-0 w-[200px] h-[40px] rounded-full flex items-center justify-center text-white bg-res-100 text-sm"
        >
          View Ar
        </button>

        {/* دکمه برگشت */}
        <BackButton pathName="/menu" />
      </section>
    </>
  );
}
