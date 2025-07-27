"use client";
import Link from "next/link";
import BackButton from "../components/BackButton";
import { useAuthCheck } from "@/lib/hooks/useAuthCheck";

export default function About() {
  useAuthCheck();

  type videoType = {
    name: string;
    slug: string;
    thumbnail: string;
  };

  const videoList: videoType[] = [
    {
      name: "نقشه خمیری",
      slug: "vid-5",
      thumbnail:
        "https://static.cdn.asset.aparat.com/avt/65438429-9870-l__9191.jpg?width=450&quality=90&secret=m1fc9SbPk4Gceg4zAm9ynQ",
    },
    {
      name: "آموزش قاره ها",
      slug: "vid-6",
      thumbnail:
        "https://static.cdn.asset.aparat.com/avt/65438390-3079-l__5375.jpg?width=450&quality=90&secret=pU0-S_hEyBHULbb3bi0aEw",
    },
    {
      name: "نقشه خوانی برای کودکان",
      slug: "vid-7",
      thumbnail:
        "https://static.cdn.asset.aparat.com/avt/65438275-4740-l__7619.jpg?width=450&quality=90&secret=rd2L8dRgYD-4_ksQXaN1EA",
    },
    {
      name: "دختر کفشدوزکی",
      slug: "vid-1",
      thumbnail:
        "https://static.cdn.asset.aparat.com/avt/42342126-4757-l__6626.jpg?width=450&quality=90&secret=1L1f6yesc21UsFzjBWcFfg",
    },
    {
      name: "ماچارتا و کدوبلو",
      slug: "vid-2",
      thumbnail:
        "https://static.cdn.asset.aparat.com/avt/65056752-3785-l__6531.jpg?width=300&quality=90&secret=EHqo4CvWgRTJ_qOGP5ngqw",
    },
    {
      name: "سگهای نگهبان",
      slug: "vid-3",
      thumbnail:
        "https://static.cdn.asset.aparat.com/avt/56347394-4976-l__5554.jpg?width=300&quality=90&secret=Pc7QBz7O6LI4p2DLJU9paA",
    },
    {
      name: "دیانا و روما",
      slug: "vid-4",
      thumbnail:
        "https://static.cdn.asset.aparat.com/avt/62482285-6849-l__6618.jpg?width=300&quality=90&secret=99NRxzMsOIFMtz_e-TtL9Q",
    },
    {
      name: "دالیا و کتاب قرمز",
      slug: "vid-8",
      thumbnail:
        "https://static.cdn.asset.aparat.com/avt/64471948-8199-l__9760.jpg?width=900&quality=90&secret=4A4SQi-3gwMAVHmah1UrMg",
    },
    {
      name: "بیرون از لانه",
      slug: "vid-9",
      thumbnail:
        "https://static.cdn.asset.aparat.com/avt/64453491-5157-l__6456.jpg?width=300&quality=90&secret=E3kGHfeXUXdU44oZMtaOXQ",
    },
    {
      name: "آنجلو در جنگل رازآلود",
      slug: "vid-10",
      thumbnail:
        "https://static.cdn.asset.aparat.com/avt/64437495-6168-l__1050.jpg?width=300&quality=90&secret=NyyX1wqzlX9O61gwFDZZTQ",
    },
  ];

  return (
    <section className="relative overflow-hidden w-full text-white min-h-screen flex flex-col items-center p-4 pb-20 bg-mybg/96">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10 text-lg leading-relaxed text-justify max-w-3xl mx-auto font-iranyekan">
        {videoList.map(({ name, slug, thumbnail }, index) => (
          <Link
            href={`/videos/${slug}`}
            key={index}
            className="mx-auto w-full "
          >
            <div className="relative flex justify-center items-center aspect-video rounded-2xl bg-mygreen">
              <img className="w-full rounded-2xl" src={thumbnail} />
              <svg
                width="36"
                height="40"
                viewBox="0 0 36 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute z-10"
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
          </Link>
        ))}
      </div>
      {/* back button */}
      <BackButton pathName="/menu" />
    </section>
  );
}
