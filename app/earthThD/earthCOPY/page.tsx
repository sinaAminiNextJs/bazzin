"use client";

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
    <main className="w-full flex flex-col ">
      <div className="w-full h-[300px] relative">
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col p-3 bg-[#00000052] z-[3]"></div>
      </div>
      <span className="w-full h-[40px] flex z-[4] bg-res-50 -mt-[30px] rounded-t-[30px]" />
      <div className="flex flex-col px-3 pb-[80px]">
        <h1 className="text-res-75 font-bold">FRESH MEAT</h1>
        <span className="text-sm text-res-75 mt-1">Our best pizza</span>
        <div className="w-full flex items-center justify-between my-3">
          <div className="flex items-center">ستاره</div>
          <span className="font-bold text-xl">25$</span>
        </div>
        <span className="text-sm text-res-75 text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas
          purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris
          rhoncus aenean vel elit scelerisque. In egestas erat imperdiet sed
          euismod nisi porta lorem mollis. Morbi tristique senectus et netus.
          Mattis pellentesque id nibh tortor id aliquet lectus proin.
        </span>
        <div className="max-w-md  mx-auto left-0 right-0 bottom-0 py-[15px] px-4 fixed  flex items-center justify-between z-[4] bg-res-50">
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
          <button slot="ar-button" id="ar-button">
            View in your space
          </button>
          {/* @ts-ignore */}
        </model-viewer>
      </div>
    </main>
  );
}

let data = [
  {
    title: "FOOD",
    id: "food",
  },
  {
    title: "DRINKS",
    id: "drinks",
  },
  {
    title: "DESRTS",
    id: "desrts",
  },
];
