import BackButton from "../components/BackButton";

export default function About() {
  type videoType = {
    name: string;
    game: string;
  };

  const videoList: videoType[] = [
    { name: "اسم بازی", game: "/g1.png" },
    { name: "اسم بازی", game: "/g2.png" },
    { name: "اسم بازی", game: "/g3.png" },
    { name: "اسم بازی", game: "/g4.png" },
    { name: "اسم بازی", game: "/g5.png" },
    { name: "اسم بازی", game: "/g6.png" },
    { name: "اسم بازی", game: "/g1.png" },
    { name: "اسم بازی", game: "/g2.png" },
    { name: "اسم بازی", game: "/g3.png" },
    { name: "اسم بازی", game: "/g4.png" },
  ];

  return (
    <section className="relative overflow-hidden w-full text-white min-h-screen flex flex-col items-center p-8 bg-mybg/96">
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
      {/* page content */}
      <h1 className="text-5xl font-madimi mt-10">BAZZIN</h1>
      <p className="text-2xl mt-5">بازی و سرگرمی</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mt-10 text-lg leading-relaxed text-justify max-w-3xl mx-auto font-iranyekan">
        {videoList.map(({ name, game }, index) => (
          <article key={index} className="mx-auto ">
            <img
              src={game}
              className="flex justify-center items-center w-32 aspect-square rounded-2xl"
            />
            <p className="text-center mt-2">{name}</p>
          </article>
        ))}
      </div>
      {/* back button */}
      <BackButton pathName="/menu" />
    </section>
  );
}
