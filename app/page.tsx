"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [code, setCode] = useState("");
  const [wrongPass, setWrongPass] = useState("");
  const router = useRouter();

  async function checkPass(e: any) {
    e.preventDefault();
    setWrongPass("");

    try {
      const res = await fetch("/datasets/p.json");
      const json = await res.json();

      if (json.p.includes(code)) {
        router.push("/menu");
      } else {
        setWrongPass("wrong");
      }
    } catch (error) {
      console.error(error);
      alert("خطا در بررسی کد!");
    }
  }

  return (
    <main className="relative overflow-hidden w-full text-white min-h-screen flex flex-col items-center p-8 bg-mybg/96">
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
      <h1 className="text-5xl font-madimi mt-10">BAZZIN</h1>
      <p className="text-3xl mt-24 font-iranyekan">به بازیین خوش اومدید!</p>
      <div className="mt-20 mx-10 max-w-md w-full">
        <p className="text-xl font-iranyekan mb-4">
          برای ورود کد روی جعبه رو وارد کنید
        </p>
        <form onSubmit={checkPass} className="relative flex flex-col space-y-5">
          <img
            src="/clipart/earth.png"
            alt="Earth illustration"
            className="w-20 absolute -left-3 -top-3"
          />
          <input
            type="number"
            aria-label="کد ورود"
            onChange={(e) => {
              setCode(e.target.value);
              setWrongPass("");
            }}
            className="w-full h-14 rounded-2xl bg-white text-black px-4 text-right text-4xl font-madimi focus:!outline-0 focus:!border-0"
          />
          <button
            type="submit"
            className="w-full text-black h-15 bg-mygreen rounded-2xl border-0 border-b-8 border-b-mygreenLight font-iranyekan text-2xl active:translate-y-[2px] transition-all duration-100"
          >
            ورود
          </button>
        </form>
        <p
          className={`text-xl text-myorange font-iranyekan mt-5 transition-all duration-200 ${
            wrongPass === "wrong" ? "opacity-100" : "opacity-0"
          }`}
        >
          رمز اشتباه است.{" "}
        </p>
      </div>
    </main>
  );
}
