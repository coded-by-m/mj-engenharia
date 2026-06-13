import type { Metadata, Viewport } from "next";
import { Montserrat, Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { SmoothScroll } from "@/components/SmoothScroll";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const SITE_URL = "https://mj.eng.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MJ Engenharia Preventiva | PPCI e SPDA na Grande Florianópolis",
    template: "%s | MJ Engenharia Preventiva",
  },
  description:
    "Projetos de Preventivo Contra Incêndio (PPCI) e SPDA com assinatura de engenheiro, do dimensionamento à aprovação. Atendimento em toda a Grande Florianópolis/SC.",
  keywords: [
    "PPCI",
    "SPDA",
    "projeto preventivo contra incêndio",
    "proteção contra descargas atmosféricas",
    "AVCB",
    "engenharia preventiva",
    "Florianópolis",
    "Grande Florianópolis",
    "Santa Catarina",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "MJ Engenharia Preventiva",
    title: "MJ Engenharia Preventiva: Projetos de PPCI e SPDA",
    description:
      "Engenharia preventiva com foco em projetos de PPCI e SPDA. Falar com um engenheiro.",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/favicon/favicon-180.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#073b4c",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MJ Engenharia Preventiva",
  description:
    "Engenharia preventiva: projetos de PPCI e SPDA na Grande Florianópolis/SC.",
  areaServed: "Grande Florianópolis, Santa Catarina, Brasil",
  // TODO (CONTENT_PENDING): telephone, address, CREA, sameAs (social), url
  knowsAbout: [
    "PPCI",
    "SPDA",
    "Projeto preventivo contra incêndio",
    "Proteção contra descargas atmosféricas",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${inter.variable} ${barlowCondensed.variable}`}
    >
      <body>
        {/* Mark JS active before paint so .reveal elements can hide-then-animate
            without a flash; without JS, content stays visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
        <FloatingWhatsApp />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
