import BackButton from "../components/BackButton";

export default function About() {
  return (
    <section className="relative overflow-hidden w-full text-white min-h-screen flex flex-col items-center p-8 pb-20 bg-mybg/96">
      {/* background */}
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
      <p className="text-2xl mt-5">درباره ما</p>
      <p className="mt-10 text-lg leading-relaxed text-justify max-w-md mx-auto font-iranyekan">
        صفحه درباره ما، شما و کسب و کارتان و معرفی می‌کند؛ تا از این طریق هم
        مخاطبان شما و هدفتان را بشناسند و به شما اعتماد کنند. در این مقاله به
        چگونگی ساخت این صفحه و معرفی نمونه صفحه درباره ما می‌پردازیم.صفحه درباره
        ما، شما و کسب و کارتان و معرفی می‌کند؛ تا از این طریق هم مخاطبان شما و
        هدفتان را بشناسند و به شما اعتماد کنند. در این مقاله به چگونگی ساخت این
        صفحه و معرفی نمونه صفحه درباره ما می‌پردازیم.صفحه درباره ما، شما و کسب و
        کارتان و معرفی می‌کند؛ تا از این طریق هم مخاطبان شما و هدفتان را بشناسند
        و به شما اعتماد کنند.
      </p>
      {/* back button */}
      <BackButton pathName="/menu" />
    </section>
  );
}
