import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ATO Produtos — Brindes Promocionais",
  description: "Produtos promocionais e embalagens personalizadas, fabricados no Brasil com design, qualidade e produção própria.",
  other: { "codex-preview": "development" },
  icons: { icon: "/ato/logo-ato.png", shortcut: "/ato/logo-ato.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
