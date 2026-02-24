export default function ItinerarySection({ data, preview }) {
  if (!data?.enabled && !preview) return null;

  const items = Array.isArray(data?.items) ? data.items : [];

  return (
    <section className="py-14 sm:py-18">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-0">
        {/* Header */}
        <div className="flex flex-col gap-3">
          {data?.kicker ? (
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-semibold tracking-wide text-[var(--muted)] shadow-sm">
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  background: "linear-gradient(135deg, var(--accentA), var(--accentB))",
                }}
                aria-hidden="true"
              />
              {data.kicker}
            </div>
          ) : null}

          {data?.title ? (
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {data.title}
            </h2>
          ) : null}

          {data?.desc ? (
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              {data.desc}
            </p>
          ) : null}
        </div>

        {/* Timeline */}
        {items.length ? (
          <div className="mt-8">
            <div className="relative">
              {/* Línea vertical */}
              <div className="absolute left-4 top-0 hidden h-full w-px bg-[var(--border)] sm:block" />

              <div className="space-y-4 sm:space-y-5">
                {items.map((item, idx) => {
                  const showTag = item?.tag && String(item.tag).trim();
                  const showLocation = item?.location && String(item.location).trim();

                  return (
                    <div key={idx} className="relative sm:pl-12">
                      {/* Dot */}
                      <div className="absolute left-[10px] top-6 hidden sm:block">
                        <div className="h-3 w-3 rounded-full border border-[var(--border)] bg-[var(--card)]" />
                      </div>

                      <div
                        className={[
                          "group rounded-3xl border border-[var(--border)] bg-[var(--card)]",
                          "p-5 sm:p-6",
                          "shadow-sm transition-transform duration-300",
                          "hover:-translate-y-[1px]",
                        ].join(" ")}
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
                          {/* Left meta */}
                          <div className="sm:w-[140px] sm:shrink-0">
                            <div className="flex items-baseline gap-2">
                              <div className="text-lg font-bold leading-none">
                                {item?.time ?? "—"}
                              </div>
                              {showTag ? (
                                <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--accentSoft)] px-2.5 py-1 text-[11px] font-semibold text-[var(--text)]">
                                  {item.tag}
                                </span>
                              ) : null}
                            </div>

                            {/* Mini divider */}
                            <div className="mt-3 h-px w-16 bg-[var(--border)]" />
                          </div>

                          {/* Content */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <div className="text-base font-semibold leading-snug sm:text-lg">
                                {item?.title ?? "—"}
                              </div>

                              {/* Accent chip (decorativo) */}
                              <span
                                className="hidden h-2.5 w-2.5 shrink-0 rounded-full sm:block"
                                style={{
                                  background:
                                    "linear-gradient(135deg, var(--accentA), var(--accentB))",
                                }}
                                aria-hidden="true"
                              />
                            </div>

                            {item?.desc ? (
                              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                                {item.desc}
                              </p>
                            ) : null}

                            {showLocation ? (
                              <div className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--accentSoft)] px-3 py-2 text-sm">
                                <span className="font-semibold">Lugar</span>
                                <span className="text-[var(--muted)]">·</span>
                                <span className="text-[var(--muted)] break-words">
                                  {item.location}
                                </span>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : preview ? (
          <div className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 text-sm text-[var(--muted)]">
            No hay items todavía. Añade elementos desde el editor.
          </div>
        ) : null}
      </div>
    </section>
  );
}