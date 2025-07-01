"use client";
import { useRouter } from "next/navigation";

export default function Menu() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden w-full text-white min-h-screen flex flex-col items-center p-8 bg-mybg/96">
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
        <article className="w-full flex items-center">
          <button
            onClick={() => router.push("/earthThD")}
            className="w-full min-w-60 text-black h-15 bg-mygreen rounded-2xl border-0 border-b-8 border-b-mygreenLight font-iranyekan text-xl active:translate-y-[2px] transition-all duration-100"
          >
            کره زمین سه بعدی
          </button>
          <img
            src="/clipart/earth.png"
            alt="Earth illustration"
            className="w-24 -mr-10 z-10"
          />
        </article>
        <article className="w-full flex items-center ">
          <button
            onClick={() => router.push("/game")}
            className="w-full min-w-60 text-black h-15 bg-myblue rounded-2xl border-0 border-b-8 border-b-myblueLight font-iranyekan text-xl active:translate-y-[2px] transition-all duration-100"
          >
            بازی و سرگرمی{" "}
          </button>
          <img
            src="/clipart/joy.png"
            alt="Earth illustration"
            className="w-24 -mr-10 z-10 -rotate-12"
          />
        </article>
        <article className="w-full flex items-center ">
          <button
            onClick={() => router.push("/videos")}
            className="w-full min-w-60 text-black h-15 bg-myred rounded-2xl border-0 border-b-8 border-b-myredLight font-iranyekan text-xl active:translate-y-[2px] transition-all duration-100"
          >
            انیمیشن{" "}
          </button>
          <img
            src="/clipart/play.png"
            alt="Earth illustration"
            className="w-24 -mr-10 z-10 rotate-12 p-1"
          />
        </article>
        <article className="w-full flex items-center">
          <button
            onClick={() => router.push("/about")}
            className="w-full min-w-60 text-black h-15 bg-myorange rounded-2xl border-0 border-b-8 border-b-myorangeLight font-iranyekan text-xl active:translate-y-[2px] transition-all duration-100"
          >
            درباره ما{" "}
          </button>
          <img
            src="/clipart/qustion.png"
            alt="Earth illustration"
            className="w-24 -mr-10 z-10 -rotate-12 p-2"
          />
        </article>
      </div>
    </section>
  );
}
