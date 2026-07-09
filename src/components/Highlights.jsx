import { motion } from "framer-motion";
import { Coffee, Sparkles, UsersRound, UtensilsCrossed } from "lucide-react";
import { restaurantData } from "../data/restaurantData.js";
import SectionReveal from "./SectionReveal.jsx";

const icons = [UtensilsCrossed, Coffee, UsersRound, Sparkles];

const list = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Highlights({ language }) {
  const copy = restaurantData.ui[language].highlights;
  const isArabic = language === "ar";

  return (
    <SectionReveal id="experience" className="bg-ivory px-5 py-14 sm:px-7 sm:py-16">
      <div className="mx-auto max-w-6xl" dir={isArabic ? "rtl" : "ltr"}>
        <div className={`mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between ${isArabic ? "text-right" : ""}`}>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brass">
              {copy.eyebrow}
            </p>
            <h2
              className={`mt-3 text-4xl text-espresso sm:text-5xl ${
                isArabic ? "font-body font-bold" : "font-display"
              }`}
            >
              {copy.title}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-mocha">{copy.intro}</p>
        </div>

        <motion.div
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.24 }}
          className="grid gap-3 md:grid-cols-2 lg:grid-cols-4"
        >
          {restaurantData.highlights.map((highlight, index) => {
            const Icon = icons[index] || Sparkles;
            const dims = index === 0 ? { w: 2160, h: 2160 } 
                       : index === 1 ? { w: 3080, h: 4096 } 
                       : index === 2 ? { w: 1440, h: 1800 } 
                       : { w: 2048, h: 2048 };
            return (
              <motion.article
                key={highlight.title.en}
                variants={item}
                whileHover={{ y: -5 }}
                className="overflow-hidden rounded-[8px] border border-coffee/12 bg-cream shadow-[0_12px_38px_rgba(35,27,23,0.08)]"
              >
                <div className="relative aspect-[1.2] overflow-hidden bg-espresso">
                  <img
                    src={highlight.image}
                    alt={highlight.title[language]}
                    width={dims.w}
                    height={dims.h}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  />
                  <div className={`${isArabic ? "right-3" : "left-3"} absolute top-3 grid h-10 w-10 place-items-center rounded-[8px] bg-ivory/92 text-coffee shadow-soft`}>
                    <Icon size={20} aria-hidden="true" />
                  </div>
                </div>
                <div className={`p-4 ${isArabic ? "text-right" : ""}`}>
                  <h3 className={`text-2xl text-espresso ${isArabic ? "font-body font-bold" : "font-display"}`}>
                    {highlight.title[language]}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-coffee">{highlight.text[language]}</p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </SectionReveal>
  );
}
