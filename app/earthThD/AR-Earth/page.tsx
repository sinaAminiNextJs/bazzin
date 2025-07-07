"use client";
import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import GlobeComponent from "./components/Globe";
import DayNightToggle from "./components/DayNightToggle";
import { validTokens } from "@/public/datasets/tokens";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [isDay, setIsDay] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("tokenBazzin");
    if (!token || !validTokens.includes(token)) {
      router.replace("/");
    }
  }, []);
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
      <DayNightToggle onToggle={setIsDay} />
      <GlobeComponent isDay={isDay} />
      {/* back button */}
      <BackButton pathName="/menu" />
    </>
  );
}
