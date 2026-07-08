import { motion } from "framer-motion";

export default function SummerDrinkCard({ item, language }) {
  const isArabic = language === "ar";
  const alt = isArabic
    ? `مشروب ${item.name.ar} من آفيرو`
    : `Avero ${item.name.en} summer drink`;

  return (
    <motion.article
      layout
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut" } },
      }}
      whileHover={{ y: -2 }}
      className={`group rounded-[12px] border border-mocha/20 bg-ivory p-4 shadow-[0_14px_34px_rgba(35,27,23,0.06)] transition hover:shadow-soft ${
        isArabic ? "text-right" : ""
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="grid aspect-[1.02] place-items-center overflow-hidden rounded-[8px] bg-cream p-3">
        <img
          src={item.image}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-espresso">{item.name[language]}</h3>
          <p className="mt-1 text-sm font-semibold text-mocha">
            {item.name[language === "ar" ? "en" : "ar"]}
          </p>
        </div>
        <span className="shrink-0 rounded-[8px] border border-brass bg-brass/15 px-3 py-1.5 text-xs font-bold text-espresso">
          {item.price}
        </span>
      </div>
      {item.description[language] && (
        <p className="mt-3 text-sm leading-6 text-coffee">
          {item.description[language]}
        </p>
      )}
    </motion.article>
  );
}
