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
    <main className="w-full flex flex-col bg-mybg/96">
      {/* دکمه برگشت */}
      <BackButton pathName="/menu" />

      <div className="bg-mybg/96">
        <div className="mx-auto py-[15px] px-4 fixed  flex items-center justify-between bg-mybg/96">
          <button
            onClick={startModel}
            className="w-fit px-4 text-black h-12 bg-myorange rounded-2xl border-2 border-myorangeLight font-iranyekan text-xl active:translate-y-[2px] active:scale-95 transition-all duration-100 shadow-[0px_0px_20px_black]"
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
        <button
          onClick={() => {
            setVisibleModal(false);
          }}
          className="fixed bottom-4 left-4 flex justify-center items-center w-12 pr-1 aspect-square bg-myred rounded-full border-2 border-myorangeLight active:translate-y-[2px] active:scale-95 transition-all duration-100 shadow-[0px_0px_20px_black]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={4}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={4}
              d="M15 19l-7-7 7-7"
            />
          </svg>{" "}
        </button>
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
            className="fixed bottom-4 w-fit -translate-x-5 px-4 text-black h-12 bg-myorange rounded-2xl border-2 border-myorangeLight font-iranyekan text-xl active:translate-y-[2px] active:scale-95 transition-all duration-100 shadow-[0px_0px_20px_black]"
          >
            شروع واقعیت افزوده
          </button>
          {/* @ts-ignore */}
        </model-viewer>
      </div>
    </main>
  );
}
