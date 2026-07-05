import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info, X } from "lucide-react";
import { restaurantData } from "../data/restaurantData.js";

export default function Footer() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <footer className="bg-charcoal px-5 py-8 text-cream sm:px-7">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-[8px] border border-brass/30 bg-cream">
            <img
              src={restaurantData.images.logo}
              alt="Avero Plus logo"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </span>
          <div>
            <p className="font-display text-2xl">{restaurantData.name}</p>
            <p className="text-sm text-cream/70">Italian-inspired dining in Misurata</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
          <motion.button
            type="button"
            onClick={() => setIsAboutOpen(true)}
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.975 }}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] border border-cream/16 px-4 text-sm font-bold text-brass transition hover:bg-cream/8"
          >
            <Info size={18} aria-hidden="true" />
            About Website
          </motion.button>
          <p className="text-sm text-cream/70">© 2026 Avero Plus. All rights reserved.</p>
        </div>
      </div>

      <AnimatePresence>
        {isAboutOpen ? (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-charcoal/72 px-5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-website-title"
            onClick={() => setIsAboutOpen(false)}
          >
            <motion.div
              className="w-full max-w-md rounded-[8px] border border-coffee/12 bg-ivory p-5 text-espresso shadow-soft"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-brass">
                    Website
                  </p>
                  <h2 id="about-website-title" className="mt-2 font-display text-3xl">
                    About Website
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAboutOpen(false)}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] border border-coffee/15 text-coffee transition hover:bg-cream"
                  aria-label="Close about website window"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="mt-5 space-y-4 text-sm leading-7 text-coffee">
                <p>
                  This website is a short one-page presentation for Avero Plus in
                  Misurata, built to introduce the restaurant with official photos,
                  highlights, gallery, and direct contact links.
                </p>
                <p className="text-right text-espresso" dir="rtl">
                  الموقع صفحة تعريفية مختصرة لمطعم افيرو بلس في مصراتة، يعرض نبذة عن
                  المطعم، أبرز التجارب، الصور الرسمية، وروابط التواصل والوصول للموقع.
                </p>
                <p className="text-right text-sm text-mocha" dir="rtl">
                  الخدمات داخل الموقع: عرض التفاصيل، فتح صفحة المنيو المؤقتة، الاتصال
                  بالمطعم، فتح الموقع على الخريطة، وزيارة صفحات فيسبوك وإنستغرام.
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </footer>
  );
}
