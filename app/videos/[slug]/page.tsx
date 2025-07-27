"use client";
import BackButton from "@/app/components/BackButton";
import { useAuthCheck } from "@/lib/hooks/useAuthCheck";
import { useParams } from "next/navigation";
export default function videoPlay() {
  const { slug } = useParams();
  useAuthCheck();

  type videoType = {
    name: string;
    slug: string;
    src: string;
  };

  const videoList: videoType[] = [
    { name: "دختر کفشدوزکی", slug: "vid-1", src: "h163yts" },
    { name: "ماچارتا و کدوبلو", slug: "vid-2", src: "ybh9ll7" },
    { name: "سگهای نگهبان", slug: "vid-3", src: "s1095fx" },
    { name: "دیانا و روما", slug: "vid-4", src: "oqbtbo0" },
    { name: "نقشه خمیری", slug: "vid-5", src: "fptu854" },
    { name: "آموزش قاره ها", slug: "vid-6", src: "maiit4f" },
    { name: "نقشه خوانی برای کودکان", slug: "vid-7", src: "acqf9z8" },
    { name: "دالیا و کتاب قرمز", slug: "vid-8", src: "chj35cp" },
    { name: "بیرون از لانه", slug: "vid-9", src: "lmhrdu4" },
    { name: "آنجلو در جنگل رازآلود", slug: "vid-10", src: "wlov22s" },
  ];

  const videoData: videoType | undefined = videoList.find(
    (vid) => vid.slug === slug
  );

  return (
    <section className="relative overflow-hidden w-full h-screen text-white min-h-screen flex flex-col items-center p-4 pb-20 bg-mybg/96">
      {/* page content */}
      <h1 className="text-5xl font-madimi mt-10">BAZZIN</h1>
      {videoData ? (
        <section className="flex flex-col justify-center items-center h-full w-full">
          <iframe
            src={`https://www.aparat.com/video/video/embed/videohash/${videoData.src}/vt/frame?titleShow=true&muted=true&autoplay=true&recom=self`}
            className="w-full aspect-video rounded-2xl"
            allowFullScreen
          ></iframe>
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
