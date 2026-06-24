"use client";

import { useState } from "react";
import { Button } from "./Button";
import { TextField, TextArea, SelectField } from "./Field";
import { whatsappUrl } from "@/lib/whatsapp";

const serviceOptions = [
  "Projeto de PPCI",
  "Sprinklers",
  "Extintores e hidrantes",
  "Rotas de fuga",
  "Consultoria técnica",
  "Laudo / regularização",
  "Outro",
];

type Status = "idle" | "opened" | "blocked";
type Errors = Partial<Record<"nome" | "telefone" | "email" | "servico", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Secondary capture path (DEC-003). No backend yet: on submit, we compose a
 * WhatsApp message with the form data and open the conversation.
 * Swap for a real endpoint when available.
 *
 * Resilience: window.open is blocked by default on many mobile/strict browsers.
 * We detect that (returns null) and always surface a clickable fallback link so
 * the lead is never stranded. User input is preserved (the form is not reset).
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [waLink, setWaLink] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  function clearError(field: keyof Errors) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nome = String(data.get("nome") || "").trim();
    const email = String(data.get("email") || "").trim();
    const telefone = String(data.get("telefone") || "").trim();
    const servico = String(data.get("servico") || "").trim();
    const mensagem = String(data.get("mensagem") || "").trim();

    // Validate inline (form is noValidate; we own the messages).
    const next: Errors = {};
    if (nome.length < 2) next.nome = "Informe seu nome.";
    const digits = telefone.replace(/\D/g, "");
    if (!telefone) next.telefone = "Informe um telefone para contato.";
    else if (digits.length < 10) next.telefone = "Inclua DDD e número, ex.: (48) 99999-9999.";
    if (!servico) next.servico = "Selecione um tipo de serviço.";
    if (email && !EMAIL_RE.test(email)) next.email = "E-mail inválido. Confira o endereço.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = ["nome", "telefone", "servico", "email"].find((k) => k in next);
      if (first) (form.querySelector(`#${first}`) as HTMLElement | null)?.focus();
      return;
    }

    // Only include lines that actually have content.
    const text = [
      nome && `Olá! Sou ${nome}.`,
      servico && `Serviço: ${servico}`,
      telefone && `Telefone: ${telefone}`,
      email && `E-mail: ${email}`,
      mensagem && `\n${mensagem}`,
    ]
      .filter(Boolean)
      .join("\n");

    const url = whatsappUrl(text);
    setWaLink(url);

    const win = window.open(url, "_blank", "noopener,noreferrer");
    setStatus(win ? "opened" : "blocked");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id="nome"
          name="nome"
          label="Nome"
          required
          maxLength={80}
          autoComplete="name"
          error={errors.nome}
          onChange={() => clearError("nome")}
        />
        <TextField
          id="telefone"
          name="telefone"
          label="Telefone / WhatsApp"
          type="tel"
          required
          maxLength={30}
          autoComplete="tel"
          hint="Com DDD, ex.: (48) 99999-9999."
          error={errors.telefone}
          onChange={() => clearError("telefone")}
        />
      </div>
      <TextField
        id="email"
        name="email"
        label="E-mail"
        type="email"
        maxLength={120}
        autoComplete="email"
        hint="Opcional."
        error={errors.email}
        onChange={() => clearError("email")}
      />
      <SelectField
        id="servico"
        name="servico"
        label="Tipo de serviço"
        defaultValue=""
        required
        error={errors.servico}
        onChange={() => clearError("servico")}
      >
        <option value="" disabled>
          Selecione…
        </option>
        {serviceOptions.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </SelectField>
      <TextArea
        id="mensagem"
        name="mensagem"
        label="Mensagem"
        maxLength={1000}
        placeholder="Conte sobre o imóvel e o que você precisa."
      />
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Button type="submit">Solicitar contato</Button>
      </div>

      {status !== "idle" && (
        <p role="status" className="text-sm leading-relaxed text-muted">
          {status === "opened" ? (
            <>
              Abrimos o WhatsApp em uma nova aba. Não apareceu?{" "}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline underline-offset-4"
              >
                Toque aqui para falar agora
              </a>
              .
            </>
          ) : (
            <>
              Seu navegador bloqueou a nova aba.{" "}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline underline-offset-4"
              >
                Toque aqui para falar no WhatsApp
              </a>
              .
            </>
          )}
        </p>
      )}
    </form>
  );
}
