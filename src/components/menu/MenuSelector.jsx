import { motion } from "framer-motion";

export default function MenuSelector({ menus, activeId, onSelect, language }) {
  const isArabic = language === "ar";

  return (
    <div className="sticky top-[74px] z-30 border-y border-mocha/10 bg-cream/95 px-4 py-3 backdrop-blur-xl sm:px-7">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-2 md:grid-cols-4">
        {menus.map((menu) => {
          const isActive = menu.id === activeId;
          return (
            <motion.button
              key={menu.id}
              type="button"
              onClick={() => onSelect(menu.id)}
              whileTap={{ scale: 0.98 }}
              className={`relative min-h-[4.2rem] overflow-hidden rounded-[12px] border px-3 py-3 text-start transition ${
                isActive
                  ? "border-brass bg-espresso text-ivory shadow-soft"
                  : "border-mocha/15 bg-ivory text-espresso hover:border-brass/60"
              } ${isArabic ? "text-right" : "text-left"}`}
              dir={isArabic ? "rtl" : "ltr"}
            >
              {menu.badgeAr && (
                <span
                  className={`mb-1 inline-flex rounded-[8px] px-2 py-0.5 text-[0.68rem] font-bold ${
                    isActive ? "bg-brass text-charcoal" : "bg-brass/20 text-coffee"
                  }`}
                >
                  {language === "ar" ? menu.badgeAr : "New"}
                </span>
              )}
              <span className={`block text-sm font-bold leading-tight ${isArabic ? "font-body" : ""}`}>
                {language === "ar" ? menu.labelAr : menu.labelEn}
              </span>
              {menu.badgeAr && language === "ar" && (
                <span className={`mt-1 block text-xs ${isActive ? "text-ivory/75" : "text-mocha"}`}>
                  New - Summer Drinks
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
