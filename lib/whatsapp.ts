import { site } from "./site";

/**
 * Build a wa.me deep link with a pre-filled, URL-encoded message.
 * Centralizes the conversion action (see DEC-003).
 */
export function whatsappUrl(message?: string): string {
  const text = encodeURIComponent(message ?? site.whatsappDefaultMessage);
  return `https://wa.me/${site.whatsappNumber}?text=${text}`;
}
