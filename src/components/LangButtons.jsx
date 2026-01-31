function setGoogTrans(lang) {
  // Formato: /idioma_origen/idioma_destino
  document.cookie = `googtrans=/es/${lang}; path=/`;
  document.cookie = `googtrans=/es/${lang}; path=/; domain=${location.hostname}`;
  window.location.reload();
}

export default function LangButtons() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button onClick={() => setGoogTrans("es")}>ES</button>
      <button onClick={() => setGoogTrans("en")}>EN</button>
      <button onClick={() => setGoogTrans("ar")}>AR</button>
    </div>
  );
}
