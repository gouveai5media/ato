"use client";

import { useEffect, useState } from "react";

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

function MenuIcon({ open }: { open: boolean }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{open ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>;
}

export function SiteHeader({ active }: { active?: "sobre" | "catalogo" | "contato" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setHeaderScrolled(window.scrollY > 36);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return <>
    <div className="topbar internal-topbar"><div className="container topbar-inner"><span>Indústria brasileira • Produção própria</span><a href="tel:+551156167178">Atendimento: (11) 5616-7178</a></div></div>
    <header className={headerScrolled ? "site-header internal-header is-fixed" : "site-header internal-header"}>
      <div className="container header-inner">
        <a className="brand" href="/" aria-label="ATO Produtos — início"><img src="/ato/logo-ato.png" alt="ATO Produtos" /></a>
        <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Navegação principal">
          <a className={active === "sobre" ? "current" : ""} href="/sobre" onClick={() => setMenuOpen(false)}>A ATO</a>
          <a className={active === "catalogo" ? "current" : ""} href="/catalogo" onClick={() => setMenuOpen(false)}>Produtos</a>
          <a href="/#processo" onClick={() => setMenuOpen(false)}>Como criamos</a>
          <a href="/#clientes" onClick={() => setMenuOpen(false)}>Clientes</a>
          <a className={active === "contato" ? "current" : ""} href="/contato" onClick={() => setMenuOpen(false)}>Contato</a>
        </nav>
        <a className="header-cta" href="/catalogo">Explorar catálogo <ArrowIcon /></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}><MenuIcon open={menuOpen} /></button>
      </div>
    </header>
  </>;
}

export function SiteFooter() {
  return <footer>
    <div className="container footer-grid">
      <a className="footer-logo" href="/"><img src="/ato/logo-ato.png" alt="ATO Produtos" /></a>
      <p>Produtos promocionais e embalagens personalizadas, fabricados no Brasil.</p>
      <nav aria-label="Navegação do rodapé"><a href="/sobre">A ATO</a><a href="/catalogo">Produtos</a><a href="/#processo">Processo</a><a href="/#qualidade">Qualidade</a><a href="/contato">Contato</a></nav>
      <div className="footer-seals"><img src="/certificados/industria-brasileira.png" alt="Indústria Brasileira" /><img src="/certificados/iso-9001.png" alt="ISO 9001:2015" /></div>
      <small>© 2026 ATO Produtos. Todos os direitos reservados.</small>
    </div>
  </footer>;
}

export function FloatingQuote() {
  return <a className="quote-float static-link" href="/contato#formulario" aria-label="Solicitar orçamento">
    <span className="quote-float-icon"><ArrowIcon /></span><span className="quote-float-copy"><small>Projeto personalizado</small><strong>Solicitar orçamento</strong></span>
  </a>;
}

export function PageArrowIcon() {
  return <ArrowIcon />;
}
