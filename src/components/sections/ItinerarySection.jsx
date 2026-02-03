export default function ItinerarySection({ data, preview }) {
  if (!data?.enabled && !preview) return null;

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-0">
        {data.kicker ? (
          <div className="text-xs font-semibold tracking-wide text-[var(--muted)]">
            {data.kicker}
          </div>
        ) : null}

        <div className="mt-2 text-2xl sm:text-3xl font-semibold">{data.title}</div>

        {data.desc ? (
          <p className="mt-2 text-sm sm:text-base text-[var(--muted)] max-w-prose">
            {data.desc}
          </p>
        ) : null}

        <div className="mt-6 sm:mt-8 space-y-3">
          {(data.items || []).map((item, idx) => (
            <div
              key={idx}
              className={[
                "rounded-3xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-5",
                "flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4",
              ].join(" ")}
            >
              {/* Columna izquierda (hora + tag) */}
              <div className="sm:min-w-[120px] sm:shrink-0">
                <div className="text-base sm:text-lg font-bold leading-snug">
                  {item.time}
                </div>

                {item.tag ? (
                  <div className="mt-2 inline-flex rounded-full border border-[var(--border)] px-2 py-1 text-[11px] font-semibold text-[var(--muted)]">
                    {item.tag}
                  </div>
                ) : null}
              </div>

              {/* Contenido */}
              <div className="min-w-0 flex-1">
                <div className="text-base font-semibold leading-snug">
                  {item.title}
                </div>

                {item.desc ? (
                  <p className="mt-1 text-sm text-[var(--muted)] leading-relaxed break-words">
                    {item.desc}
                  </p>
                ) : null}

                {item.location ? (
                  <div className="mt-2 text-sm flex flex-wrap gap-x-1">
                    <span className="font-semibold">Lugar:</span>
                    <span className="text-[var(--muted)] break-words">
                      {item.location}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
