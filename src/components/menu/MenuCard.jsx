import { motion } from "framer-motion";

export default function MenuCard({ item, language }) {
  const isArabic = language === "ar";

  return (
    <motion.article
      layout
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut" } },
      }}
      whileHover={{ y: -2 }}
      className={`rounded-[12px] border border-mocha/20 bg-ivory p-5 shadow-[0_14px_34px_rgba(35,27,23,0.06)] transition hover:shadow-soft ${
        isArabic ? "text-right" : ""
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-espresso">{item.name[language]}</h3>
          <p className="mt-1 text-sm font-semibold text-mocha">
            {item.name[language === "ar" ? "en" : "ar"]}
          </p>
        </div>
        <span className="shrink-0 rounded-[8px] bg-brass px-3 py-1.5 text-xs font-bold text-charcoal">
          {item.price}
        </span>
      </div>
      {item.description?.[language] && (
        <p className="mt-4 text-sm leading-6 text-coffee">
          {item.description[language]}
        </p>
      )}
      {item.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-[8px] border border-mocha/15 px-2 py-1 text-[0.68rem] font-bold text-olivegray">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </motion.article>
  );
}
