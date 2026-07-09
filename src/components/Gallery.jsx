import { motion } from "framer-motion";
import { restaurantData } from "../data/restaurantData.js";
import SectionReveal from "./SectionReveal.jsx";

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const tile = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Gallery({ language }) {
  const copy = restaurantData.ui[language].gallery;
  const isArabic = language === "ar";

  return (
    <SectionReveal className="bg-cream px-5 py-14 sm:px-7 sm:py-16">
      <div className="mx-auto max-w-6xl" dir={isArabic ? "rtl" : "ltr"}>
        <div className={`mb-7 flex items-end justify-between gap-5 ${isArabic ? "text-right" : ""}`}>
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
        </div>

        <motion.div
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {restaurantData.gallery.map((item, index) => {
            const dims = index === 0 ? { w: 2048, h: 1366 } 
                       : index === 1 ? { w: 3080, h: 4096 } 
                       : index === 2 ? { w: 2160, h: 2160 } 
                       : { w: 1440, h: 1800 };
            return (
              <motion.figure
                key={item.title.en}
                variants={tile}
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.985 }}
                className={`group relative overflow-hidden rounded-[8px] bg-espresso shadow-soft ${
                  index === 0 ? "col-span-2 aspect-[1.45]" : "aspect-[0.78] sm:aspect-[0.86]"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title[language]}
                  width={dims.w}
                  height={dims.h}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <figcaption className={`absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(23,20,18,0),rgba(23,20,18,0.78))] px-3 pb-3 pt-12 text-sm font-semibold text-ivory ${isArabic ? "text-right" : ""}`}>
                  {item.title[language]}
                </figcaption>
              </motion.figure>
            );
          })}
        </motion.div>
      </div>
    </SectionReveal>
  );
}
