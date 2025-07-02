"use client";
import { useRouter } from "next/navigation";
type backButtonType = {
  pathName: string;
};
export default function BackButton({ pathName }: backButtonType) {
  const router = useRouter();

  return (
    <div className="fixed bottom-4 left-4">
      <button
        onClick={() => router.push(pathName)}
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
    </div>
  );
}
