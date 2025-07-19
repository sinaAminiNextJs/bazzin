// components/ARError.tsx
import BackButton from "@/app/components/BackButton";

export default function ARError({ error }: { error: string }) {
  return (
    <section className="relative overflow-hidden w-full text-white min-h-screen flex flex-col items-center justify-center p-8 pb-20 bg-mybg/96 text-justify">
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
      <h2>خطا</h2>
      <p>{error}</p>
      <BackButton pathName="/earthThD" />
    </section>
  );
}
