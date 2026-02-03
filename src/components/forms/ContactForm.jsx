import { useId, useMemo, useRef, useState } from "react";

/**
 * ContactForm
 * - 3 campos: name, phone, message
 * - Validación automática (onBlur + feedback en vivo)
 * - Envío: email (mailto) o WhatsApp (wa.me)
 *
 * Props (editables desde config.copy.contactForm):
 * - variant: "card" | "split" | "minimal"
 * - title, subtitle, submitText, privacyText
 * - labels / placeholders
 * - minMessageLength
 * - destination: { type: "email"|"whatsapp"|"none", emailTo, whatsappTo, subject }
 */
export default function ContactForm({
  variant = "card",
  title = "Pide información",
  subtitle = "Rellena el formulario y te contestamos lo antes posible.",
  submitText = "Enviar",
  privacyText = "Al enviar aceptas ser contactado por este medio.",
  labels = { name: "Nombre", phone: "Teléfono", message: "Consulta" },
  placeholders = {
    name: "Tu nombre",
    phone: "+34 600 000 000",
    message: "Cuéntanos tu caso o lo que necesitas…",
  },

  minMessageLength = 10,

  fields = { name: true, phone: true, message: true },

  destination = {
    type: "none", // "email" | "whatsapp" | "none"
    emailTo: "",
    whatsappTo: "", // ej: "34600111222" (sin +, sin espacios)
    subject: "Nueva consulta desde la web",
  },

  className = "",
}) {
  const rid = useId();

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const msgRef = useRef(null);

  const [values, setValues] = useState({
    name: "",
    phone: "",
    message: "",
    website: "", // honeypot anti-bots
  });

  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    message: false,
  });

  // idle | sending | ok | error
  const [status, setStatus] = useState({ type: "idle", msg: "" });

  const styles = useMemo(() => {
    const baseInput =
      "w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 " +
      "bg-[var(--card)] text-[var(--text)] border-[var(--border)] focus:ring-[color:var(--accentB)]";

    const baseLabel = "text-sm font-medium text-[var(--text)]";
    const baseHelp = "text-xs text-[var(--muted)]";

    const variants = {
      card: {
        wrap:
          "rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] " +
          "shadow-[0_var(--shadowY)_var(--shadowBlur)_rgba(0,0,0,var(--shadowOpacity))] p-6 md:p-8",
        grid: "grid gap-4",
        header: "mb-5",
      },
      split: {
        wrap:
          "rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] overflow-hidden " +
          "shadow-[0_var(--shadowY)_var(--shadowBlur)_rgba(0,0,0,var(--shadowOpacity))]",
        grid: "grid md:grid-cols-2",
        header:
          "p-6 md:p-8 bg-[color:var(--bg)] border-b md:border-b-0 md:border-r border-[var(--border)]",
        form: "p-6 md:p-8",
      },
      minimal: {
        wrap: "p-0",
        grid: "grid gap-4",
        header: "mb-4",
      },
    };

    return { baseInput, baseLabel, baseHelp, v: variants[variant] ?? variants.card };
  }, [variant]);

  const setField = (key) => (e) => {
    const val = e.target.value;
    setValues((p) => ({ ...p, [key]: val }));
    // si estaba en error, al escribir volvemos a idle
    if (status.type !== "sending") setStatus({ type: "idle", msg: "" });
  };

  const onBlur = (key) => () => setTouched((p) => ({ ...p, [key]: true }));

  // ------------------
  // Validación
  // ------------------

  const normalizePhone = (s) => String(s || "").replace(/[^\d+]/g, "").trim();
  const isValidName = (s) => s.trim().length >= 2;

  // “Suave”: mínimo 9 dígitos
  const isValidPhone = (s) => {
    const x = normalizePhone(s);
    const digits = x.replace(/[^\d]/g, "");
    return digits.length >= 9;
  };

  const isValidMessage = (s) => s.trim().length >= Number(minMessageLength || 0);

  const errors = useMemo(() => {
    const e = {};

    if (fields?.name !== false && !isValidName(values.name))
      e.name = "Escribe un nombre (mín. 2 caracteres).";

    if (fields?.phone !== false && !isValidPhone(values.phone))
      e.phone = "Escribe un teléfono válido (mín. 9 dígitos).";

    if (fields?.message !== false && !isValidMessage(values.message))
      e.message = `La consulta debe tener al menos ${minMessageLength} caracteres.`;

    if (values.website.trim()) e.website = "Anti-spam activado.";

    if (destination?.type === "email" && !(destination?.emailTo || "").trim())
      e.destination = "Falta configurar el email de destino.";
    if (destination?.type === "whatsapp" && !(destination?.whatsappTo || "").trim())
      e.destination = "Falta configurar el número de WhatsApp de destino.";

    return e;
  }, [values, minMessageLength, destination, fields]);


  const isFormValid = Object.keys(errors).length === 0;
  const fieldError = (key) => (touched[key] ? errors[key] : "");

  const touchAll = () =>
    setTouched({
      name: true,
      phone: true,
      message: fields?.message !== false,
    });


  const focusFirstError = () => {
    if (errors.name) nameRef.current?.focus();
    else if (errors.phone) phoneRef.current?.focus();
    else if (errors.message) msgRef.current?.focus();
  };

  // ------------------
  // Envío (email / whatsapp)
  // ------------------

  const buildText = () => {
    const n = values.name.trim();
    const p = values.phone.trim();
    const m = values.message.trim();

    let txt = `Nombre: ${n}\nTeléfono: ${p}`;
    if (fields?.message !== false) {
      txt += `\n\nConsulta:\n${m}`;
    }
    return txt;
  };


  const openEmail = () => {
    const to = (destination.emailTo || "").trim();
    const subject = destination.subject || "Nueva consulta";
    const body = buildText();
    const url =
      `mailto:${encodeURIComponent(to)}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  const openWhatsApp = () => {
    const to = String(destination.whatsappTo || "").replace(/[^\d]/g, "");
    const text = buildText();
    const url = `https://wa.me/${to}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Evita “doble click”: si está enviando, ignoramos
    if (status.type === "sending") return;

    // 1) Marcar todos y validar
    touchAll();

    if (!isFormValid) {
      setStatus({ type: "error", msg: "Revisa los campos marcados." });
      // 2) Enfocar el primer error en el MISMO click
      focusFirstError();
      return;
    }

    // 3) Envío (abre mailto o whatsapp)
    try {
      setStatus({ type: "sending", msg: "" });

      if (destination?.type === "email") openEmail();
      else if (destination?.type === "whatsapp") openWhatsApp();
      else {
        setStatus({
          type: "ok",
          msg: "Formulario correcto. Configura un destino (email o WhatsApp).",
        });
        return;
      }

      setStatus({ type: "ok", msg: "Listo ✅ Se ha abierto el envío." });
      setValues({ name: "", phone: "", message: "", website: "" });
      setTouched({ name: false, phone: false, message: false });

      // volvemos a idle para que el botón quede normal
      setTimeout(() => setStatus({ type: "idle", msg: "" }), 1200);
    } catch {
      setStatus({ type: "error", msg: "No se pudo enviar. Inténtalo de nuevo." });
    }
  };

  const SubmitButton = ({ children, disabled }) => (
    <button
      type="submit"
      disabled={disabled}
      className={
        "w-full rounded-[var(--btnRadius)] px-5 py-3 font-semibold transition " +
        "bg-[linear-gradient(135deg,var(--accentA),var(--accentB))] text-white " +
        "disabled:opacity-60 disabled:cursor-not-allowed"
      }
    >
      {children}
    </button>
  );

  const ErrorText = ({ text }) => (text ? <div className="mt-1 text-xs text-rose-500">{text}</div> : null);

  const renderHeader = () => (
    <div className={styles.v.header}>
      <h3 className="text-xl font-bold text-[var(--text)]">{title}</h3>
      {subtitle ? <p className="mt-1 text-[var(--muted)]">{subtitle}</p> : null}
    </div>
  );

  const renderFormFields = () => (
    <form onSubmit={handleSubmit} className={variant === "split" ? "grid gap-4" : styles.v.grid}>
      {/* Honeypot invisible */}
      <input
        tabIndex={-1}
        autoComplete="off"
        value={values.website}
        onChange={setField("website")}
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-2">
        <label className={styles.baseLabel} htmlFor={`${rid}-name`}>
          {labels.name}
        </label>
        <input
          ref={nameRef}
          id={`${rid}-name`}
          name="name"
          value={values.name}
          onChange={setField("name")}
          onBlur={onBlur("name")}
          placeholder={placeholders.name}
          className={styles.baseInput}
          autoComplete="name"
        />
        <ErrorText text={fieldError("name")} />
      </div>

      <div className="grid gap-2">
        <label className={styles.baseLabel} htmlFor={`${rid}-phone`}>
          {labels.phone}
        </label>
        <input
          ref={phoneRef}
          id={`${rid}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          value={values.phone}
          onChange={setField("phone")}
          onBlur={onBlur("phone")}
          placeholder={placeholders.phone}
          className={styles.baseInput}
          autoComplete="tel"
        />
        <ErrorText text={fieldError("phone")} />
      </div>

      {fields?.message !== false ? (
        <div className="grid gap-2">
          <label className={styles.baseLabel} htmlFor={`${rid}-message`}>
            {labels.message}
          </label>
          <textarea
            ref={msgRef}
            id={`${rid}-message`}
            name="message"
            rows={5}
            value={values.message}
            onChange={setField("message")}
            onBlur={onBlur("message")}
            placeholder={placeholders.message}
            className={styles.baseInput}
          />
          <ErrorText text={fieldError("message")} />
          {privacyText ? <p className={styles.baseHelp}>{privacyText}</p> : null}
        </div>
      ) : null}


      {/* Error de destino */}
      {errors.destination ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {errors.destination}
        </div>
      ) : null}

      {status.type !== "idle" ? (
        <div
          className={
            "rounded-xl border px-4 py-3 text-sm " +
            (status.type === "ok"
              ? "border-emerald-200 text-emerald-700 bg-emerald-50"
              : status.type === "sending"
                ? "border-zinc-200 text-zinc-700 bg-zinc-50"
                : "border-rose-200 text-rose-700 bg-rose-50")
          }
          role="status"
          aria-live="polite"
        >
          {status.type === "sending" ? "Enviando…" : status.msg}
        </div>
      ) : null}

      {/* ✅ Botón SIEMPRE clicable; solo se deshabilita mientras “sending” */}
      <SubmitButton disabled={status.type === "sending"}>
        {status.type === "sending" ? "Enviando…" : submitText}
      </SubmitButton>
    </form>
  );

  if (variant === "split") {
    return (
      <section className={`${styles.v.wrap} ${className}`}>
        <div className={styles.v.grid}>
          <div className={styles.v.header}>
            {renderHeader()}
            <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
              <li>• Respuesta rápida</li>
              <li>• Atención personalizada</li>
              <li>• Sin compromiso</li>
            </ul>
          </div>
          <div className={styles.v.form}>{renderFormFields()}</div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.v.wrap} ${className}`}>
      {renderHeader()}
      {renderFormFields()}
    </section>
  );
}
