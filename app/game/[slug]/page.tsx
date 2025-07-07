"use client";
import BackButton from "@/app/components/BackButton";
import { useAuthCheck } from "@/lib/hooks/useAuthCheck";
import { useParams } from "next/navigation";

export default function GamePlay() {
  const { slug } = useParams();
  useAuthCheck();

  type gameType = {
    name: string;
    slug: string;
    game: string;
  };

  const gameList: gameType[] = [
    { name: "اسم بازی ۱", slug: "game-1", game: "/g1.png" },
    { name: "اسم بازی ۲", slug: "game-2", game: "/g2.png" },
    { name: "اسم بازی ۳", slug: "game-3", game: "/g3.png" },
    { name: "اسم بازی ۴", slug: "game-4", game: "/g4.png" },
    { name: "اسم بازی ۵", slug: "game-5", game: "/g5.png" },
    { name: "اسم بازی ۶", slug: "game-6", game: "/g6.png" },
  ];

  const gameData: gameType | undefined = gameList.find(
    (game) => game.slug === slug
  );

  return (
    <section className="relative overflow-hidden w-full h-screen text-white min-h-screen flex flex-col items-center p-8 pb-20 bg-mybg/96">
      {/* page content */}
      <h1 className="text-5xl font-madimi mt-10">BAZZIN</h1>
      {gameData ? (
        <section className="flex flex-col justify-center items-center h-full">
          <img
            src={gameData.game}
            className="w-full aspect-square rounded-2xl"
            alt={gameData.name}
          />
          <p className="text-center mt-4 text-3xl font-iranyekan">
            {gameData.name}
          </p>
        </section>
      ) : (
        <section className="flex justify-center items-center h-full text-white">
          <p className="text-xl font-iranyekan">بازی پیدا نشد.</p>
        </section>
      )}
      {/* back button */}
      <BackButton pathName="/game" />
    </section>
  );
}
