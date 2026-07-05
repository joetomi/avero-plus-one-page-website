import { motion } from "framer-motion";
import { Clock, Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { restaurantData } from "../data/restaurantData.js";
import SectionReveal from "./SectionReveal.jsx";

export default function Contact({ language }) {
  const copy = restaurantData.ui[language].contact;
  const isArabic = language === "ar";

  const details = [
    { label: copy.labels.location, value: copy.location, icon: MapPin },
    { label: copy.labels.phone, value: restaurantData.phoneDisplay, icon: Phone },
    { label: copy.labels.facebook, value: "averoplus.ly", icon: Facebook },
    { label: copy.labels.hours, value: copy.hours, icon: Clock },
  ];

  return (
    <SectionReveal id="contact" className="bg-ivory px-5 py-14 sm:px-7 sm:py-16">
      <div className="mx-auto max-w-6xl" dir={isArabic ? "rtl" : "ltr"}>
        <div className={`mb-7 ${isArabic ? "text-right" : ""}`}>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brass">
            {copy.eyebrow}
          </p>
          <h2 className={`mt-3 text-4xl text-espresso sm:text-5xl ${isArabic ? "font-body font-bold" : "font-display"}`}>
            {copy.title}
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {details.map((detail) => {
            const Icon = detail.icon;
            return (
              <article
                key={detail.label}
                className={`rounded-[8px] border border-coffee/12 bg-cream p-4 shadow-[0_10px_30px_rgba(35,27,23,0.07)] ${isArabic ? "text-right" : ""}`}
              >
                <Icon className={`mb-4 text-brass ${isArabic ? "mr-0" : ""}`} size={22} aria-hidden="true" />
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-mocha">
                  {detail.label}
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-espresso">
                  {detail.value}
                </p>
              </article>
            );
          })}
        </div>

        <div className={`mt-7 flex flex-col gap-3 sm:flex-row ${isArabic ? "justify-start" : ""}`}>
          <motion.a
            href={restaurantData.phoneHref}
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.975 }}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-espresso px-5 text-sm font-bold text-ivory shadow-soft"
          >
            <Phone size={18} aria-hidden="true" />
            {copy.buttons.call}
          </motion.a>
          <motion.a
            href={restaurantData.facebookUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.975 }}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-coffee/20 bg-cream px-5 text-sm font-bold text-espresso"
          >
            <Facebook size={18} aria-hidden="true" />
            {copy.buttons.facebook}
          </motion.a>
          <motion.a
            href={restaurantData.instagramUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.975 }}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-coffee/20 bg-cream px-5 text-sm font-bold text-espresso"
          >
            <Instagram size={18} aria-hidden="true" />
            {copy.buttons.instagram}
          </motion.a>
          <motion.a
            href={restaurantData.locationUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.975 }}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-coffee/20 bg-cream px-5 text-sm font-bold text-espresso"
          >
            <MapPin size={18} aria-hidden="true" />
            {copy.buttons.location}
          </motion.a>
        </div>
      </div>
    </SectionReveal>
  );
}
