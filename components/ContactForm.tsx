"use client";

import { useState } from "react";
import { Button } from "./Button";
import { TextField, TextArea, SelectField } from "./Field";
import { whatsappUrl } from "@/lib/whatsapp";

const serviceOptions = [
  "Projeto de PPCI",
  "Projeto de SPDA",
  "Sprinklers",
  "Extintores e hidrantes",
  "Rotas de fuga",
  "Consultoria técnica",
  "Laudo / regularização",
  "Outro",
];

/**
 * Secondary capture path (DEC-003). No backend yet: on submit, we compose a
 * WhatsApp message with the form data and open the conversation.
 * Swap for a real endpoint when available.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nome = String(data.get("nome") || "");
    const email = String(data.get("email") || "");
    const telefone = String(data.get("telefone") || "");
    const servico = String(data.get("servico") || "");
    const mensagem = String(data.get("mensagem") || "");
    const text = `Olá! Sou ${nome}.\nServiço: ${servico}\nTelefone: ${telefone}\nE-mail: ${email}\n\n${mensagem}`;
    setSent(true);
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="nome" name="nome" label="Nome" required autoComplete="name" />
        <TextField
          id="telefone"
          name="telefone"
          label="Telefone / WhatsApp"
          type="tel"
          required
          autoComplete="tel"
        />
      </div>
      <TextField
        id="email"
        name="email"
        label="E-mail"
        type="email"
        autoComplete="email"
      />
      <SelectField id="servico" name="servico" label="Tipo de serviço" defaultValue="">
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
        placeholder="Conte sobre o imóvel e o que você precisa."
      />
      <div className="flex items-center gap-4">
        <Button type="submit">Solicitar contato</Button>
        {sent && (
          <span className="text-sm text-muted" role="status">
            Abrindo o WhatsApp…
          </span>
        )}
      </div>
    </form>
  );
}
