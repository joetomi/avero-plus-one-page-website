import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#F4E8CF]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fff4dd_0%,#f4e8cf_45%,#ead8b5_100%)]" />

          <motion.div
            className="relative flex flex-col items-center justify-center text-center px-4"
            initial="hidden"
            animate="show"
          >
            <motion.img
              src="/assets/emblem.png"
              alt="Avero emblem"
              className="w-[clamp(110px,32vw,180px)] select-none"
              variants={{
                hidden: { opacity: 0, scale: 0.88, y: 8 },
                show: { opacity: 1, scale: 1, y: 0 },
              }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />

            <div className="mt-[18px] overflow-hidden">
              <motion.img
                src="/assets/wordmark.png"
                alt="Avero"
                className="w-[clamp(190px,55vw,330px)] select-none"
                variants={{
                  hidden: { opacity: 0, y: -28, filter: "blur(8px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                transition={{
                  delay: 1,
                  duration: 1.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>

            <motion.img
              src="/assets/tagline.png"
              alt="Journey to Italy"
              className="mt-[10px] w-[clamp(170px,48vw,280px)] select-none"
              variants={{
                hidden: { opacity: 0, y: -8, filter: "blur(5px)" },
                show: { opacity: 1, y: 0, filter: "blur(0px)" },
              }}
              transition={{
                delay: 2.35,
                duration: 0.9,
                ease: "easeOut",
              }}
            />

            <motion.p
              className="mt-12 text-[10px] tracking-[0.45em] text-[#9A4F22]/45 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.1, duration: 0.8 }}
            >
              MISURATA · LIBYA
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
