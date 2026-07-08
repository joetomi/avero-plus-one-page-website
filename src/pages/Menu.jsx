import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MenuHero from "../components/menu/MenuHero.jsx";
import MenuTabs from "../components/menu/MenuTabs.jsx";
import CategoryPills from "../components/menu/CategoryPills.jsx";
import MenuPdfActions from "../components/menu/MenuPdfActions.jsx";
import MenuCard from "../components/menu/MenuCard.jsx";
import SummerDrinkCard from "../components/menu/SummerDrinkCard.jsx";
import { menuCopy, menuItems, menuSections } from "../data/menuData.js";

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

export default function Menu({ language }) {
  const [activeSection, setActiveSection] = useState("summer-drinks");
  const activeSectionData = menuSections.find((section) => section.id === activeSection) || menuSections[0];
  const [activeCategory, setActiveCategory] = useState(activeSectionData.categories[0].id);
  const copy = menuCopy[language];
  const isArabic = language === "ar";

  useEffect(() => {
    setActiveCategory(activeSectionData.categories[0].id);
  }, [activeSectionData]);

  const visibleItems = useMemo(
    () => menuItems.filter((item) => item.section === activeSection && item.category === activeCategory),
    [activeCategory, activeSection],
  );

  const isSummer = activeSection === "summer-drinks";

  return (
    <main className="bg-cream text-espresso">
      <MenuHero language={language} />
      <MenuTabs
        sections={menuSections}
        activeSection={activeSection}
        onChange={setActiveSection}
        language={language}
      />

      <section className="px-5 py-8 sm:px-7 sm:py-10">
        <div className="mx-auto max-w-6xl" dir={isArabic ? "rtl" : "ltr"}>
          <div className={`mb-5 flex flex-col gap-4 rounded-[12px] border border-mocha/15 bg-ivory p-4 shadow-[0_12px_34px_rgba(35,27,23,0.06)] sm:flex-row sm:items-center sm:justify-between ${
            isArabic ? "text-right" : ""
          }`}>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brass">
                {activeSectionData.label[language]}
              </p>
              <h2 className={`mt-2 text-3xl text-espresso ${isArabic ? "font-body font-bold" : "font-display"}`}>
                {activeSectionData.categories.find((category) => category.id === activeCategory)?.label[language]}
              </h2>
            </div>
            <MenuPdfActions section={activeSectionData} language={language} />
          </div>

          <CategoryPills
            categories={activeSectionData.categories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
            language={language}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeSection}-${activeCategory}-${language}`}
              variants={listVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.22 }}
              className={`mt-6 grid gap-3 ${
                isSummer ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {visibleItems.map((item) => (
                isSummer ? (
                  <SummerDrinkCard key={item.id} item={item} language={language} />
                ) : (
                  <MenuCard key={item.id} item={item} language={language} />
                )
              ))}
            </motion.div>
          </AnimatePresence>

          {!visibleItems.length && (
            <div className={`mt-6 rounded-[12px] border border-mocha/15 bg-ivory p-5 shadow-[0_12px_34px_rgba(35,27,23,0.06)] ${
              isArabic ? "text-right" : ""
            }`}>
              <p className="text-base font-bold text-espresso">{copy.emptyTitle}</p>
              <p className="mt-2 text-sm leading-6 text-coffee">{copy.emptyText}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
