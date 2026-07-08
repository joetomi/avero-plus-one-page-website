import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import MenuHero from "../components/menu/MenuHero.jsx";
import MenuTabs from "../components/menu/MenuTabs.jsx";
import MenuPdfActions from "../components/menu/MenuPdfActions.jsx";
import MenuCard from "../components/menu/MenuCard.jsx";
import SummerDrinkCard from "../components/menu/SummerDrinkCard.jsx";
import { menuItems, menuSections } from "../data/menuData.js";

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

export default function Menu({ language }) {
  const [activeSection, setActiveSection] = useState("summer-drinks");
  const isArabic = language === "ar";

  const itemsBySection = useMemo(() => {
    return menuSections.reduce((sections, section) => {
      sections[section.id] = menuItems.filter((item) => item.section === section.id);
      return sections;
    }, {});
  }, []);

  useEffect(() => {
    const sectionElements = menuSections
      .map((section) => document.getElementById(`menu-section-${section.id}`))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.dataset?.sectionId) {
          setActiveSection(visibleEntry.target.dataset.sectionId);
        }
      },
      {
        root: null,
        rootMargin: "-34% 0px -55% 0px",
        threshold: [0.08, 0.18, 0.3, 0.45],
      },
    );

    sectionElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(`menu-section-${sectionId}`);
    if (!element) return;

    const offset = 138;
    const target = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <main className="bg-cream text-espresso">
      <MenuHero language={language} />
      <MenuTabs
        sections={menuSections}
        activeSection={activeSection}
        onChange={scrollToSection}
        language={language}
      />

      <div className="px-5 py-8 sm:px-7 sm:py-10" dir={isArabic ? "rtl" : "ltr"}>
        <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:gap-12">
          {menuSections.map((section) => {
            const sectionItems = itemsBySection[section.id] || [];
            const isSummer = section.id === "summer-drinks";

            return (
              <motion.section
                key={section.id}
                id={`menu-section-${section.id}`}
                data-section-id={section.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="scroll-mt-36"
              >
                <div className={`mb-5 flex flex-col gap-4 rounded-[12px] border border-mocha/15 bg-ivory p-4 shadow-[0_12px_34px_rgba(35,27,23,0.06)] sm:flex-row sm:items-center sm:justify-between ${
                  isArabic ? "text-right" : ""
                }`}>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-brass">
                      {section.label[language]}
                    </p>
                    <h2 className={`mt-2 text-3xl text-espresso ${isArabic ? "font-body font-bold" : "font-display"}`}>
                      {section.label[language]}
                    </h2>
                  </div>
                  <MenuPdfActions section={section} language={language} />
                </div>

                <div className="flex flex-col gap-8">
                  {section.categories.map((category) => {
                    const categoryItems = sectionItems.filter((item) => item.category === category.id);
                    const visibleItems = categoryItems.length ? categoryItems : sectionItems;

                    return (
                      <div key={category.id} className="scroll-mt-44">
                        <div className={`mb-4 flex items-center gap-3 ${isArabic ? "flex-row-reverse text-right" : ""}`}>
                          <span className="h-px flex-1 bg-mocha/15" />
                          <h3 className={`shrink-0 text-2xl text-espresso ${isArabic ? "font-body font-bold" : "font-display"}`}>
                            {category.label[language]}
                          </h3>
                          <span className="h-px flex-1 bg-mocha/15" />
                        </div>

                        <motion.div
                          variants={listVariants}
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true, amount: 0.12 }}
                          className={`grid gap-3 ${
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
                      </div>
                    );
                  })}
                </div>
              </motion.section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
