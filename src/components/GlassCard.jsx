export default function GlassCard({ className = "", children }) {
  return (
    <div
      style={{
        borderRadius: "var(--radius)",
        backdropFilter: `blur(var(--cardBlur))`,
        WebkitBackdropFilter: `blur(var(--cardBlur))`,
        boxShadow: "var(--cardShadow)",
      }}
      className={[
        "border bg-[var(--card)]",
        "border-[var(--border)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
