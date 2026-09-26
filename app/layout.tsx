import type { Metadata, Viewport } from "next";
import { Archivo, Inter, Archivo_Narrow } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { SmoothScroll } from "@/components/SmoothScroll";

// Type system — engineered grotesque voice (Archivo superfamily) + Inter body.
// NOTE: display + label faces are a proposed identity change pending client
// sign-off; the brand manual originally specified Montserrat + Barlow Condensed.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
  // Only the display face is preloaded: it sets the hero <h1> (LCP element).
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

const archivoNarrow = Archivo_Narrow({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-archivo-narrow",
  display: "swap",
  preload: false,
});

const SITE_URL = "https://www.mj.eng.br";
const GA_ID = "G-3TSX7WG8GY";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MJ Engenharia Preventiva | PPCI na Grande Florianópolis",
    template: "%s | MJ Engenharia Preventiva",
  },
  description:
    "Projetos de Preventivo Contra Incêndio (PPCI) com assinatura de engenheiro, do dimensionamento à aprovação. Atendimento em toda a Grande Florianópolis/SC.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "PPCI",
    "projeto preventivo contra incêndio",
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
    title: "MJ Engenharia Preventiva: Projetos de PPCI",
    description:
      "Engenharia preventiva com foco em projetos de PPCI. Falar com um engenheiro.",
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
    "Engenharia preventiva: projetos de PPCI na Grande Florianópolis/SC.",
  areaServed: "Grande Florianópolis, Santa Catarina, Brasil",
  // TODO (CONTENT_PENDING): telephone, address, CREA, sameAs (social), url
  knowsAbout: [
    "PPCI",
    "Projeto preventivo contra incêndio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${inter.variable} ${archivoNarrow.variable}`}
    >
      <head>
        {/* Coded Insights — first-party analytics (Coded Tracker). */}
        <script
          defer
          src="https://insights.codedbym.com/tracker/v1.js"
          data-site="ci_pub_b10623f5935db1f1d25a0fa596b80eea"
        ></script>
      </head>
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
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
