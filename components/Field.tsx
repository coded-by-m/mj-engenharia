import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from "react";

const fieldBase =
  "w-full rounded-[var(--radius-sm)] border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-brand focus-visible:outline-2 focus-visible:outline-offset-1";

function Label({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
      {children}
    </label>
  );
}

/** Hint (when valid) and error (when invalid) lines, wired for screen readers. */
function FieldNote({ id, hint, error }: { id: string; hint?: string; error?: string }) {
  if (error) {
    return (
      <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-accent">
        {error}
      </p>
    );
  }
  if (hint) {
    return (
      <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
        {hint}
      </p>
    );
  }
  return null;
}

function describedBy(id: string, hint?: string, error?: string) {
  return [error ? `${id}-error` : hint ? `${id}-hint` : null].filter(Boolean).join(" ") || undefined;
}

type FieldExtras = { hint?: string; error?: string };

export function TextField({
  label,
  id,
  hint,
  error,
  className = "",
  ...rest
}: { label: string } & FieldExtras & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <Label htmlFor={id!}>{label}</Label>
      <input
        id={id}
        className={`${fieldBase} ${error ? "border-accent" : ""}`}
        {...rest}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id!, hint, error)}
      />
      <FieldNote id={id!} hint={hint} error={error} />
    </div>
  );
}

export function TextArea({
  label,
  id,
  hint,
  error,
  className = "",
  ...rest
}: { label: string } & FieldExtras & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={className}>
      <Label htmlFor={id!}>{label}</Label>
      <textarea
        id={id}
        className={`${fieldBase} min-h-32 resize-y ${error ? "border-accent" : ""}`}
        {...rest}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id!, hint, error)}
      />
      <FieldNote id={id!} hint={hint} error={error} />
    </div>
  );
}

export function SelectField({
  label,
  id,
  hint,
  error,
  children,
  className = "",
  ...rest
}: { label: string; children: ReactNode } & FieldExtras & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={className}>
      <Label htmlFor={id!}>{label}</Label>
      <select
        id={id}
        className={`${fieldBase} appearance-none ${error ? "border-accent" : ""}`}
        {...rest}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id!, hint, error)}
      >
        {children}
      </select>
      <FieldNote id={id!} hint={hint} error={error} />
    </div>
  );
}
