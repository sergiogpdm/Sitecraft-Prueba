export default function Button({
  as: Comp = "button",
  variant = "default",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition active:scale-[0.99]";

  const styles = {
    default: "border border-white/10 bg-white/5 hover:bg-white/10",
    primary:
      "bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-950 hover:brightness-110",
    ghost: "hover:bg-white/10",
  };

  return <Comp className={`${base} ${styles[variant]} ${className}`} {...props} />;
}
