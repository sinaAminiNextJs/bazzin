"use client";
import BackButton from "@/app/components/BackButton";
import { useAuthCheck } from "@/lib/hooks/useAuthCheck";
import { useRouter } from "next/navigation";

export default function EarthThD() {
  useAuthCheck();

  const router = useRouter();
  return (
    <section className="relative overflow-hidden w-full h-screen text-white min-h-screen flex flex-col items-center p-8 pb-20 bg-mybg/96">
      {/* page content */}
      <h1 className="text-5xl font-madimi mt-10">BAZZIN</h1>

      <section className="flex flex-col justify-center items-center h-full">
        <img
          src="/earth.png"
          className="w-full max-w-md aspect-square rounded-2xl mb-10"
          alt="earth 3d"
        />
        <article className="w-full flex items-center">
          <button onClick={() => router.push("/earthThD/AR-Description")}>
            <img
              src="/clipart/qustion.png"
              alt="question button"
              className="w-24 p-2 rotate-12 -mr-2"
            />
          </button>
          <button
            onClick={() => router.push("/earthThD/AR-Earth")}
            className="w-full min-w-60 text-black h-15 bg-myorange rounded-2xl border-0 border-b-8 border-b-myorangeLight font-iranyekan text-xl active:translate-y-[2px] active:scale-95 transition-all duration-100"
          >
            واقعیت افزوده (AR){" "}
          </button>
        </article>
      </section>

      {/* back button */}
      <BackButton pathName="/menu" />
    </section>
  );
}
