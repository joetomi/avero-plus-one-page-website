import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, X } from "lucide-react";

const formatDate = (value, language) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat(language === "ar" ? "ar-LY" : "en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

export default function ReviewCard({ review, language }) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const isArabic = language === "ar";
  const rating = Math.max(0, Math.min(5, Number(review.rating) || 0));
  const date = formatDate(review.date, language);
  const images = Array.isArray(review.images) ? review.images.filter(Boolean) : [];
  const detailLabels = {
    food: isArabic ? "الطعام" : "Food",
    service: isArabic ? "الخدمة" : "Service",
    atmosphere: isArabic ? "الأجواء" : "Atmosphere",
  };

  useEffect(() => {
    if (activePhotoIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActivePhotoIndex(null);
      } else if (e.key === "ArrowLeft") {
        setActivePhotoIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setActivePhotoIndex((prev) => (prev + 1) % images.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, images.length]);

  return (
    <article
      className={`h-full rounded-[8px] border border-[#9A4F22]/15 bg-[#F7EFE1] p-4 shadow-[0_14px_34px_rgba(107,53,24,0.09)] ${
        isArabic ? "text-right" : ""
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="flex items-center gap-3">
        {review.avatar ? (
          <img
            src={review.avatar}
            alt={review.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-11 w-11 shrink-0 rounded-full border border-[#9A4F22]/15 object-cover"
          />
        ) : (
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#9A4F22]/15 bg-[#F4E8CF] font-display text-lg text-[#6B3518]">
            {(review.name || "G").trim().slice(0, 1)}
          </div>
        )}

        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold text-[#6B3518]">
            {review.name}
          </h3>
          {review.reviewerInfo && (
            <p className="mt-0.5 truncate text-[0.68rem] text-[#9A4F22]/85 font-medium">
              {review.reviewerInfo}
            </p>
          )}
          <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#9A4F22]">
            {review.source || "Google Review"}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1 text-[#D8B778]" aria-label={`${rating} stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            aria-hidden="true"
            fill={star <= rating ? "currentColor" : "none"}
            className={star <= rating ? "text-[#D8B778]" : "text-[#9A4F22]/25"}
          />
        ))}
      </div>

      <p className="mt-4 line-clamp-5 min-h-[7.5rem] text-sm leading-6 text-[#6B3518]">
        {review.text}
      </p>

      {review.details && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {Object.entries(detailLabels).map(([key, label]) => (
            review.details[key] ? (
              <div key={key} className="rounded-[8px] bg-[#F4E8CF] px-2 py-2 text-center">
                <p className="text-[0.68rem] font-bold text-[#9A4F22]">{label}</p>
                <p className="mt-1 text-xs font-bold text-[#6B3518]">{review.details[key]}/5</p>
              </div>
            ) : null
          ))}
        </div>
      )}

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {images.map((image, index) => (
            <div
              key={image}
              className="overflow-hidden rounded-[8px] border border-[#9A4F22]/15 aspect-[1.15] w-full cursor-pointer"
              onClick={() => setActivePhotoIndex(index)}
            >
              <img
                src={image}
                alt={`${review.name} review photo ${index + 1}`}
                loading="lazy"
                onError={(event) => {
                  const parent = event.currentTarget.parentElement;
                  if (parent) parent.style.display = "none";
                }}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      )}

      {date && (
        <p className="mt-4 text-xs font-semibold text-[#9A4F22]">
          {date}
        </p>
      )}

      {activePhotoIndex !== null && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setActivePhotoIndex(null)}
        >
          <div 
            className="relative w-full max-w-md bg-[#F7EFE1] p-4 rounded-[12px] border border-[#9A4F22]/20 shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
            dir={isArabic ? "rtl" : "ltr"}
          >
            {/* Header / Close button */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#6B3518]">
                {review.name} - {isArabic ? "صور التقييم" : "Review Photo"} ({activePhotoIndex + 1}/{images.length})
              </span>
              <button
                type="button"
                onClick={() => setActivePhotoIndex(null)}
                className="grid h-8 w-8 place-items-center rounded-full bg-[#F4E8CF] text-[#6B3518] hover:bg-[#6B3518] hover:text-[#F7EFE1] transition duration-200"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Image display */}
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[8px] border border-[#9A4F22]/10 bg-[#F4E8CF] flex items-center justify-center">
              <img
                src={images[activePhotoIndex]}
                alt={`${review.name} review photo enlarged`}
                className="max-h-full max-w-full object-contain select-none"
              />

              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-[#F7EFE1]/90 text-[#6B3518] hover:bg-[#6B3518] hover:text-[#F7EFE1] transition shadow active:scale-95"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIndex((prev) => (prev + 1) % images.length);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-[#F7EFE1]/90 text-[#6B3518] hover:bg-[#6B3518] hover:text-[#F7EFE1] transition shadow active:scale-95"
                    aria-label="Next image"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
