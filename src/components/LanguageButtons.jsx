function setLanguage(lang) {
  // Cookie que usa Google Translate
  document.cookie = `googtrans=/es/${lang}; path=/`;
  document.cookie = `googtrans=/es/${lang}; path=/; domain=${window.location.hostname}`;
  window.location.reload();
}

export default function LanguageButtons() {
  return (
    <div className="lang-buttons">
      <button onClick={() => setLanguage("es")}>ES</button>
      <button onClick={() => setLanguage("en")}>EN</button>
      <button onClick={() => setLanguage("ar")}>AR</button>
    </div>
  );
}
