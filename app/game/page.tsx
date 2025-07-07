"use client";
import Link from "next/link";
import BackButton from "../components/BackButton";
import { useEffect } from "react";
import { validTokens } from "@/public/datasets/tokens";
import { useRouter } from "next/navigation";

export default function Game() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("tokenBazzin");
    if (!token || !validTokens.includes(token)) {
      router.replace("/");
    }
  }, []);

  type videoType = {
    name: string;
    game: string;
    slug: string;
  };

  const videoList: videoType[] = [
    { name: "اسم بازی", game: "/g1.png", slug: "game-1" },
    { name: "اسم بازی", game: "/g2.png", slug: "game-2" },
    { name: "اسم بازی", game: "/g3.png", slug: "game-3" },
    { name: "اسم بازی", game: "/g4.png", slug: "game-4" },
    { name: "اسم بازی", game: "/g5.png", slug: "game-5" },
    { name: "اسم بازی", game: "/g6.png", slug: "game-6" },
    { name: "اسم بازی", game: "/g1.png", slug: "game-1" },
    { name: "اسم بازی", game: "/g2.png", slug: "game-2" },
    { name: "اسم بازی", game: "/g3.png", slug: "game-3" },
    { name: "اسم بازی", game: "/g4.png", slug: "game-4" },
  ];

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
      {/* page content */}
      <h1 className="text-5xl font-madimi mt-10">BAZZIN</h1>
      <p className="text-2xl mt-5">بازی و سرگرمی</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mt-10 text-lg leading-relaxed text-justify max-w-3xl mx-auto font-iranyekan">
        {videoList.map(({ name, game, slug }, index) => (
          <Link href={`/game/${slug}`} key={index} className="mx-auto ">
            <img
              src={game}
              className="flex justify-center items-center w-32 aspect-square rounded-2xl"
            />
            <p className="text-center mt-2">{name}</p>
          </Link>
        ))}
      </div>
      {/* back button */}
      <BackButton pathName="/menu" />
    </section>
  );
}
