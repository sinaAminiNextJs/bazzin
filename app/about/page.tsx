import BackButton from "../components/BackButton";

export default function About() {
  return (
    <section className="relative overflow-hidden w-full text-white min-h-screen flex flex-col items-center p-4 pb-20 bg-mybg/96">
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
        به دنیای بازین خوش آمدید. تیم متعهدی که از سال ۱۳۹۵ به ارائه بهترین
        اسباب بازی ها و تجربه های سرگرم کننده برای کودکان و خانواده ها پرداخته
        است. به عقیده این مجموعه بازی نه تنها سرگرمی است بلکه ابزاری مهم برای
        یادگیری و رشد کودکان می باشد‌. از زمان تاسیس، هدف فراهم کردن مجموعه ای
        متنوع و با کیفیت از اسباب بازی های آموزشی، خلاقانه و سرگرم کننده بوده
        است که به پرورش خلاقیت ها و استعدادهای دلبندان شما کمک‌ کند. ما به کیفیت
        محصولات خود اهمیت می‌دهیم و تمام اسباب بازی ها را با دقت انتخاب میکنیم
        تا ایمنی و سرگرمی را برای کودکان شما تضمین کنیم. از اینکه ما را به عنوان
        منبع اسباب بازی های کودکان خود انتخاب کرده اید بسیار سپاسگذاریم. متعهد
        به ارائه خدمات عالی به مشتریان خود هستیم و همیشه آماده پاسخگویی به
        سوالات و نیازهای شما دوستان هستیم.
      </p>
      {/* back button */}
      <BackButton pathName="/menu" />
    </section>
  );
}
