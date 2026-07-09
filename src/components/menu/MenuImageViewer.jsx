import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

function LazyMenuImage({ src, alt, width, height }) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px" }
    );

    const el = ref.current;
    if (el) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="w-full bg-ivory/10"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {isIntersecting && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="m-0 block h-auto w-full max-w-full border-0 p-0"
          draggable="false"
        />
      )}
    </div>
  );
}

export default function MenuImageViewer({ menu, language, direction }) {
  const isArabic = language === "ar";
  const title = isArabic ? menu.labelAr : menu.labelEn;

  let imgWidth = 1890;
  let imgHeight = 3542;

  if (menu.id === "breakfast") {
    imgWidth = 2305;
    imgHeight = 4320;
  } else if (menu.id === "summer") {
    imgWidth = 3344;
    imgHeight = 5012;
  }

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
          {menu.pages.map((page, index) => {
            const isFirst = index === 0;
            return isFirst ? (
              <img
                key={page}
                src={page}
                alt={`${title} page ${index + 1}`}
                width={imgWidth}
                height={imgHeight}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="m-0 block h-auto w-full max-w-full border-0 p-0"
                style={{ aspectRatio: `${imgWidth} / ${imgHeight}` }}
                draggable="false"
              />
            ) : (
              <LazyMenuImage
                key={page}
                src={page}
                alt={`${title} page ${index + 1}`}
                width={imgWidth}
                height={imgHeight}
              />
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
