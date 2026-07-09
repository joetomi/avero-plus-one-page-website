import { motion } from "framer-motion";

export default function MenuSelector({ menus, activeId, onSelect, language }) {
  const isArabic = language === "ar";

  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 z-40 w-[calc(100%-24px)] max-w-lg rounded-[16px] border border-mocha/12 bg-cream/90 p-1 backdrop-blur-xl shadow-[0_16px_40px_rgba(35,27,23,0.18)]"
      dir={isArabic ? "rtl" : "ltr"}
      style={{ bottom: "calc(16px + env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="grid grid-cols-4 gap-1">
        {menus.map((menu) => {
          const isActive = menu.id === activeId;
          return (
            <button
              key={menu.id}
              type="button"
              onClick={() => onSelect(menu.id)}
              className="relative flex h-[3.1rem] flex-col items-center justify-center rounded-[11px] px-1 py-1 text-center transition-colors duration-200 outline-none select-none"
            >
              {isActive && (
                <motion.div
                  layoutId="activeMenuTab"
                  className="absolute inset-0 bg-espresso rounded-[11px] shadow-[0_4px_12px_rgba(35,27,23,0.16)] z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {menu.badgeAr && (
                <span
                  className={`absolute -top-2 left-1/2 -translate-x-1/2 rounded-[6px] px-1.5 py-0.5 text-[0.58rem] font-bold leading-none shadow-[0_2px_8px_rgba(0,0,0,0.06)] z-20 transition-colors duration-200 ${
                    isActive ? "bg-brass text-charcoal" : "bg-brass/25 text-coffee"
                  }`}
                >
                  {language === "ar" ? menu.badgeAr : "New"}
                </span>
              )}
              <span
                className={`block text-[0.72rem] font-bold leading-tight xs:text-[0.76rem] sm:text-xs md:text-[0.82rem] z-10 relative transition-colors duration-200 ${
                  isActive ? "text-ivory" : "text-espresso/75"
                } ${isArabic ? "font-body" : "font-display"}`}
              >
                {language === "ar" ? menu.labelAr : menu.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
