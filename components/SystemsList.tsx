"use client";

import { useId, useState } from "react";

/**
 * Preventive-systems list: a scannable set of highlighted systems as chips,
 * with the remaining systems hidden behind a "+N sistemas" disclosure.
 */
export function SystemsList({
  highlight,
  rest,
}: {
  highlight: readonly string[];
  rest: readonly string[];
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div>
      <p className="kicker mb-3 text-muted">Sistemas projetados</p>

      <ul className="flex flex-wrap gap-2">
        {highlight.map((s) => (
          <li
            key={s}
            className="rounded-full border border-line bg-white px-3 py-1.5 text-sm text-brand-deep"
          >
            {s}
          </li>
        ))}
      </ul>

      {rest.length > 0 && (
        <>
          <div
            id={panelId}
            hidden={!open}
            className="mt-2"
          >
            <ul className="flex flex-wrap gap-2">
              {rest.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-line px-3 py-1.5 text-sm text-muted"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="mt-3 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            {open ? "Mostrar menos" : `+${rest.length} sistemas`}
          </button>
        </>
      )}
    </div>
  );
}
