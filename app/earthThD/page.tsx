"use client";
import { useState } from "react";
import GlobeComponent from "./components/Globe";
import DayNightToggle from "./components/DayNightToggle";
import { useAuthCheck } from "@/lib/hooks/useAuthCheck";
import BackButton from "../components/BackButton";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [isDay, setIsDay] = useState(true);
  const router = useRouter();
  useAuthCheck();

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
          onClick={() => router.push("/earthThD/earthAR/")}
          className="w-full text-black h-12 bg-myorange rounded-2xl border-2 border-myorangeLight font-iranyekan text-xl active:translate-y-[2px] active:scale-95 transition-all duration-100 shadow-[0px_0px_20px_black]"
        >
          واقعیت افزوده (AR){" "}
        </button>
      </article>
      {/* back button */}
      <BackButton pathName="/menu" />
    </>
  );
}
