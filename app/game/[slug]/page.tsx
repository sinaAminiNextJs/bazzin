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
    src: string;
    thumbnail: string;
  };

  const gameList: gameType[] = [
    {
      name: "اسم بازی ۱",
      slug: "game-1",
      thumbnail: "/g1.png",
      src: "https://games.poki.com/458768/28165370-9b06-40f6-b35b-c538dc818754?tag=pg-c269b0a890a4cfe1c499188409a9240669a68214&amp;site_id=3&amp;iso_lang=en&amp;country=NL&amp;poki_url=https://poki.com/en/g/merge-rot&amp;hoist=yes&amp;nonPersonalized=y&amp;cloudsavegames=n&amp;familyFriendly=y&amp;categories=7,37,72,96,909,929,1013,1126,1139,1140,1141,1143,1155,1186,1190,1206&amp;ab=24d8666f3b29486be8332664c5b70c486da11bc0&amp;experiment=a-d53d9d5a",
    },
    {
      name: "اسم بازی ۲",
      slug: "game-2",
      thumbnail: "/g2.png",
      src: " https://googleads.g.doubleclick.net/pagead/ads?gdpr=0&amp;gdpr_consent=CQTDIIAQTDIIAEsACBENBvFoAP_gAEPgAAYgK1ID_C7EbCFCiDp3IKMEMAhHQBBAYsQwAAaBA4AADBIQIAQCgkEYBASAFCACCAAAKCSBAAAgCAAAAUAAYAAVAABEAAwAIBAIIAAAgAAAAEAIAAAACIAAEQCAAAAEEEAAkAgAAAIASAAAAAAAAACBAAAAAAAAAAAAAAAABAAAAQAAQAAAAAAAiAAAAAAAABAIAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAABAAAAAAAQR2QD-F2I2EKFEHCuQUYIYBCugCAAxYhgAA0CBgAAGCQgQAgFJIIkCAEAIEAAEAAAQEgCAABQABAAAIAAgAAqAACIABgAQCAQQIABAAAAgIAAAAAAEQAAIgEAAAAIIIABABAAAAQAkAAAAAAAAAECAAAAAAAAAAAAAAAAAAAAAEABgAAAAAABEAAAAAAAACAQIAAA.YAAACgAAAAA&amp;addtl_consent=2~61.89.122.184.196.230.314.318.442.445.494.550.576.609.1029.1033.1046.1051.1097.1126.1166.1301.1415.1725.1765.1942.1958.1987.2068.2072.2074.2107.2213.2219.2223.2224.2328.2331.2387.2416.2501.2567.2568.2575.2657.2686.2778.2869.2878.2908.2920.2963.3005.3023.3100.3126.3219.3234.3235.3253.3309.3731.6931.8931.13731.15731~dv.&amp;client=ca-pub-9298242687620115&amp;output=html&amp;h=600&amp;slotname=3460475159&amp;adk=3157226403&amp;adf=390114130&amp;pi=t.ma~as.3460475159&amp;w=300&amp;abgtt=6&amp;lmt=1752655406&amp;rafmt=12&amp;format=300x600&amp;url=https%3A%2F%2Fwww.silvergames.com%2Ffa%2Fguess-the-flag&amp;wgl=1&amp;uach=WyJXaW5kb3dzIiwiMTAuMC4wIiwieDg2IiwiIiwiMTM4LjAuNzIwNC4xMDEiLG51bGwsMCxudWxsLCI2NCIsW1siTm90KUE7QnJhbmQiLCI4LjAuMC4wIl0sWyJDaHJvbWl1bSIsIjEzOC4wLjcyMDQuMTAxIl0sWyJHb29nbGUgQ2hyb21lIiwiMTM4LjAuNzIwNC4xMDEiXV0sMF0.&amp;dt=1752655405131&amp;bpp=1&amp;bdt=867&amp;idt=1106&amp;shv=r20250714&amp;mjsv=m202507100101&amp;ptt=9&amp;saldr=aa&amp;abxe=1&amp;cookie=ID%3D23fd11d4f25b7289%3AT%3D1749373983%3ART%3D1749994642%3AS%3DALNI_MYY1eGUPAmdEAkge4vbks9IBCL_cQ&amp;gpic=UID%3D000010d973eb7fbb%3AT%3D1749373983%3ART%3D1749994642%3AS%3DALNI_Ma3lgC0tcT3zsOHcNQqkJbVOQNECg&amp;eo_id_str=ID%3Dbef44ec95e1273a5%3AT%3D1749373983%3ART%3D1749994642%3AS%3DAA-AfjYLav-3WLMHPotxlDR7jr1O&amp;prev_fmts=0x0%2C160x600&amp;nras=1&amp;correlator=6112616409028&amp;frm=20&amp;pv=1&amp;u_tz=210&amp;u_his=1&amp;u_h=1080&amp;u_w=1920&amp;u_ah=1040&amp;u_aw=1920&amp;u_cd=24&amp;u_sd=1&amp;dmc=8&amp;adx=1227&amp;ady=55&amp;biw=1905&amp;bih=919&amp;scr_x=0&amp;scr_y=0&amp;eid=31093040%2C95331832%2C95353387%2C95362655%2C95365881%2C95366350%2C42533294%2C95359266%2C95366368&amp;oid=2&amp;pvsid=3054106090651754&amp;tmod=774961461&amp;uas=0&amp;nvt=1&amp;fc=1920&amp;brdim=0%2C0%2C0%2C0%2C1920%2C0%2C1920%2C1040%2C1920%2C919&amp;vis=1&amp;rsz=%7C%7CeE%7C&amp;abl=CS&amp;pfx=0&amp;fu=256&amp;bc=31&amp;bz=1&amp;td=1&amp;tdf=2&amp;psd=W251bGwsbnVsbCxudWxsLDNd&amp;nt=1&amp;ifi=3&amp;uci=a!3&amp;fsb=1&amp;dtd=1114",
    },
    {
      name: "اسم بازی ۳",
      slug: "game-3",
      thumbnail: "/g3.png",
      src: "https://games.poki.com/458768/28165370-9b06-40f6-b35b-c538dc818754?tag=pg-c269b0a890a4cfe1c499188409a9240669a68214&amp;site_id=3&amp;iso_lang=en&amp;country=NL&amp;poki_url=https://poki.com/en/g/merge-rot&amp;hoist=yes&amp;nonPersonalized=y&amp;cloudsavegames=n&amp;familyFriendly=y&amp;categories=7,37,72,96,909,929,1013,1126,1139,1140,1141,1143,1155,1186,1190,1206&amp;ab=24d8666f3b29486be8332664c5b70c486da11bc0&amp;experiment=a-d53d9d5a",
    },
    {
      name: "اسم بازی ۴",
      slug: "game-4",
      thumbnail: "/g4.png",
      src: "https://games.poki.com/458768/28165370-9b06-40f6-b35b-c538dc818754?tag=pg-c269b0a890a4cfe1c499188409a9240669a68214&amp;site_id=3&amp;iso_lang=en&amp;country=NL&amp;poki_url=https://poki.com/en/g/merge-rot&amp;hoist=yes&amp;nonPersonalized=y&amp;cloudsavegames=n&amp;familyFriendly=y&amp;categories=7,37,72,96,909,929,1013,1126,1139,1140,1141,1143,1155,1186,1190,1206&amp;ab=24d8666f3b29486be8332664c5b70c486da11bc0&amp;experiment=a-d53d9d5a",
    },
    {
      name: "اسم بازی ۵",
      slug: "game-5",
      thumbnail: "/g5.png",
      src: "https://games.poki.com/458768/28165370-9b06-40f6-b35b-c538dc818754?tag=pg-c269b0a890a4cfe1c499188409a9240669a68214&amp;site_id=3&amp;iso_lang=en&amp;country=NL&amp;poki_url=https://poki.com/en/g/merge-rot&amp;hoist=yes&amp;nonPersonalized=y&amp;cloudsavegames=n&amp;familyFriendly=y&amp;categories=7,37,72,96,909,929,1013,1126,1139,1140,1141,1143,1155,1186,1190,1206&amp;ab=24d8666f3b29486be8332664c5b70c486da11bc0&amp;experiment=a-d53d9d5a",
    },
    {
      name: "اسم بازی ۶",
      slug: "game-6",
      thumbnail: "/g6.png",
      src: "https://games.poki.com/458768/28165370-9b06-40f6-b35b-c538dc818754?tag=pg-c269b0a890a4cfe1c499188409a9240669a68214&amp;site_id=3&amp;iso_lang=en&amp;country=NL&amp;poki_url=https://poki.com/en/g/merge-rot&amp;hoist=yes&amp;nonPersonalized=y&amp;cloudsavegames=n&amp;familyFriendly=y&amp;categories=7,37,72,96,909,929,1013,1126,1139,1140,1141,1143,1155,1186,1190,1206&amp;ab=24d8666f3b29486be8332664c5b70c486da11bc0&amp;experiment=a-d53d9d5a",
    },
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
            className="w-full aspect-square rounded-2xl"
            src={gameData.thumbnail}
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
