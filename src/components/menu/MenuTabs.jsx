export default function MenuTabs({ sections, activeSection, onChange, language }) {
  const isArabic = language === "ar";

  return (
    <div className="sticky top-[4.75rem] z-30 border-y border-mocha/10 bg-cream/95 px-5 py-3 backdrop-blur-xl sm:px-7">
      <div
        dir={isArabic ? "rtl" : "ltr"}
        role="tablist"
        aria-label="Menu sections"
        className="mx-auto flex max-w-6xl gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {sections.map((section) => {
          const active = section.id === activeSection;
          return (
            <button
              key={section.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(section.id)}
              className={`min-h-11 shrink-0 rounded-[8px] border px-4 text-sm font-bold transition ${
                active
                  ? "border-brass bg-brass text-charcoal shadow-soft"
                  : "border-mocha/20 bg-ivory text-coffee hover:border-brass hover:text-espresso"
              }`}
            >
              {section.label[language]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
