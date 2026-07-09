import { motion } from "framer-motion";

export default function MenuSelector({ menus, activeId, onSelect, language }) {
  const isArabic = language === "ar";

  return (
    <div
      className="w-full max-w-xl mx-auto rounded-[12px] border border-brass/25 bg-espresso/95 p-1 shadow-md"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="grid grid-cols-4 gap-1">
        {menus.map((menu) => {
          const isActive = menu.id === activeId;
          return (
            <button
              key={menu.id}
              type="button"
              onClick={() => onSelect(menu.id)}
              className="relative flex h-[2.8rem] flex-col items-center justify-center rounded-[9px] px-1 py-1 text-center transition-colors duration-200 outline-none select-none"
            >
              {isActive && (
                <motion.div
                  layoutId="activeMenuTab"
                  className="absolute inset-0 bg-brass rounded-[9px] shadow-sm z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {menu.badgeAr && (
                <span
                  className={`absolute -top-1.5 left-1/2 -translate-x-1/2 rounded-[4px] px-1.5 py-0.5 text-[0.52rem] font-bold leading-none shadow-sm z-20 transition-all duration-300 ${
                    isActive 
                      ? "bg-espresso text-brass border border-brass/20" 
                      : "bg-brass text-espresso"
                  }`}
                >
                  {language === "ar" ? menu.badgeAr : "New"}
                </span>
              )}
              <span
                className={`block text-[0.68rem] font-bold leading-tight xs:text-[0.72rem] sm:text-[0.76rem] z-10 relative transition-colors duration-200 ${
                  isActive ? "text-charcoal" : "text-cream/65 hover:text-cream"
                } ${isArabic ? "font-body font-bold" : "font-display"}`}
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
