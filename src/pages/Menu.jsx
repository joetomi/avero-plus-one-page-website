import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import MenuHero from "../components/menu/MenuHero.jsx";
import MenuImageViewer from "../components/menu/MenuImageViewer.jsx";
import MenuSelector from "../components/menu/MenuSelector.jsx";
import { menuImageData } from "../data/menuImageData.js";

export default function Menu({ language }) {
  const [activeMenuId, setActiveMenuId] = useState("coffee");
  const activeMenu = menuImageData.find((menu) => menu.id === activeMenuId) || menuImageData[0];

  const handleSelect = (menuId) => {
    setActiveMenuId(menuId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="bg-cream text-espresso">
      <MenuHero language={language} />
      <MenuSelector
        menus={menuImageData}
        activeId={activeMenu.id}
        onSelect={handleSelect}
        language={language}
      />

      <div className="px-0 pt-6 pb-28 sm:px-7 sm:pt-9 sm:pb-32">
        <AnimatePresence mode="wait">
          <MenuImageViewer key={activeMenu.id} menu={activeMenu} language={language} />
        </AnimatePresence>
      </div>
    </main>
  );
}
