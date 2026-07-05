import SectionReveal from "./SectionReveal.jsx";
import { restaurantData } from "../data/restaurantData.js";

export default function About({ language }) {
  const copy = restaurantData.ui[language].about;
  const isArabic = language === "ar";

  return (
    <SectionReveal id="about" className="bg-cream px-5 py-14 sm:px-7 sm:py-16">
      <div
        dir={isArabic ? "rtl" : "ltr"}
        className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end"
      >
        <div className={isArabic ? "text-right" : ""}>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brass">
            {copy.eyebrow}
          </p>
          <h2
            className={`mt-3 text-4xl leading-tight text-espresso sm:text-5xl ${
              isArabic ? "font-body font-bold" : "font-display"
            }`}
          >
            {copy.title}
          </h2>
        </div>
        <div className={`space-y-4 text-[1.05rem] leading-9 text-coffee ${isArabic ? "text-right" : ""}`}>
          <p>{copy.text}</p>
        </div>
      </div>
    </SectionReveal>
  );
}
