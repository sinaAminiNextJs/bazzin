"use client";
import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();
  type videoType = {
    name: string;
  };

  const videoList: videoType[] = [
    { name: "اسم انیمیشن" },
    { name: "اسم انیمیشن" },
    { name: "اسم انیمیشن" },
    { name: "اسم انیمیشن" },
    { name: "اسم انیمیشن" },
    { name: "اسم انیمیشن" },
    { name: "اسم انیمیشن" },
    { name: "اسم انیمیشن" },
    { name: "اسم انیمیشن" },
    { name: "اسم انیمیشن" },
  ];

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
      <p className="text-2xl mt-5">انیمیشن</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mt-10 text-lg leading-relaxed text-justify max-w-3xl mx-auto font-iranyekan">
        {videoList.map(({ name }, index) => (
          <article key={index} className="mx-auto ">
            <div className="flex justify-center items-center w-32 aspect-square rounded-2xl bg-mygreen">
              <svg
                width="36"
                height="40"
                viewBox="0 0 36 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_4610_3157)">
                  <path
                    d="M30 12.5359C32.6667 14.0755 32.6667 17.9245 30 19.4641L10.5 30.7224C7.83333 32.262 4.5 30.3375 4.5 27.2583L4.5 4.74167C4.5 1.66247 7.83333 -0.262033 10.5 1.27757L30 12.5359Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_4610_3157"
                    x="0.5"
                    y="0.736328"
                    width="35.5"
                    height="38.5273"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_4610_3157"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_4610_3157"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
            <p className="text-center mt-2">{name}</p>
          </article>
        ))}
      </div>
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
