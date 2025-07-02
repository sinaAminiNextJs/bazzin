"use client";

import { useState } from "react";

export default function DayNightToggle({
  onToggle,
}: {
  onToggle: (isDay: boolean) => void;
}) {
  const [isDay, setIsDay] = useState(true);

  function handleToggle() {
    setIsDay((prev) => {
      const next = !prev;
      onToggle(next);
      return next;
    });
  }

  return (
    <div className="fixed bottom-4 right-4 z-10">
      <button
        onClick={handleToggle}
        className={`flex justify-center items-center w-12 aspect-square 
        ${!isDay ? "bg-mygreen" : "bg-myblue"} 
        rounded-full border-2 
        ${!isDay ? "border-mygreenLight" : "border-myblueLight"}
        active:translate-y-[2px] transition-all duration-100
        shadow-[0px_0px_20px_black]`}
      >
        {!isDay ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m8.66-8.66h1M3.34 12H2.34m15.364-6.364l.707.707M5.93 18.07l-.707-.707M18.07 18.07l-.707-.707M5.93 5.93l-.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M21.752 15.002A9 9 0 0112 3a9 9 0 00-1.752 17.752A9.002 9.002 0 0021.752 15z" />
          </svg>
        )}
      </button>
    </div>
  );
}
