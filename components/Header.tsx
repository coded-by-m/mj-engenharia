"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { nav, site } from "@/lib/site";
import { WhatsAppCTA } from "./WhatsAppCTA";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-surface py-3 shadow-[0_1px_20px_rgba(7,33,43,0.06)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-site flex items-center justify-between gap-4">
        <a href="#conteudo" aria-label={site.name} className="flex items-center">
          <Image
            src={
              scrolled
                ? "/logo/mj-horizontal-positivo.svg"
                : "/logo/mj-horizontal-negativo.svg"
            }
            alt={site.name}
            width={180}
            height={48}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                scrolled ? "text-ink" : "text-white/90"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <WhatsAppCTA size="md" />
        </div>

        <button
          type="button"
          className={`inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] border lg:hidden ${
            scrolled ? "border-line text-brand" : "border-white/30 text-white"
          }`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden className="text-xl leading-none">
            {open ? "✕" : "☰"}
          </span>
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="container-site mt-3 flex flex-col gap-1 rounded-[var(--radius-md)] border border-line bg-surface p-4 shadow-md lg:hidden"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-medium text-ink hover:bg-mist-50"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-2">
            <WhatsAppCTA size="md" className="w-full" />
          </div>
        </div>
      )}
    </header>
  );
}
