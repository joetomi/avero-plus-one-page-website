import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Highlights from "./components/Highlights.jsx";
import Gallery from "./components/Gallery.jsx";
import Reviews from "./components/Reviews.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import MenuComingSoon from "./components/MenuComingSoon.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";

const getInitialLanguage = () => {
  const savedLanguage = window.sessionStorage.getItem("avero-language");
  return savedLanguage === "ar" ? "ar" : "en";
};

function HomePage({ language, onToggleLanguage }) {
  return (
    <div className="min-h-screen bg-cream text-espresso">
      <Header language={language} onToggleLanguage={onToggleLanguage} />
      <main>
        <Hero language={language} />
        <About language={language} />
        <Highlights language={language} />
        <Gallery language={language} />
        <Reviews language={language} />
        <Contact language={language} />
      </main>
      <Footer language={language} />
    </div>
  );
}

function MenuPage({ language, onToggleLanguage }) {
  return (
    <div className="min-h-screen bg-cream text-espresso flex flex-col justify-between">
      <div>
        <Header language={language} onToggleLanguage={onToggleLanguage} />
        <MenuComingSoon language={language} />
      </div>
      <Footer language={language} />
    </div>
  );
}

export default function App() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const [dialog, setDialog] = useState({ visible: false, message: "", nextLanguage: "" });
  const [loading, setLoading] = useState(() => {
    // Show loader only on first open of the session
    const shown = window.sessionStorage.getItem("avero-loader-shown");
    return !shown;
  });
  const path = window.location.pathname.replace(/\/$/, "") || "/";

  useEffect(() => {
    window.sessionStorage.setItem("avero-language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  // 5-second loading timer and scroll lock
  useEffect(() => {
    if (!loading) {
      document.body.style.overflow = "auto";
      return;
    }
    
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      window.sessionStorage.setItem("avero-loader-shown", "true");
      setLoading(false);
      document.body.style.overflow = "auto";
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, [loading]);

  const toggleLanguage = () => {
    const nextLanguage = language === "en" ? "ar" : "en";
    const message = language === "en"
      ? "The language will be changed to Arabic"
      : "سيتم تغيير اللغة إلى الإنجليزية";
    setDialog({ visible: true, message, nextLanguage });
  };

  const handleConfirm = () => {
    setLanguage(dialog.nextLanguage);
    setDialog({ visible: false, message: "", nextLanguage: "" });
  };

  const handleCancel = () => {
    setDialog({ visible: false, message: "", nextLanguage: "" });
  };

  return (
    <>
      {/* Premium loading intro screen */}
      <LoadingScreen isVisible={loading} />

      {/* Main site content */}
      {path === "/menu" ? (
        <MenuPage language={language} onToggleLanguage={toggleLanguage} />
      ) : (
        <HomePage language={language} onToggleLanguage={toggleLanguage} />
      )}

      {/* Language switch confirmation dialog */}
      <AnimatePresence>
        {dialog.visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-charcoal/60 px-5 backdrop-blur-sm"
            onClick={handleCancel}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="w-full max-w-md rounded-[8px] border border-coffee/12 bg-ivory p-6 text-espresso shadow-soft"
              dir={language === "ar" ? "rtl" : "ltr"}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className={`text-2xl text-espresso ${language === "ar" ? "font-body font-bold" : "font-display font-semibold"}`}>
                {language === "en" ? "Change Language" : "تغيير اللغة"}
              </h3>
              <p className="mt-3 font-body text-sm leading-6 text-coffee">
                {dialog.message}
              </p>
              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex min-h-10 items-center justify-center rounded-[8px] border border-coffee/20 bg-cream px-5 text-sm font-bold text-espresso transition hover:bg-ivory active:scale-[0.98]"
                >
                  {language === "en" ? "Cancel" : "إلغاء"}
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="inline-flex min-h-10 items-center justify-center rounded-[8px] bg-espresso px-5 text-sm font-bold text-ivory shadow-soft transition hover:bg-charcoal active:scale-[0.98]"
                >
                  {language === "en" ? "Confirm" : "موافق"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
