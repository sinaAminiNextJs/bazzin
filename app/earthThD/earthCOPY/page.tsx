"use client";

import BackButton from "@/app/components/BackButton";
import Link from "next/link";
import { useRef, useState } from "react";

export default function Page({ params }: any) {
  const [visibleModel, setVisibleModal] = useState<boolean>(false);
  const modelRef: any = useRef(null);

  const startModel = () => {
    setVisibleModal(true);
    modelRef?.current?.dismissPoster();
  };

  return (
    <main className="w-full flex flex-col bg-mybg/96 ">
      {/* پس‌زمینه‌های تصویری */}
      {/* <div className="absolute top-0 left-0 -z-10 w-full h-screen">
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
      </div> */}
      {/* دکمه برگشت */}
      <BackButton pathName="/menu" />

      <div className="flex flex-col px-3 pb-[80px] bg-mybg/96">
        <div className="max-w-md mx-auto left-0 right-0 bottom-0 py-[15px] px-4 fixed  flex items-center justify-between z-[4] bg-res-50 bg-mybg/96">
          <button
            onClick={startModel}
            className="w-[200px] h-[40px] rounded-full flex items-center justify-center text-white bg-res-100 text-sm"
          >
            View Ar
          </button>
        </div>
      </div>
      <div
        className={`fixed left-0 right-0 bottom-0 max-w-md mx-auto bg-white shadow transition-all z-[10] px-10 duration-500 flex flex-col ${
          visibleModel ? "top-0 visible min-h-screen" : "top-[100%] invisible"
        }`}
      >
        <div className="w-full h-[50px]  flex items-center justify-end px-3">
          <button
            onClick={() => {
              setVisibleModal(false);
            }}
          >
            کلوز{" "}
          </button>
        </div>
        {/* @ts-ignore */}
        <model-viewer
          ar
          modes="scene-viewer quick-look webxr"
          src={"/ar-earth/earth.glb"}
          ios-src={"/model/pizza.usdz"} // AR iOS
          touch-action="pan-y"
          reveal="manual"
          auto-rotate
          shadow-intensity="1"
          camera-controls
          style={{ width: "100%", height: "100%" }}
          ref={modelRef}
        >
          <button
            slot="ar-button"
            id="ar-button"
            className="fixed bottom-4 w-fit px-4 text-black h-12 bg-myorange rounded-2xl border-2 border-myorangeLight font-iranyekan text-xl active:translate-y-[2px] active:scale-95 transition-all duration-100 shadow-[0px_0px_20px_black]"
          >
            شروع واقعیت افزوده
          </button>
          {/* @ts-ignore */}
        </model-viewer>
      </div>
    </main>
  );
}
