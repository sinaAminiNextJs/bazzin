"use client";
import { useRef, useState } from "react";
import GlobeComponent from "./components/Globe";
import DayNightToggle from "./components/DayNightToggle";
import { useAuthCheck } from "@/lib/hooks/useAuthCheck";
import BackButton from "../components/BackButton";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [isDay, setIsDay] = useState(true);
  const router = useRouter();
  useAuthCheck();
  const [visibleModel, setVisibleModal] = useState<boolean>(false);
  const modelRef: any = useRef(null);

  const startModel = () => {
    setVisibleModal(true);
    modelRef?.current?.dismissPoster();
  };
  return (
    <>
      <button
        className="fixed w-full top-4 left-4 flex justify-end z-10"
        onClick={() => router.push("/earthThD/AR-Description")}
      >
        <img
          src="/clipart/qustion.png"
          alt="question button"
          className="w-10"
        />
      </button>
      <GlobeComponent isDay={isDay} />
      <DayNightToggle onToggle={setIsDay} />
      <article className="w-full mx-auto fixed bottom-4 px-20 flex items-center">
        <button
          // onClick={() => router.push("/earthThD/earthAR/")}
          onClick={startModel}
          className="w-full text-black h-12 bg-myorange rounded-2xl border-2 border-myorangeLight font-iranyekan text-xl active:translate-y-[2px] active:scale-95 transition-all duration-100 shadow-[0px_0px_20px_black]"
        >
          واقعیت افزوده (AR){" "}
        </button>
      </article>
      {/* back button */}
      <BackButton pathName="/menu" />
      {/* AR */}
      <div
        className={`fixed left-0 right-0 bottom-0 mx-auto bg-white shadow transition-all z-[10] duration-500 flex flex-col ${
          visibleModel ? "top-0 visible min-h-full" : "top-[100%] invisible"
        }`}
      >
        <button
          onClick={() => {
            setVisibleModal(false);
          }}
          className="fixed bottom-4 left-4 flex justify-center items-center w-12 pr-1 aspect-square bg-myred rounded-full border-2 border-myorangeLight active:translate-y-[2px] active:scale-95 transition-all duration-100 shadow-[0px_0px_20px_black] z-20"
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
          scale={"0.05 0.05 0.05"}
          ref={modelRef}
        >
          <button
            slot="ar-button"
            id="ar-button"
            className="fixed bottom-4 right-1/6 w-[220px] px-4 text-black h-12 bg-myorange rounded-2xl border-2 border-myorangeLight font-iranyekan text-xl active:translate-y-[2px] active:scale-95 transition-all duration-100 shadow-[0px_0px_20px_black]"
          >
            شروع واقعیت افزوده
          </button>
          {/* @ts-ignore */}
        </model-viewer>
      </div>
    </>
  );
}
