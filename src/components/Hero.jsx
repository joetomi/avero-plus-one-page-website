import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Utensils } from "lucide-react";
import { restaurantData } from "../data/restaurantData.js";

export default function Hero({ language }) {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 520], [0, 90]);
  const copy = restaurantData.ui[language].hero;
  const isArabic = language === "ar";

  return (
    <section id="home" className="relative min-h-[88svh] overflow-hidden bg-charcoal text-ivory">
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-[1.06]">
        <img
          src={restaurantData.images.hero}
          alt="Avero Plus restaurant exterior"
          width={2048}
          height={1366}
          className="h-full w-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,20,18,0.24),rgba(23,20,18,0.82))]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(35,27,23,0.76),rgba(35,27,23,0.22),rgba(35,27,23,0.54))]" />

      <div className="relative mx-auto flex min-h-[88svh] max-w-6xl items-end px-5 pb-10 pt-28 sm:px-7 sm:pb-12 lg:items-center lg:pb-0">
        <motion.div
          dir={isArabic ? "rtl" : "ltr"}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`max-w-2xl ${isArabic ? "text-right" : ""}`}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mb-3 inline-flex items-center gap-2 rounded-[8px] border border-brass/45 bg-ivory/12 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass backdrop-blur"
          >
            <Utensils size={15} aria-hidden="true" />
            {copy.badge}
          </motion.p>
          <h1 className="max-w-[22rem] font-display text-[clamp(3.05rem,14vw,7.2rem)] leading-[0.9] text-ivory sm:max-w-none">
            {restaurantData.name}
          </h1>
          <p className="mt-5 max-w-lg text-xl font-semibold text-ivory sm:text-2xl">
            {copy.tagline}
          </p>
          <p className="mt-3 max-w-md font-body text-lg leading-8 text-cream/92">
            {copy.subline}
          </p>
          <div className={`mt-8 flex flex-wrap gap-3 ${isArabic ? "justify-end" : ""}`}>
            <motion.a
              href="#about"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-brass px-5 text-sm font-bold text-charcoal shadow-soft"
            >
              {copy.details}
              <ArrowDown size={17} aria-hidden="true" />
            </motion.a>
            <motion.a
              href="/menu"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex min-h-12 items-center justify-center rounded-[8px] border border-ivory/38 bg-ivory/12 px-5 text-sm font-bold text-ivory backdrop-blur transition hover:bg-ivory/20"
            >
              {copy.menu}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
