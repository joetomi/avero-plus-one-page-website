import { motion } from "framer-motion";

export default function MenuHero({ language }) {
  const isArabic = language === "ar";

  return (
    <section className="relative overflow-hidden bg-cream px-6 pb-12 pt-32 text-center sm:px-8 sm:pb-16 sm:pt-40">
      {/* Soft warm gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{ backgroundImage: "radial-gradient(circle at center, rgba(255, 249, 239, 0.6) 0%, rgba(247, 241, 232, 0.9) 100%)" }}
      />
      
      <motion.div
        dir={isArabic ? "rtl" : "ltr"}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto max-w-3xl"
      >
        {/* Rounded Brand Emblem */}
        <div className="mb-6 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-brass/10 blur opacity-40 group-hover:opacity-75 transition duration-500" />
            <img
              src="/assets/emblem.png"
              alt="Avero Plus Emblem"
              className="relative h-20 w-20 object-contain opacity-90 transition duration-700 hover:rotate-12"
            />
          </div>
        </div>

        {/* Delicate Tagline */}
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.25em] text-brass sm:text-xs">
          {isArabic ? "المذاق الإيطالي الأصيل" : "Authentic Italian Taste"}
        </p>

        {/* Elegant Serif Title */}
        <h1 className={`mt-3 text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight text-espresso ${
          isArabic ? "font-body" : "font-display"
        }`}>
          {isArabic ? "اختر قائمتك" : "Choose Your Menu"}
        </h1>

        {/* Delicate Luxury Divider */}
        <div className="flex items-center justify-center gap-3 my-6">
          <span className="h-[1px] w-12 bg-brass/35" />
          <span className="w-1.5 h-1.5 rotate-45 bg-brass shadow-sm" />
          <span className="h-[1px] w-12 bg-brass/35" />
        </div>

        {/* Curated Subtitle */}
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-coffee/90 sm:text-lg">
          {isArabic
            ? "استكشف قوائم آڤيرو المختارة من الأطباق، القهوة، الفطور، والمشروبات الموسمية."
            : "Discover Avero’s curated selections of food, coffee, breakfast, and seasonal drinks."}
        </p>
      </motion.div>
    </section>
  );
}
