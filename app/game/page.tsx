"use client";
import Link from "next/link";
import BackButton from "../components/BackButton";
import { useAuthCheck } from "@/lib/hooks/useAuthCheck";

export default function Game() {
  useAuthCheck();

  type videoType = {
    name: string;
    game: string;
    slug: string;
    src: string;
  };

  const videoList: videoType[] = [
    {
      name: "پرچم گو",
      game: "/g1.png",
      slug: "game-1",
      src: "https://f3.silvergames.com/m/guess-the-flag/",
    },
    {
      name: "کشوریاب",
      game: "/g2.png",
      slug: "game-2",
      src: "https://www.playgeography.com/games/countries-of-the-world/",
    },
    {
      name: "کاپی بارا",
      game: "/g3.jpg",
      slug: "game-3",
      src: "https://html5.gamedistribution.com/63e8c2d0709e452f842f261a7c9f43f9/",
    },
    {
      name: "بلاک شکن",
      game: "/g4.jpg",
      slug: "game-4",
      src: "https://html5.gamedistribution.com/81b03a635d5f4147876166033620ef25/",
    },
    {
      name: "الماس لابوبو",
      game: "/g5.jpg",
      slug: "game-5",
      src: "https://html5.gamedistribution.com/c44d8e4a1bff47078b37e07867553f8c/",
    },
    {
      name: "هاکی بال",
      game: "/g6.jpg",
      slug: "game-6",
      src: "https://html5.gamedistribution.com/66da87c150bf4e7c9f2abef8cdbd2f7a/",
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
      {/* page content */}
      <h1 className="text-5xl font-madimi mt-10">BAZZIN</h1>
      <p className="text-2xl mt-5">بازی و سرگرمی</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mt-10 text-lg leading-relaxed text-justify max-w-3xl mx-auto font-iranyekan">
        {videoList.map(({ name, game, src }, index) => (
          <Link
            //  href={`/game/${slug}`}
            href={src}
            key={index}
            className="mx-auto "
          >
            <img
              src={game}
              className="flex justify-center items-center w-32 aspect-square rounded-2xl"
            />
            <p className="w-full text-center mt-2">{name}</p>
          </Link>
        ))}
      </div>
      {/* back button */}
      <BackButton pathName="/menu" />
    </section>
  );
}
