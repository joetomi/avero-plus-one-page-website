export default function CategoryPills({ categories, activeCategory, onChange, language }) {
  const isArabic = language === "ar";

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {categories.map((category) => {
        const active = category.id === activeCategory;
        return (
          <button
            key={category.id}
            type="button"
            aria-selected={active}
            onClick={() => onChange(category.id)}
            className={`min-h-10 shrink-0 rounded-[8px] border px-3 text-xs font-bold transition sm:px-4 ${
              active
                ? "border-brass bg-brass text-charcoal"
                : "border-mocha/20 bg-ivory text-mocha hover:border-brass hover:text-espresso"
            }`}
          >
            {category.label[language]}
          </button>
        );
      })}
    </div>
  );
}
