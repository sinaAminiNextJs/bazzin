"use client";
import BackButton from "@/app/components/BackButton";
import AREarth from "./components/AREarth";

// شروع تابع اصلی کامپوننت
export default function ARPage() {
  return (
    <section className="relative overflow-hidden w-full min-h-screen text-white flex flex-col items-center bg-mybg/96">
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
      <AREarth />
      <div
        id="ar-button-container"
        className="w-full fixed bottom-0 left-0"
      ></div>
      {/* دکمه برگشت */}

      <BackButton pathName="/menu" />
    </section>
  );
}
