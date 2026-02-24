export default function PhotoStripSection({ data, preview }) {
  if (!data?.enabled && !preview) return null;

  const photos = Array.isArray(data?.photos)
    ? data.photos.slice(0, 5)
    : [];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1400px] px-6">
        {(data?.kicker || data?.title) && (
          <div className="mb-10">
            {data?.kicker && (
              <div className="text-xs font-semibold tracking-wide text-[var(--muted)]">
                {data.kicker}
              </div>
            )}

            {data?.title && (
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                {data.title}
              </h2>
            )}

            {data?.note && (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
                {data.note}
              </p>
            )}
          </div>
        )}

        {photos.length > 0 ? (
          <div className="grid grid-cols-12 auto-rows-[200px] gap-4">
            {photos.map((src, i) => {
              let span = "";

              // 1️⃣ grande
              if (i === 0) span = "col-span-6 row-span-2";

              // 2️⃣ alta
              else if (i === 1) span = "col-span-3 row-span-2";

              // 3️⃣ igual que 2
              else if (i === 2) span = "col-span-3 row-span-2";

              // 4️⃣ grande igual que 1
              else if (i === 3) span = "col-span-6 row-span-2";

              // 5️⃣ mismo tamaño que 4
              else if (i === 4) span = "col-span-6 row-span-2";

              return (
                <div
                  key={i}
                  className={[
                    "group relative overflow-hidden rounded-3xl",
                    "border border-[var(--border)] bg-[var(--card)]",
                    "shadow-sm transition-transform duration-300",
                    "hover:-translate-y-[2px]",
                    span,
                  ].join(" ")}
                >
                  {src ? (
                    <img
                      src={src}
                      alt={`photo-${i + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-[var(--muted)]">
                      Foto {i + 1}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : preview ? (
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 text-sm text-[var(--muted)]">
            No hay fotos todavía. Añade imágenes desde el editor.
          </div>
        ) : null}
      </div>
    </section>
  );
}