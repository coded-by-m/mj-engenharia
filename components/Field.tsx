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

export function TextField({
  label,
  id,
  className = "",
  ...rest
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <Label htmlFor={id!}>{label}</Label>
      <input id={id} className={fieldBase} {...rest} />
    </div>
  );
}

export function TextArea({
  label,
  id,
  className = "",
  ...rest
}: { label: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={className}>
      <Label htmlFor={id!}>{label}</Label>
      <textarea id={id} className={`${fieldBase} min-h-32 resize-y`} {...rest} />
    </div>
  );
}

export function SelectField({
  label,
  id,
  children,
  className = "",
  ...rest
}: { label: string; children: ReactNode } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={className}>
      <Label htmlFor={id!}>{label}</Label>
      <select id={id} className={`${fieldBase} appearance-none`} {...rest}>
        {children}
      </select>
    </div>
  );
}
