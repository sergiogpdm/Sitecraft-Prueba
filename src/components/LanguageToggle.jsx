function setGoogTrans(lang) {
  // Cookie que usa Google Translate
  document.cookie = `googtrans=/es/${lang}; path=/`;
  document.cookie = `googtrans=/es/${lang}; path=/; domain=${window.location.hostname}`;

  // Ajuste visual RTL para árabe
  document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", lang);

  window.location.reload();
}

export default function LanguageToggle() {
  return (
    <div className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur">
      <button
        onClick={() => setGoogTrans("es")}
        className="rounded-lg px-3 py-1.5 text-sm font-medium text-[var(--text)] hover:bg-white/10 transition"
      >
        ES
      </button>
      <button
        onClick={() => setGoogTrans("en")}
        className="rounded-lg px-3 py-1.5 text-sm font-medium text-[var(--text)] hover:bg-white/10 transition"
      >
        EN
      </button>
      <button
        onClick={() => setGoogTrans("ar")}
        className="rounded-lg px-3 py-1.5 text-sm font-medium text-[var(--text)] hover:bg-white/10 transition"
      >
        AR
      </button>
    </div>
  );
}
