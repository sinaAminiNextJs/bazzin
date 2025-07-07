"use client";
import { useAuthCheck } from "@/lib/hooks/useAuthCheck";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Menu() {
  const router = useRouter();

  useAuthCheck();

  return (
    <section className="relative overflow-hidden w-full text-white min-h-screen flex flex-col items-center p-8 pb-20 bg-mybg/96">
      {/* background */}
      <div className="absolute top-0 left-0 -z-10 w-full h-screen">
        <img
          src="/clipart/earth.png"
          alt="Earth illustration"
          className="w-40 absolute top-20 -right-3"
        />
        <img
          src="/clipart/earth.png"
          alt="Earth illustration"
          className="w-96 absolute -bottom-7 -left-44"
        />
      </div>
      <h1 className="text-5xl font-madimi mt-10">BAZZIN</h1>
      <div className="mt-20 mx-10 max-w-md w-full space-y-4">
        <article className="w-full flex items-center group">
          <button
            onClick={() => router.push("/earthThD")}
            className="w-full min-w-60 text-black h-15 bg-mygreen rounded-2xl border-0 border-b-8 border-b-mygreenLight font-iranyekan text-xl active:translate-y-[2px] active:scale-95 transition-all duration-300 ease-in-out"
          >
            کره زمین سه بعدی
          </button>
          <Image
            src="/clipart/earth.png"
            alt="Earth illustration"
            width={96}
            height={96}
            priority
            className="-mr-10 z-10 group-active:rotate-6"
          />
        </article>
        <article className="w-full flex items-center group">
          <button
            onClick={() => router.push("/game")}
            className="w-full min-w-60 text-black h-15 bg-myblue rounded-2xl border-0 border-b-8 border-b-myblueLight font-iranyekan text-xl active:translate-y-[2px] active:scale-95 transition-all duration-300 ease-in-out"
          >
            بازی و سرگرمی{" "}
          </button>
          <Image
            src="/clipart/joy.png"
            alt="Earth illustration"
            width={96}
            height={96}
            priority
            className="-mr-10 z-10 -rotate-12 group-active:rotate-0"
          />
        </article>
        <article className="w-full flex items-center group">
          <button
            onClick={() => router.push("/videos")}
            className="w-full min-w-60 text-black h-15 bg-myred rounded-2xl border-0 border-b-8 border-b-myredLight font-iranyekan text-xl active:translate-y-[2px] active:scale-95 transition-all duration-300 ease-in-out"
          >
            انیمیشن{" "}
          </button>
          <Image
            src="/clipart/play.png"
            alt="Earth illustration"
            width={96}
            height={96}
            priority
            className="-mr-10 z-10 rotate-12 p-1 group-active:rotate-0"
          />
        </article>
        <article className="w-full flex items-center group">
          <button
            onClick={() => router.push("/about")}
            className="w-full min-w-60 text-black h-15 bg-myorange rounded-2xl border-0 border-b-8 border-b-myorangeLight font-iranyekan text-xl active:translate-y-[2px] active:scale-95 transition-all duration-300 ease-in-out"
          >
            درباره ما{" "}
          </button>
          <Image
            src="/clipart/qustion.png"
            alt="Earth illustration"
            width={96}
            height={96}
            priority
            className="-mr-10 z-10 -rotate-12 p-2 group-active:rotate-0"
          />
        </article>
      </div>
    </section>
  );
}
