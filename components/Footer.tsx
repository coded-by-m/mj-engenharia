import Image from "next/image";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-brand-deep text-grey-200/80">
      <div className="container-site py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Image
              src="/logo/mj-horizontal-negativo.svg"
              alt={site.name}
              width={200}
              height={54}
              className="h-11 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Engenharia preventiva: projetos de PPCI e SPDA na{" "}
              {site.region}.
            </p>
            <p className="mt-3 text-sm">
              {site.legalLead} · {site.crea}
            </p>
          </div>

          <nav aria-label="Rodapé">
            <h2 className="font-condensed mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Navegação
            </h2>
            <ul className="space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-condensed mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contato
            </h2>
            <ul className="space-y-2 text-sm">
              <li>{site.region}</li>
              <li>{site.email}</li>
              <li>{site.phone}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-grey-200/60">
          © {site.name}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
