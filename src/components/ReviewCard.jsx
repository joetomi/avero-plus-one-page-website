import { Star } from "lucide-react";

const formatDate = (value, language) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat(language === "ar" ? "ar-LY" : "en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

export default function ReviewCard({ review, language }) {
  const isArabic = language === "ar";
  const rating = Math.max(0, Math.min(5, Number(review.rating) || 0));
  const date = formatDate(review.date, language);

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

      {date && (
        <p className="mt-4 text-xs font-semibold text-[#9A4F22]">
          {date}
        </p>
      )}
    </article>
  );
}
