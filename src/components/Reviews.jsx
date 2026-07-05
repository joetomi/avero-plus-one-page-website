import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { restaurantData } from "../data/restaurantData.js";
import { useGoogleReviews } from "../hooks/useGoogleReviews.js";
import ReviewCard from "./ReviewCard.jsx";
import SectionReveal from "./SectionReveal.jsx";

const fallbackCopy = {
  en: {
    eyebrow: "Guest Reviews",
    title: "Guest Reviews",
    subtitle: "Real experiences from Avero Plus visitors",
    loading: "Loading Google reviews...",
    empty: "Google reviews are temporarily unavailable.",
    notConfigured: "Google reviews are ready to connect.",
    fallback: "TODO: Add the real Google Maps reviews manually. No fake reviews are displayed.",
    previous: "Previous review",
    next: "Next review",
    page: "Review page",
  },
  ar: {
    eyebrow: "آراء الزبائن",
    title: "آراء الزبائن",
    subtitle: "تجارب حقيقية من زوار Avero Plus",
    loading: "جاري تحميل مراجعات Google...",
    empty: "مراجعات Google غير متاحة مؤقتًا.",
    notConfigured: "قسم مراجعات Google جاهز للربط.",
    fallback: "TODO: Add the real Google Maps reviews manually. No fake reviews are displayed.",
    previous: "المراجعة السابقة",
    next: "المراجعة التالية",
    page: "صفحة المراجعات",
  },
};

const getCardsPerView = () => {
  if (typeof window === "undefined") return 1;
  if (window.matchMedia("(min-width: 1024px)").matches) return 3;
  if (window.matchMedia("(min-width: 640px)").matches) return 2;
  return 1;
};

export default function Reviews({ language }) {
  const copy = restaurantData.ui[language].reviews || fallbackCopy[language];
  const isArabic = language === "ar";
  const { reviews, loading, error, configured } = useGoogleReviews();
  const [index, setIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(getCardsPerView);

  useEffect(() => {
    const onResize = () => setCardsPerView(getCardsPerView());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const pageCount = Math.max(1, Math.ceil(reviews.length / cardsPerView));

  useEffect(() => {
    setIndex(0);
  }, [cardsPerView, reviews.length, language]);

  const visibleReviews = useMemo(() => {
    if (!reviews.length) return [];
    const start = index * cardsPerView;
    return reviews.slice(start, start + cardsPerView);
  }, [cardsPerView, index, reviews]);

  const goPrevious = () => setIndex((current) => (current === 0 ? pageCount - 1 : current - 1));
  const goNext = () => setIndex((current) => (current + 1) % pageCount);

  return (
    <SectionReveal id="reviews" className="bg-[#F4E8CF] px-5 py-14 sm:px-7 sm:py-16">
      <div className="mx-auto max-w-6xl" dir={isArabic ? "rtl" : "ltr"}>
        <div className={`mb-7 flex items-end justify-between gap-5 ${isArabic ? "text-right" : ""}`}>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9A4F22]">
              {copy.eyebrow}
            </p>
            <h2 className={`mt-3 text-4xl text-[#6B3518] sm:text-5xl ${isArabic ? "font-body font-bold" : "font-display"}`}>
              {copy.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#9A4F22]">
              {copy.subtitle}
            </p>
          </div>

          {reviews.length > cardsPerView && (
            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={goPrevious}
                className="grid h-11 w-11 place-items-center rounded-[8px] border border-[#9A4F22]/25 bg-[#F7EFE1] text-[#6B3518] transition hover:bg-[#6B3518] hover:text-[#F7EFE1] active:scale-[0.96]"
                aria-label={copy.previous}
              >
                {isArabic ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>
              <button
                type="button"
                onClick={goNext}
                className="grid h-11 w-11 place-items-center rounded-[8px] bg-[#6B3518] text-[#F7EFE1] shadow-soft transition hover:bg-[#9A4F22] active:scale-[0.96]"
                aria-label={copy.next}
              >
                {isArabic ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="rounded-[8px] border border-[#9A4F22]/15 bg-[#F7EFE1] p-5 text-sm font-semibold text-[#6B3518]">
            {copy.loading}
          </div>
        ) : visibleReviews.length ? (
          <>
            <div className="overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${language}-${index}-${cardsPerView}`}
                  initial={{ opacity: 0, x: isArabic ? -18 : 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isArabic ? 18 : -18 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {visibleReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} language={language} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {reviews.length > cardsPerView && (
              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={goPrevious}
                  className="grid h-11 w-11 place-items-center rounded-[8px] border border-[#9A4F22]/25 bg-[#F7EFE1] text-[#6B3518] transition hover:bg-[#6B3518] hover:text-[#F7EFE1] active:scale-[0.96] sm:hidden"
                  aria-label={copy.previous}
                >
                  {isArabic ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>

                <div className="flex items-center justify-center gap-2">
                  {Array.from({ length: pageCount }).map((_, dotIndex) => (
                    <button
                      key={dotIndex}
                      type="button"
                      onClick={() => setIndex(dotIndex)}
                      className={`h-2.5 rounded-full transition ${
                        dotIndex === index ? "w-7 bg-[#6B3518]" : "w-2.5 bg-[#9A4F22]/30"
                      }`}
                      aria-label={`${copy.page} ${dotIndex + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={goNext}
                  className="grid h-11 w-11 place-items-center rounded-[8px] bg-[#6B3518] text-[#F7EFE1] shadow-soft transition hover:bg-[#9A4F22] active:scale-[0.96] sm:hidden"
                  aria-label={copy.next}
                >
                  {isArabic ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className={`rounded-[8px] border border-[#9A4F22]/15 bg-[#F7EFE1] p-5 ${isArabic ? "text-right" : ""}`}>
            <p className="text-sm font-bold text-[#6B3518]">
              {configured ? copy.empty : copy.notConfigured}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#9A4F22]">
              {error || copy.fallback}
            </p>
          </div>
        )}
      </div>
    </SectionReveal>
  );
}
