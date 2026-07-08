import { motion } from "framer-motion";
import { menuCopy } from "../../data/menuData.js";

export default function MenuHero({ language }) {
  const copy = menuCopy[language];
  const isArabic = language === "ar";

  return (
    <section className="bg-cream px-5 pb-9 pt-28 sm:px-7 sm:pb-12 sm:pt-32">
      <motion.div
        dir={isArabic ? "rtl" : "ltr"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto max-w-6xl overflow-hidden rounded-[12px] border border-mocha/15 bg-ivory px-5 py-8 shadow-soft sm:px-8 sm:py-10 ${
          isArabic ? "text-right" : ""
        }`}
      >
        <div className="mb-5 h-px w-20 bg-brass" />
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brass">
          {copy.badge}
        </p>
        <h1 className={`mt-4 text-5xl leading-tight text-espresso sm:text-6xl ${isArabic ? "font-body font-bold" : "font-display"}`}>
          {copy.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-coffee sm:text-lg">
          {copy.subtitle}
        </p>
      </motion.div>
    </section>
  );
}
