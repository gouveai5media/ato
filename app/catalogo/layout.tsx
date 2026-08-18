import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo de Produtos | ATO Produtos",
  description: "Explore produtos promocionais, bolsas, necessaires, térmicas, embalagens em PVC e projetos personalizados da ATO Produtos.",
};

export default function CatalogoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
