import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import MenuHero from "../components/menu/MenuHero.jsx";
import MenuImageViewer from "../components/menu/MenuImageViewer.jsx";
import MenuSelector from "../components/menu/MenuSelector.jsx";
import { menuImageData } from "../data/menuImageData.js";

export default function Menu({ language }) {
  const [activeMenuId, setActiveMenuId] = useState("summer");
  const [navDirection, setNavDirection] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const activeMenu = menuImageData.find((menu) => menu.id === activeMenuId) || menuImageData[0];

  const handleSelect = (menuId) => {
    const newIndex = menuImageData.findIndex((m) => m.id === menuId);
    const oldIndex = menuImageData.findIndex((m) => m.id === activeMenuId);
    setNavDirection(newIndex > oldIndex ? 1 : -1);
    setActiveMenuId(menuId);
  };

  // Touch handlers for swipe gestures on mobile
  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      const menuIds = menuImageData.map((m) => m.id);
      const currentIndex = menuIds.indexOf(activeMenuId);
      let nextIndex = currentIndex;

      if (isLeftSwipe) {
        nextIndex = currentIndex + 1; // Swipe left goes to next menu
      } else if (isRightSwipe) {
        nextIndex = currentIndex - 1; // Swipe right goes to previous menu
      }

      if (nextIndex >= 0 && nextIndex < menuIds.length) {
        handleSelect(menuIds[nextIndex]);
      }
    }
  };

  return (
    <main className="bg-cream text-espresso min-h-screen">
      <MenuHero language={language} />
      <MenuSelector
        menus={menuImageData}
        activeId={activeMenu.id}
        onSelect={handleSelect}
        language={language}
      />

      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="px-0 pt-6 pb-28 sm:px-7 sm:pt-9 sm:pb-32 select-none"
      >
        <AnimatePresence mode="wait">
          <MenuImageViewer
            key={activeMenu.id}
            menu={activeMenu}
            language={language}
            direction={navDirection}
          />
        </AnimatePresence>
      </div>
    </main>
  );
}
