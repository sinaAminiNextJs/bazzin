"use client";
import { useRouter } from "next/navigation";
import BackButton from "../../components/BackButton";

export default function About() {
  const router = useRouter();
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
      <p className="text-2xl mt-5">واقعیت افزوده یا فناوری AR</p>
      <p className="my-10 text-lg leading-relaxed text-justify max-w-3xl mx-auto font-iranyekan">
        می‌توان در یک جمله گفت که واقعیت افزوده، ترکیب هم‌زمان دنیای واقعی با
        تصاویر مجازی است، در واقع به کمک واقعیت افزوده علاوه بر عناصر موجود در
        دنیای واقعی، نمای فیزیک زندۀ دیگری به‌صورت مستقیم و گاهی غیرمستقیم اضافه
        می‌شود. این تکنولوژی پیشرفته چند لایۀ دیجیتال به دنیای فیزیکی انسان‌ها
        اضافه می‌کند که این لایه‌ها می‌توانند به ما تصاویر جدیدی از واقعیت ارائه
        کنند.
      </p>
      <button
        onClick={() => router.push("/earthThD/AR-Earth")}
        className="w-full min-w-60 text-black h-15 bg-myorange rounded-2xl border-0 border-b-8 border-b-myorangeLight font-iranyekan text-xl active:translate-y-[2px] transition-all duration-100"
      >
        واقعیت افزوده (AR){" "}
      </button>
      {/* back button */}
      <BackButton pathName="/earthThD" />
    </section>
  );
}
