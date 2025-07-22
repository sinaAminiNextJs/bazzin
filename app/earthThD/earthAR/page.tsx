"use client";
import BackButton from "@/app/components/BackButton";
import AREarth from "./components/AREarth";

// شروع تابع اصلی کامپوننت
export default function ARPage() {
  return (
    <section>
      {/* پس‌زمینه‌های تصویری */}

      {/* نمای اصلی AR */}
      <AREarth />
      <div id="ar-view" className="w-full h-full" />
      {/* دکمه AR */}
      <div
        id="ar-button-container"
        className="w-full fixed bottom-0 left-0"
      ></div>
      {/* دکمه برگشت */}
      <BackButton pathName="/menu" />
    </section>
  );
}
