import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato e Orçamento | ATO Produtos",
  description: "Envie seu briefing e solicite uma cotação personalizada à equipe comercial da ATO Produtos.",
};

export default function ContatoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
