import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Menu } from "lucide-react";
import { restaurantData } from "../data/restaurantData.js";

export default function MenuComingSoon({ language }) {
  const copy = restaurantData.ui[language].menuPage;
  const isArabic = language === "ar";

  return (
    <main className="flex min-h-[70vh] items-center bg-cream px-5 py-16 text-espresso sm:px-7">
      <motion.section
        dir={isArabic ? "rtl" : "ltr"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-2xl text-center flex flex-col items-center justify-center"
      >
        {/* Emblem circular logo instead of default icon to maintain premium branding */}
        <div className="mb-6 h-24 w-24 rounded-full border border-coffee/10 bg-ivory p-1 shadow-soft overflow-hidden select-none pointer-events-none">
          <img
            src="/assets/emblem.png"
            alt="Avero logo"
            className="h-full w-full object-contain"
          />
        </div>

        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-brass">
          {copy.eyebrow}
        </p>

        <h1 className={`text-4xl sm:text-5xl leading-tight text-espresso ${isArabic ? "font-body font-bold" : "font-display"}`}>
          {copy.title}
        </h1>

        <p className="mt-4 text-lg font-semibold text-coffee/80">
          {copy.subtitle}
        </p>

        <a
          href="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-espresso px-6 text-sm font-bold text-ivory shadow-soft transition hover:bg-charcoal active:scale-[0.98]"
        >
          {isArabic ? <ArrowRight size={18} aria-hidden="true" /> : <ArrowLeft size={18} aria-hidden="true" />}
          {copy.back}
        </a>
      </motion.section>
    </main>
  );
}
