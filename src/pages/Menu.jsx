import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import MenuHero from "../components/menu/MenuHero.jsx";
import MenuImageViewer from "../components/menu/MenuImageViewer.jsx";
import MenuSelector from "../components/menu/MenuSelector.jsx";
import { menuImageData } from "../data/menuImageData.js";
import { preloadImages } from "../utils/preloadImages.js";

export default function Menu({ language }) {
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [navDirection, setNavDirection] = useState(1);
  const isArabic = language === "ar";

  // Ref to store the scroll position of each menu section
  const scrollPositionsRef = useRef({
    summer: 0,
    food: 0,
    coffee: 0,
    breakfast: 0
  });

  // Route-based preload when the menu page mounts
  useEffect(() => {
    // 1. Load the 4 cover images immediately
    preloadImages(menuImageData.map((m) => m.cover), { immediate: true });

    // 2. Preload Summer Drinks Page 1 immediately (default/new menu)
    const summerMenu = menuImageData.find((m) => m.id === "summer");
    if (summerMenu && summerMenu.pages.length > 0) {
      preloadImages([summerMenu.pages[0]], { immediate: true });
    }

    // 3. Preload all remaining menu pages in the background with limited concurrency
    const allPages = menuImageData.flatMap((m) => m.pages);
    preloadImages(allPages, { concurrency: 2 });
  }, []);

  const handleSelect = (menuId) => {
    if (selectedMenuId) {
      // Save scroll position of current active menu
      scrollPositionsRef.current[selectedMenuId] = window.scrollY;
    }

    const newIndex = menuImageData.findIndex((m) => m.id === menuId);
    const oldIndex = menuImageData.findIndex((m) => m.id === selectedMenuId);
    setNavDirection(newIndex > oldIndex ? 1 : -1);
    setSelectedMenuId(menuId);
  };

  // Preload all pages of a hovered/touched menu immediately
  const handleCardHover = (menu) => {
    preloadImages(menu.pages, { immediate: true });
  };

  // Restore scroll position when switching menus
  useEffect(() => {
    if (!selectedMenuId) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const targetScroll = scrollPositionsRef.current[selectedMenuId] || 0;
    const timer = setTimeout(() => {
      window.scrollTo({ top: targetScroll });
    }, 15);
    return () => clearTimeout(timer);
  }, [selectedMenuId]);

  if (!selectedMenuId) {
    return (
      <main className="bg-cream text-espresso min-h-screen">
        <MenuHero language={language} />

        <div className="mx-auto w-full max-w-6xl px-5 pb-28 sm:px-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuImageData.map((menu) => (
              <button
                key={menu.id}
                onClick={() => handleSelect(menu.id)}
                onMouseEnter={() => handleCardHover(menu)}
                onTouchStart={() => handleCardHover(menu)}
                className="group relative flex flex-col items-center justify-between rounded-[16px] border border-mocha/12 bg-ivory p-4 shadow-sm hover:shadow-soft hover:border-brass/45 transition-all duration-300 w-full outline-none select-none"
              >
                {menu.id === "summer" && (
                  <span className="absolute top-6 right-6 z-20 rounded-[6px] bg-brass px-2 py-0.5 text-[0.62rem] font-bold text-charcoal shadow-sm">
                    {isArabic ? "الجديد" : "New"}
                  </span>
                )}

                {/* Cover Image Container */}
                <div className="h-[260px] sm:h-[300px] w-full flex items-center justify-center overflow-hidden bg-cream/30 rounded-[10px]">
                  <img
                    src={menu.cover}
                    alt={menu.labelEn}
                    width={menu.id === "food" ? 819 : 1024}
                    height={1024}
                    className="h-full w-full object-contain group-hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Titles */}
                <div className="w-full text-center mt-4">
                  <h3 className={`text-xl sm:text-2xl font-bold text-espresso group-hover:text-brass transition-colors duration-300 ${isArabic ? "font-body" : ""}`}>
                    {menu.labelAr}
                  </h3>
                  <p className="text-xs font-semibold text-coffee mt-1 tracking-wide">
                    {menu.labelEn}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-cream text-espresso min-h-screen">
      {/* Top Header Controls in Viewer */}
      <div className="mx-auto max-w-4xl px-4 pt-28 pb-4 flex flex-col gap-4 sm:px-7 sm:pt-32">
        <div className="flex items-center justify-start">
          <button
            onClick={() => setSelectedMenuId(null)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border border-mocha/15 bg-ivory text-espresso hover:border-brass/40 text-xs font-bold shadow-sm transition active:scale-[0.98] select-none"
          >
            <span>{isArabic ? "→" : "←"}</span>
            <span>{isArabic ? "العودة للقوائم" : "Back to Menus"}</span>
          </button>
        </div>

        <MenuSelector
          menus={menuImageData}
          activeId={selectedMenuId}
          onSelect={handleSelect}
          language={language}
        />
      </div>

      {/* Menu Image Content */}
      <div className="px-0 pt-2 pb-28 sm:px-7 sm:pb-32 select-none">
        {menuImageData.map((menu) => {
          const isActive = menu.id === selectedMenuId;
          return (
            <motion.div
              key={menu.id}
              initial={false}
              animate={isActive ? "active" : "inactive"}
              variants={{
                active: { display: "block", opacity: 1, scale: 1, y: 0 },
                inactive: { display: "none", opacity: 0, scale: 0.97, y: 16 }
              }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <MenuImageViewer
                menu={menu}
                language={language}
                direction={navDirection}
              />
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
