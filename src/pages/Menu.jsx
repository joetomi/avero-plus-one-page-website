import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import MenuHero from "../components/menu/MenuHero.jsx";
import MenuImageViewer from "../components/menu/MenuImageViewer.jsx";
import MenuSelector from "../components/menu/MenuSelector.jsx";
import { menuImageData } from "../data/menuImageData.js";

export default function Menu({ language }) {
  const [activeMenuId, setActiveMenuId] = useState("summer");
  const [navDirection, setNavDirection] = useState(1);

  const activeMenu = menuImageData.find((menu) => menu.id === activeMenuId) || menuImageData[0];

  // Ref to store the scroll position of each menu section
  const scrollPositionsRef = useRef({
    summer: 0,
    food: 0,
    coffee: 0,
    breakfast: 0
  });

  const handleSelect = (menuId) => {
    // Save scroll position of current active menu
    scrollPositionsRef.current[activeMenuId] = window.scrollY;

    const newIndex = menuImageData.findIndex((m) => m.id === menuId);
    const oldIndex = menuImageData.findIndex((m) => m.id === activeMenuId);
    setNavDirection(newIndex > oldIndex ? 1 : -1);
    setActiveMenuId(menuId);
  };

  // Restore scroll position when switching menus
  useEffect(() => {
    const targetScroll = scrollPositionsRef.current[activeMenuId] || 0;
    const timer = setTimeout(() => {
      window.scrollTo({ top: targetScroll });
    }, 15);
    return () => clearTimeout(timer);
  }, [activeMenuId]);

  return (
    <main className="bg-cream text-espresso min-h-screen">
      <MenuHero language={language} />
      <MenuSelector
        menus={menuImageData}
        activeId={activeMenu.id}
        onSelect={handleSelect}
        language={language}
      />

      <div className="px-0 pt-6 pb-28 sm:px-7 sm:pt-9 sm:pb-32 select-none">
        {menuImageData.map((menu) => {
          const isActive = menu.id === activeMenuId;
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
