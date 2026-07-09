import { motion } from "framer-motion";

export default function MenuSelector({ menus, activeId, onSelect, language }) {
  const isArabic = language === "ar";

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-mocha/10 bg-cream/95 px-3 pt-2.5 backdrop-blur-xl shadow-[0_-8px_30px_rgba(35,27,23,0.12)]"
      dir={isArabic ? "rtl" : "ltr"}
      style={{ paddingBottom: "calc(10px + env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="mx-auto grid max-w-2xl grid-cols-4 gap-1.5 sm:gap-2">
        {menus.map((menu) => {
          const isActive = menu.id === activeId;
          return (
            <motion.button
              key={menu.id}
              type="button"
              onClick={() => onSelect(menu.id)}
              whileTap={{ scale: 0.96 }}
              className={`relative flex h-[3.4rem] flex-col items-center justify-center rounded-[10px] border px-1 py-1.5 text-center transition duration-200 ${
                isActive
                  ? "border-brass bg-espresso text-ivory shadow-soft"
                  : "border-mocha/15 bg-ivory text-espresso hover:border-brass/40"
              }`}
            >
              {menu.badgeAr && (
                <span
                  className={`absolute -top-2 left-1/2 -translate-x-1/2 rounded-[6px] px-1.5 py-0.5 text-[0.58rem] font-bold leading-none shadow-[0_2px_8px_rgba(0,0,0,0.06)] ${
                    isActive ? "bg-brass text-charcoal" : "bg-brass/25 text-coffee"
                  }`}
                >
                  {language === "ar" ? menu.badgeAr : "New"}
                </span>
              )}
              <span className={`block text-[0.74rem] font-bold leading-tight xs:text-[0.78rem] sm:text-xs md:text-[0.85rem] ${isArabic ? "font-body" : "font-display"}`}>
                {language === "ar" ? menu.labelAr : menu.labelEn}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
