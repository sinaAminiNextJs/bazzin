"use client";
import BackButton from "@/app/components/BackButton";
import { validTokens } from "@/public/datasets/tokens";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
export default async function videoPlay() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("tokenBazzin");
    if (!token || !validTokens.includes(token)) {
      router.replace("/");
    }
  }, []);

  const { slug } = useParams();

  type videoType = {
    name: string;
    slug: string;
    video: string;
  };

  const videoList: videoType[] = [
    { name: "اسم انیمیشن ۱", slug: "vid-1", video: "/g1.png" },
    { name: "اسم انیمیشن ۲", slug: "vid-1", video: "/g2.png" },
    { name: "اسم انیمیشن ۳", slug: "vid-1", video: "/g3.png" },
    { name: "اسم انیمیشن ۴", slug: "vid-1", video: "/g4.png" },
    { name: "اسم انیمیشن ۵", slug: "vid-1", video: "/g5.png" },
    { name: "اسم انیمیشن ۶", slug: "vid-1", video: "/g6.png" },
  ];

  const videoData: videoType | undefined = videoList.find(
    (vid) => vid.slug === slug
  );

  return (
    <section className="relative overflow-hidden w-full h-screen text-white min-h-screen flex flex-col items-center p-8 pb-20 bg-mybg/96">
      {/* page content */}
      <h1 className="text-5xl font-madimi mt-10">BAZZIN</h1>
      {videoData ? (
        <section className="flex flex-col justify-center items-center h-full">
          <img
            src={videoData.video}
            className="w-full aspect-square rounded-2xl"
            alt={videoData.name}
          />
          <p className="text-center mt-4 text-3xl font-iranyekan">
            {videoData.name}
          </p>
        </section>
      ) : (
        <section className="flex justify-center items-center h-full text-white">
          <p className="text-xl font-iranyekan">انیمیشن پیدا نشد.</p>
        </section>
      )}
      {/* back button */}
      <BackButton pathName="/videos" />
    </section>
  );
}
