"use client";
import { useState } from "react";
import GlobeComponent from "./components/Globe";
import DayNightToggle from "./components/DayNightToggle";
import { useAuthCheck } from "@/lib/hooks/useAuthCheck";
import BackButton from "../components/BackButton";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [isDay, setIsDay] = useState(true);
  const router = useRouter();
  useAuthCheck();

  return (
    <>
      {/* <iframe
        id="game-element"
        allow="autoplay; fullscreen; camera; focus-without-user-activation *; monetization; gamepad; keyboard-map *; xr-spatial-tracking; clipboard-write; web-share; accelerometer; magnetometer; gyroscope"
        name="gameFrame"
        sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-same-origin allow-downloads"
        src="https://games.poki.com/458768/28165370-9b06-40f6-b35b-c538dc818754?tag=pg-c269b0a890a4cfe1c499188409a9240669a68214&amp;site_id=3&amp;iso_lang=en&amp;country=NL&amp;poki_url=https://poki.com/en/g/merge-rot&amp;hoist=yes&amp;nonPersonalized=y&amp;cloudsavegames=n&amp;familyFriendly=y&amp;categories=7,37,72,96,909,929,1013,1126,1139,1140,1141,1143,1155,1186,1190,1206&amp;ab=24d8666f3b29486be8332664c5b70c486da11bc0&amp;experiment=a-d53d9d5a"
        title="Game"
        className="w-full h-[500px]"
      ></iframe> */}
      <GlobeComponent isDay={isDay} />
      <DayNightToggle onToggle={setIsDay} />
      <article className="w-full mx-auto fixed bottom-4 px-20 flex items-center">
        {/* <button onClick={() => router.push("/earthThD/AR-Description")}>
          <img
            src="/clipart/qustion.png"
            alt="question button"
            className="w-24 p-2 rotate-12 -mr-2"
          />
        </button> */}
        <button
          onClick={() => router.push("/earthThD/AR-Earth")}
          className="w-full text-black h-12 bg-myorange rounded-2xl border-2 border-myorangeLight font-iranyekan text-xl active:translate-y-[2px] active:scale-95 transition-all duration-100 shadow-[0px_0px_20px_black]"
        >
          واقعیت افزوده (AR){" "}
        </button>
      </article>
      {/* back button */}
      <BackButton pathName="/menu" />
    </>
  );
}
