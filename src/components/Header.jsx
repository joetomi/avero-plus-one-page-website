import { motion } from "framer-motion";
import { Languages, Menu } from "lucide-react";
import { restaurantData } from "../data/restaurantData.js";

const navKeys = [
  { key: "home", href: "/#home" },
  { key: "about", href: "/#about" },
  { key: "experience", href: "/#experience" },
  { key: "contact", href: "/#contact" },
];

export default function Header({ language, onToggleLanguage }) {
  const copy = restaurantData.ui[language];
  const isArabic = language === "ar";

  return (
    <header
      className="fixed left-3 top-3 z-50 sm:left-5"
      style={{ width: "calc(100vw - 24px)" }}
    >
      <motion.nav
        dir={isArabic ? "rtl" : "ltr"}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={`mx-auto flex w-full max-w-6xl items-center justify-between gap-2 rounded-[8px] border border-coffee/20 px-3 py-2 shadow-[0_18px_45px_rgba(35,27,23,0.22)] ${
          isArabic ? "flex-row-reverse" : ""
        }`}
        style={{ backgroundColor: "#FFF9EF" }}
      >
        <a
          href="/#home"
          className={`flex min-w-0 shrink-0 items-center gap-2 ${isArabic ? "flex-row-reverse" : ""}`}
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-[8px] border border-brass/30 bg-cream">
            <img
              src={restaurantData.images.logo}
              alt="Avero Plus logo"
              className="h-full w-full object-cover"
            />
          </span>
          <span className={`min-w-0 max-w-[8.5rem] sm:max-w-none ${isArabic ? "text-right" : ""}`}>
            <span className="block truncate font-display text-[1.05rem] font-semibold leading-none text-charcoal">
              {restaurantData.name}
            </span>
            <span className="block truncate text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-coffee">
              Misurata
            </span>
          </span>
        </a>

        <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {navKeys.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-[8px] px-3 py-2 text-sm font-bold text-charcoal transition hover:bg-coffee/10 hover:text-espresso"
            >
              {copy.nav[link.key]}
            </a>
          ))}
        </div>

        <div className={`flex shrink-0 items-center gap-2 ${isArabic ? "flex-row-reverse" : ""}`}>
          <button
            type="button"
            onClick={onToggleLanguage}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] border border-coffee/20 bg-cream px-3 text-sm font-bold text-charcoal shadow-[0_10px_24px_rgba(35,27,23,0.08)] transition hover:scale-[1.02] hover:bg-ivory active:scale-[0.98]"
            aria-label={copy.languageAria}
          >
            <Languages size={17} aria-hidden="true" />
            <span>{copy.languageButton}</span>
          </button>

          <a
            href="/menu"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] bg-espresso px-3 text-sm font-semibold text-ivory shadow-soft transition hover:scale-[1.02] hover:bg-charcoal active:scale-[0.98] sm:px-4"
            aria-label={copy.nav.menu}
          >
            <Menu size={17} aria-hidden="true" />
            <span>{copy.nav.menu}</span>
          </a>
        </div>
      </motion.nav>
    </header>
  );
}
