import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Menu } from "lucide-react";
import { restaurantData } from "../data/restaurantData.js";

export default function MenuComingSoon({ language }) {
  const copy = restaurantData.ui[language].menuPage;
  const isArabic = language === "ar";

  return (
    <main className="flex min-h-screen items-center bg-charcoal px-5 pb-12 pt-28 text-ivory sm:px-7">
      <motion.section
        dir={isArabic ? "rtl" : "ltr"}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-3xl"
      >
        <div className="mb-7 inline-flex h-12 w-12 items-center justify-center rounded-[8px] bg-brass text-charcoal">
          <Menu size={24} aria-hidden="true" />
        </div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-brass">
          {copy.eyebrow}
        </p>
        <h1 className={`text-5xl leading-tight sm:text-7xl ${isArabic ? "font-body font-bold" : "font-display"}`}>
          {copy.title}
        </h1>
        <p className="mt-4 text-2xl font-semibold text-cream/82">
          {copy.subtitle}
        </p>
        <a
          href="/"
          className="mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-ivory/24 px-5 text-sm font-bold text-ivory transition hover:bg-ivory/10"
        >
          {isArabic ? <ArrowRight size={18} aria-hidden="true" /> : <ArrowLeft size={18} aria-hidden="true" />}
          {copy.back}
        </a>
      </motion.section>
    </main>
  );
}
