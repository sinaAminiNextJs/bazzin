"use client";
import BackButton from "@/app/components/BackButton";

export default function ARPage() {
  return (
    <section className="relative w-full text-white flex justify-center items-center bg-mybg/96 overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full">
        {/* @ts-ignore */}
        <model-viewer
          ar
          ar-modes="scene-viewer quick-look webxr"
          src="/ar-earth/earth.glb"
          // ios-src="/ar-earth/earth.usdz"
          camera-controls
          auto-rotate
          shadow-intensity="1"
          ar-placement="floor"
          interaction-prompt="none"
          style={{ width: "100%", height: "100%", zIndex: "10" }}
          touch-action="pan-y"
          reveal="manual"
          camera-orbit="0deg 90deg 2m"
          field-of-view="30deg"
          min-camera-orbit="auto auto 0.1m"
          max-camera-orbit="auto auto 100m"
          scale="10 1 0.1"
        >
          <button
            slot="ar-button"
            className="ar-button"
            style={{
              minWidth: "fit-content",
              position: "fixed",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              padding: "12px 24px",
              backgroundColor: "#ffc585",
              color: "#000",
              borderRadius: "1rem",
              border: "2px solid #fff7c4",
              fontSize: "1rem",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
              zIndex: "100",
            }}
          >
            شروع واقعیت افزوده
          </button>
          {/* @ts-ignore */}
        </model-viewer>
      </div>
      <BackButton pathName="/menu" />
    </section>
  );
}
