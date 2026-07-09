import { motion } from "framer-motion";

export default function MenuImageViewer({ menu, language }) {
  const isArabic = language === "ar";
  const title = isArabic ? menu.labelAr : menu.labelEn;

  return (
    <motion.section
      key={menu.id}
      initial={{ opacity: 0, scale: 0.97, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-[960px]"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className={`mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${isArabic ? "text-right" : ""}`}>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brass">
            Avero Plus
          </p>
          <h2 className={`mt-1 text-3xl text-espresso sm:text-4xl ${isArabic ? "font-body font-bold" : "font-display"}`}>
            {title}
          </h2>
        </div>
        {menu.pdf && (
          <div className="grid gap-2 sm:flex">
            <a
              href={menu.pdf}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-[8px] bg-brass px-4 text-sm font-bold text-charcoal shadow-soft transition hover:scale-[1.01] active:scale-[0.98]"
            >
              {isArabic ? "عرض PDF الأصلي" : "View Original PDF"}
            </a>
            <a
              href={menu.pdf}
              download
              className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-mocha/20 bg-ivory px-4 text-sm font-bold text-espresso transition hover:border-brass active:scale-[0.98]"
            >
              {isArabic ? "تحميل PDF" : "Download PDF"}
            </a>
          </div>
        )}
      </div>

      <div className="overflow-hidden rounded-[12px] bg-ivory shadow-soft">
        <div className="flex flex-col gap-0 leading-[0]">
          {menu.pages.map((page, index) => (
            <img
              key={page}
              src={page}
              alt={`${title} page ${index + 1}`}
              className="m-0 block h-auto w-full max-w-full border-0 p-0"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
              draggable="false"
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
