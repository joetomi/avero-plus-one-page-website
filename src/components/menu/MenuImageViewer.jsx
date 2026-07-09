import { motion } from "framer-motion";

export default function MenuImageViewer({ menu, language, direction }) {
  const isArabic = language === "ar";
  const title = isArabic ? menu.labelAr : menu.labelEn;

  const variants = {
    initial: {
      opacity: 0,
      rotateY: direction > 0 ? 30 : -30,
      x: direction > 0 ? 100 : -100,
      scale: 0.96,
    },
    animate: {
      opacity: 1,
      rotateY: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      }
    },
    exit: {
      opacity: 0,
      rotateY: direction > 0 ? -30 : 30,
      x: direction > 0 ? -100 : 100,
      scale: 0.96,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };

  return (
    <motion.section
      key={menu.id}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      style={{ perspective: 1200 }}
      className="mx-auto w-full max-w-[760px] overflow-hidden px-4 sm:px-0"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Section Editorial Header */}
      <div className="mb-8 flex flex-col items-center text-center">
        <span className="text-[0.62rem] font-bold uppercase tracking-[0.25em] text-brass">
          {isArabic ? "قائمة آڤيرو بلوس" : "Avero Plus Menu"}
        </span>
        <h2 className={`mt-2 text-2xl sm:text-3xl text-espresso font-semibold ${isArabic ? "font-body" : "font-display"}`}>
          {title}
        </h2>
        <div className="mt-3.5 h-[1px] w-12 bg-brass/25" />
      </div>

      <div className="overflow-hidden rounded-[12px] bg-ivory shadow-soft">
        <div className="flex flex-col gap-0 leading-[0]">
          {menu.pages.map((page, index) => (
            <img
              key={page}
              src={page}
              alt={`${title} page ${index + 1}`}
              className="m-0 block h-auto w-full max-w-full border-0 p-0"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              draggable="false"
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
