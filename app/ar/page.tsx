"use client";
import { useRef, useState } from "react";
import { useAuthCheck } from "@/lib/hooks/useAuthCheck";

export default function HomePage() {
  useAuthCheck();
  const [visibleModel, setVisibleModal] = useState<boolean>(false);
  const modelRef: any = useRef(null);

  const startModel = () => {
    setVisibleModal(true);
    modelRef?.current?.dismissPoster();
  };
  async function exportGLB() {
    const modelViewer = document.getElementById("static-model");
    // @ts-ignore
    const glTF = await modelViewer?.exportScene();
    const file = new File([glTF], "export.glb");
    const link = document.createElement("a");
    link.download = file.name;
    link.href = URL.createObjectURL(file);
    link.click();
  }
  return (
    <>
      <button onClick={startModel}>hi</button>
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
          ar-modes="scene-viewer quick-look webxr"
          src={"/ar-earth/m1/untitled.gltf"}
          ios-src={"/model/pizza.usdz"} // AR iOS
          touch-action="pan-y"
          reveal="manual"
          auto-rotate
          shadow-intensity="1"
          camera-controls
          style={{ width: "100%", height: "100%" }}
          scale={"0.01 0.01 0.01"}
          ref={modelRef}
          // ar-scale="fixed"
          ar-placement="floor"
          interaction-prompt="none"
        >
          <button
            slot="hotspot-export"
            onClick={() => exportGLB()}
            className="fixed bottom-20 left-4 bg-blue-500 text-white p-2 rounded"
          >
            Export GLB
          </button>

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
