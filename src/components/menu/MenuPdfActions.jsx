import { Download, ExternalLink } from "lucide-react";
import { menuCopy } from "../../data/menuData.js";

export default function MenuPdfActions({ section, language }) {
  const copy = menuCopy[language];

  return (
    <div className="grid gap-3 sm:flex sm:items-center">
      <a
        href={section.pdf}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-brass px-5 text-sm font-bold text-charcoal shadow-soft transition hover:scale-[1.01] active:scale-[0.98]"
      >
        <ExternalLink size={17} aria-hidden="true" />
        {copy.viewPdf}
      </a>
      <a
        href={section.pdf}
        download
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-mocha/20 bg-ivory px-5 text-sm font-bold text-espresso transition hover:border-brass active:scale-[0.98]"
      >
        <Download size={17} aria-hidden="true" />
        {copy.downloadPdf}
      </a>
    </div>
  );
}
