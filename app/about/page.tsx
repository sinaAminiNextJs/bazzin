"use client";
import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden w-full text-white min-h-screen flex flex-col items-center p-8 bg-mybg/96">
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
      <p className="text-2xl mt-5">درباره ما</p>
      <p className="mt-10 text-lg leading-relaxed text-justify max-w-3xl mx-auto font-iranyekan">
        صفحه درباره ما، شما و کسب و کارتان و معرفی می‌کند؛ تا از این طریق هم
        مخاطبان شما و هدفتان را بشناسند و به شما اعتماد کنند. در این مقاله به
        چگونگی ساخت این صفحه و معرفی نمونه صفحه درباره ما می‌پردازیم.صفحه درباره
        ما، شما و کسب و کارتان و معرفی می‌کند؛ تا از این طریق هم مخاطبان شما و
        هدفتان را بشناسند و به شما اعتماد کنند. در این مقاله به چگونگی ساخت این
        صفحه و معرفی نمونه صفحه درباره ما می‌پردازیم.صفحه درباره ما، شما و کسب و
        کارتان و معرفی می‌کند؛ تا از این طریق هم مخاطبان شما و هدفتان را بشناسند
        و به شما اعتماد کنند.
      </p>
      <article className="fixed bottom-4 left-4">
        <button
          onClick={() => router.push("/menu")}
          className="flex justify-center items-center w-12 pr-1 aspect-square bg-myred rounded-full border-2 border-myorangeLight active:translate-y-[2px] transition-all duration-100 shadow-[0px_0px_20px_black]"
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
          </svg>
        </button>
      </article>
    </section>
  );
}
