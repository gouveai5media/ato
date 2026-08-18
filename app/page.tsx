"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { categories, normalize, products, synonyms, type Product } from "./data/products";

const clientLogos = [
  ["Época Cosméticos", "/clientes/epoca.png"],
  ["MAC", "/clientes/mac.png"],
  ["Blow Gummies", "/clientes/blow-gummies.png"],
  ["Sephora", "/clientes/sephora.png"],
  ["Lowell", "/clientes/lowell.png"],
  ["LG", "/clientes/lg.png"],
  ["Shiseido", "/clientes/shiseido.png"],
  ["Warner Bros.", "/clientes/warner.png"],
  ["Johnson & Johnson", "/clientes/johnson.png"],
  ["Coca-Cola", "/clientes/coca-cola.png"],
  ["Guess", "/clientes/guess.png"],
  ["Foreo", "/clientes/foreo.png"],
  ["Abbott", "/clientes/abbott.png"],
  ["Novartis", "/clientes/novartis.png"],
  ["Petlove", "/clientes/petlove.png"],
];

function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>;
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

function MenuIcon({ open }: { open: boolean }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{open ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>;
}

function ServiceIcon({ type }: { type: "support" | "factory" | "delivery" }) {
  if (type === "support") return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M11 26v-5a13 13 0 0 1 26 0v5" /><path d="M11 24H8v9h7V24h-4ZM37 24h3v9h-7v-9h4ZM37 33c0 5-4 7-10 7" /><path d="M23 40h4" /></svg>;
  if (type === "factory") return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 40h34V20l-10 6v-6l-10 6v-6L7 28v12Z" /><path d="M12 40V10h8v12M14 15h4M14 20h4M13 33h5M25 33h5M36 33h2" /></svg>;
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M5 12h25v24H5zM30 21h8l5 7v8H30z" /><path d="M10 36a4 4 0 1 0 8 0M34 36a4 4 0 1 0 8 0M30 29h13" /></svg>;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [searchFocused, setSearchFocused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      setHeaderScrolled(window.scrollY > 36);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const cleanQuery = normalize(query);
    const baseTokens = cleanQuery.split(/\s+/).filter(Boolean);
    return products
      .filter((product) => category === "Todos" || product.category === category)
      .map((product) => {
        const haystack = normalize([product.name, product.code, product.category, product.material, ...product.tags].join(" "));
        if (!cleanQuery) return { product, score: product.featured ? 2 : 1 };
        const termGroups = baseTokens.map((token) => [token, ...(synonyms[token] ?? [])]);
        if (!termGroups.every((group) => group.some((term) => haystack.includes(term)))) return { product, score: 0 };
        let score = 0;
        if (normalize(product.name).includes(cleanQuery)) score += 12;
        if (normalize(product.code).includes(cleanQuery)) score += 10;
        for (const group of termGroups) for (const token of group) if (haystack.includes(token)) score += token === cleanQuery ? 5 : 1;
        return { product, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ product }) => product);
  }, [category, query]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchFocused(false);
    document.querySelector("#produtos")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function searchFor(term: string) {
    setQuery(term);
    setCategory("Todos");
    setSearchFocused(false);
    window.setTimeout(() => document.querySelector("#produtos")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  function addToQuote(product: Product) {
    setSelectedCodes((current) => current.includes(product.code) ? current : [...current, product.code]);
    setQuoteOpen(true);
  }

  function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const selected = products.filter((product) => selectedCodes.includes(product.code));
    const items = selected.length > 0
      ? selected.map((product) => `• ${product.name} (${product.code})`).join("\n")
      : "• Quero desenvolver um produto personalizado";
    const message = [
      "Olá, equipe ATO! Gostaria de solicitar um orçamento.",
      "",
      `Empresa: ${form.get("empresa")}`,
      `Contato: ${form.get("nome")}`,
      `E-mail: ${form.get("email")}`,
      `Telefone: ${form.get("telefone")}`,
      `Quantidade estimada: ${form.get("quantidade") || "A definir"}`,
      "",
      "Produtos de interesse:",
      items,
      "",
      `Observações: ${form.get("mensagem") || "Sem observações"}`,
    ].join("\n");
    window.open(`https://wa.me/5511915789742?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  function submitHomeContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      "Olá, equipe ATO! Gostaria de receber um orçamento personalizado.",
      "",
      `Razão social: ${form.get("razao-social")}`,
      `CNPJ: ${form.get("cnpj")}`,
      `Solicitante: ${form.get("solicitante")}`,
      `Área / perfil: ${form.get("perfil")}`,
      `Cidade: ${form.get("cidade")}`,
      `E-mail: ${form.get("email")}`,
      `Telefone: ${form.get("telefone")}`,
      "",
      `Briefing: ${form.get("mensagem")}`,
    ].join("\n");
    window.open(`https://wa.me/5511915789742?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <main>
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} aria-hidden="true" />
      <div className="topbar">
        <div className="container topbar-inner"><span>Indústria brasileira • Produção própria</span><a href="tel:+551156167178">Atendimento: (11) 5616-7178</a></div>
      </div>

      <header className={headerScrolled ? "site-header is-fixed" : "site-header"}>
        <div className="container header-inner">
          <a className="brand" href="#inicio" aria-label="ATO Produtos — início"><img src="/ato/logo-ato.png" alt="ATO Produtos" /></a>
          <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Navegação principal">
            <a href="/sobre" onClick={() => setMenuOpen(false)}>A ATO</a>
            <a href="/catalogo" onClick={() => setMenuOpen(false)}>Produtos</a>
            <a href="#processo" onClick={() => setMenuOpen(false)}>Como criamos</a>
            <a href="#clientes" onClick={() => setMenuOpen(false)}>Clientes</a>
            <a href="/contato" onClick={() => setMenuOpen(false)}>Contato</a>
          </nav>
          <a className="header-cta" href="/catalogo">Explorar catálogo <ArrowIcon /></a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}><MenuIcon open={menuOpen} /></button>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="container hero-content">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Design, indústria e personalização</p>
            <h1>Sua marca em produtos que as pessoas <em>querem guardar.</em></h1>
            <p className="hero-description">Criamos brindes promocionais e embalagens com design, textura e acabamento que transformam cada entrega em uma experiência de marca.</p>
            <form className="smart-search" onSubmit={submitSearch} role="search">
              <SearchIcon />
              <input aria-label="Buscar produtos por nome, código, categoria ou material" placeholder="Busque por produto, material ou ocasião..." value={query} onChange={(event) => setQuery(event.target.value)} onFocus={() => setSearchFocused(true)} onBlur={() => window.setTimeout(() => setSearchFocused(false), 160)} />
              <button type="submit">Buscar</button>
              {searchFocused && (
                <div className="search-suggestions">
                  <span>Buscas populares</span>
                  {["Bolsa térmica", "Necessaire", "PVC cristal", "Mochila"].map((term) => <button key={term} type="button" onMouseDown={() => searchFor(term)}><SearchIcon /> {term}</button>)}
                </div>
              )}
            </form>
            <p className="search-hint">Pesquisa por nome, código, categoria, material e termos relacionados.</p>
          </div>
          <div className="hero-stats" aria-label="Diferenciais ATO">
            <div><strong>100%</strong><span>fabricado no Brasil</span></div>
            <div><strong>900m²</strong><span>de estrutura própria</span></div>
            <div><strong>B2B</strong><span>atendimento consultivo</span></div>
          </div>
        </div>
        <a className="scroll-cue" href="#produtos"><span /> Descubra o catálogo</a>
      </section>

      <section className="catalog-section" id="produtos">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow dark"><span /> Catálogo inteligente</p><h2>Escolha o próximo<br /><em>objeto da sua marca.</em></h2></div>
            <p>Selecione uma categoria ou descreva o que procura. Você não verá preços: cada projeto recebe uma cotação personalizada.</p>
          </div>
          <div className="catalog-search-row">
            <label className="catalog-search"><SearchIcon /><input aria-label="Pesquisar no catálogo" placeholder="Ex.: sacola ecológica, frasqueira, C.BS-290..." value={query} onChange={(event) => setQuery(event.target.value)} />{query && <button type="button" onClick={() => setQuery("")} aria-label="Limpar pesquisa">×</button>}</label>
            <span className="result-count">{filteredProducts.length} {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}</span>
          </div>
          <div className="category-tabs" aria-label="Filtrar por categoria">
            {categories.map((item) => <button key={item} type="button" className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product, index) => (
                <article className="product-card" key={product.code} style={{ "--delay": `${index * 45}ms` } as React.CSSProperties}>
                  <div className="product-image-wrap">
                    {product.featured && <span className="product-badge">Destaque</span>}
                    <img src={product.image} alt={product.name} loading="lazy" />
                    <button className="product-action" type="button" onClick={() => addToQuote(product)}>{selectedCodes.includes(product.code) ? "No orçamento" : "Solicitar orçamento"} <ArrowIcon /></button>
                  </div>
                  <div className="product-info"><span>{product.category}</span><h3>{product.name}</h3><div><small>{product.code}</small><small>{product.material}</small></div></div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state"><span>0</span><h3>Não encontramos esse termo.</h3><p>Tente buscar por categoria, material, tipo de uso ou fale com nossa equipe para desenvolver algo exclusivo.</p><button type="button" onClick={() => { setQuery(""); setCategory("Todos"); }}>Ver todos os produtos</button></div>
          )}
        </div>
      </section>

      <section className="about-section" id="sobre">
        <div className="container about-grid">
          <div className="about-visual">
            <div className="about-image about-image-main"><img src="/produtos/bolsa-cherry.png" alt="Bolsa personalizada produzida pela ATO" loading="lazy" /></div>
            <div className="about-image about-image-small"><img src="/produtos/frasqueira-mini-puffer.jpg" alt="Frasqueira personalizada produzida pela ATO" loading="lazy" /></div>
            <div className="made-here"><strong>Feito<br />aqui.</strong><span>Indústria<br />brasileira</span></div>
          </div>
          <div className="about-copy">
            <p className="eyebrow dark"><span /> Sobre a ATO</p>
            <h2>Da ideia ao produto,<br /><em>tudo em um só lugar.</em></h2>
            <p>Somos uma indústria brasileira jovem, criativa e apaixonada pelo que faz. Fabricamos e personalizamos produtos promocionais e embalagens em solda eletrônica para marcas que querem ser lembradas.</p>
            <p>Design, cores e texturas são combinados à capacidade produtiva para criar peças alinhadas às principais tendências do mercado.</p>
            <div className="about-points">
              <div><span>01</span><strong>Criação sob medida</strong><small>Produto, material e acabamento pensados para o seu briefing.</small></div>
              <div><span>02</span><strong>Produção interna</strong><small>Controle do corte, costura, solda eletrônica e personalização.</small></div>
              <div><span>03</span><strong>Qualidade na entrega</strong><small>Acompanhamento técnico do início ao fim do projeto.</small></div>
            </div>
          </div>
        </div>
      </section>

      <section className="process-section" id="processo">
        <div className="process-orbit" aria-hidden="true" />
        <div className="container">
          <div className="process-heading">
            <div><p className="eyebrow"><span /> Um processo completo</p><h2>Seu projeto passa por<br /><em>mãos que entendem.</em></h2></div>
            <p>Um gerente de contas acompanha cada etapa, conectando sua ideia à nossa equipe técnica até a entrega final.</p>
          </div>
          <div className="process-steps">
            <article><span>01</span><div className="step-icon"><ServiceIcon type="support" /></div><h3>Atendimento personalizado</h3><p>Profissionais técnicos e um gerente de contas conectam sua ideia à equipe, do primeiro briefing ao recebimento do produto.</p></article>
            <article><span>02</span><div className="step-icon"><ServiceIcon type="factory" /></div><h3>Fabricação interna</h3><p>Corte, costura, solda eletrônica, área serigráfica, controle de qualidade e embalagem em uma estrutura própria com mais de 900m².</p></article>
            <article><span>03</span><div className="step-icon"><ServiceIcon type="delivery" /></div><h3>Entrega final</h3><p>Sua empresa recebe a mercadoria com qualidade, segurança e o acompanhamento que traduz o padrão ATO em cada detalhe.</p></article>
          </div>
          <div className="capabilities">
            <span>Costura</span><span>Solda eletrônica</span><span>Silk screen</span><span>Baixo relevo</span><span>Embalagem</span><span>Controle de qualidade</span>
          </div>
        </div>
      </section>

      <section className="clients-section" id="clientes">
        <div className="container clients-heading">
          <div><p className="eyebrow dark"><span /> Marcas que confiam</p><h2>Produtos que já levaram<br /><em>grandes marcas.</em></h2></div>
          <p>Projetos promocionais para marcas de beleza, tecnologia, saúde, entretenimento e consumo.</p>
        </div>
        <div className="logo-marquee" aria-label="Clientes atendidos">
          <div className="logo-track">
            {[...clientLogos, ...clientLogos].map(([name, path], index) => (
              <div className="client-logo" key={`${name}-${index}`} aria-hidden={index >= clientLogos.length}>
                <img src={path} alt={index < clientLogos.length ? name : ""} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="certifications-section" id="qualidade">
        <div className="certification-glow" aria-hidden="true" />
        <div className="container certifications-grid">
          <div className="certifications-copy">
            <p className="eyebrow"><span /> Confiança em cada etapa</p>
            <h2>Qualidade que não fica<br />só no <em>discurso.</em></h2>
            <p>Da matéria-prima à embalagem final, nossos processos combinam fabricação nacional, acompanhamento técnico e controle rigoroso para entregar consistência em escala.</p>
            <div className="quality-list">
              <div><span>01</span><p><strong>Produção nacional</strong> com controle próximo de todas as etapas.</p></div>
              <div><span>02</span><p><strong>Processos padronizados</strong> para preservar qualidade e acabamento.</p></div>
              <div><span>03</span><p><strong>Inspeção antes da entrega</strong> para mais segurança no seu projeto.</p></div>
            </div>
          </div>
          <div className="certification-cards">
            <article className="certificate-card featured-certificate">
              <div className="certificate-seal"><img src="/certificados/iso-9001.png" alt="Selo ISO 9001:2015 — Empresa Certificada" /></div>
              <span>Sistema de gestão</span>
              <h3>ISO 9001:2015</h3>
              <p>Compromisso com processos consistentes, melhoria contínua e foco na qualidade.</p>
            </article>
            <article className="certificate-card">
              <div className="certificate-seal"><img src="/certificados/industria-brasileira.png" alt="Selo Indústria Brasileira" /></div>
              <span>Feito no Brasil</span>
              <h3>Indústria brasileira</h3>
              <p>Estrutura produtiva própria em São Paulo, conectando criação e fabricação.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="quote-banner" id="contato">
        <div className="container quote-banner-grid">
          <div className="quote-intro">
            <p className="eyebrow"><span /> Vamos criar juntos?</p>
            <h2>Conte a sua ideia.<br /><em>A gente transforma.</em></h2>
            <p>Selecione produtos no catálogo ou envie seu briefing. Nossa equipe retorna com possibilidades, materiais e uma cotação personalizada.</p>
            <button type="button" onClick={() => setQuoteOpen(true)}>Solicitar orçamento <ArrowIcon /></button>
          </div>
          <div className="contact-card">
            <span>ATO Produtos</span>
            <a href="mailto:atoprodutos@atoprodutos.com.br">atoprodutos@atoprodutos.com.br</a>
            <a href="tel:+551156167178">(11) 5616-7178</a>
            <p>R. Galeno de Castro, 189<br />Jurubatuba, São Paulo — SP</p>
            <div><a href="https://www.instagram.com/atoprodutos/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://www.linkedin.com/company/ato-produtos/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
          </div>
        </div>
      </section>

      <section className="contact-form-section" id="orcamento">
        <div className="container home-form-grid">
          <div className="home-form-intro">
            <p className="eyebrow dark"><span /> Fale com a gente</p>
            <h2>Seu próximo projeto<br />começa com uma <em>boa conversa.</em></h2>
            <p>Compartilhe seu briefing. A equipe comercial da ATO vai entender a necessidade, orientar materiais e acabamentos e preparar uma cotação sob medida.</p>
            <div className="form-support-card">
              <span>Atendimento comercial</span>
              <strong>(11) 5616-7178</strong>
              <a href="mailto:atoprodutos@atoprodutos.com.br">atoprodutos@atoprodutos.com.br <ArrowIcon /></a>
              <small>Segunda a sexta • São Paulo — SP</small>
            </div>
          </div>
          <form className="home-contact-form" onSubmit={submitHomeContact}>
            <div className="home-form-head"><span>01</span><div><small>Solicitação personalizada</small><h3>Conte um pouco sobre sua empresa.</h3></div></div>
            <div className="home-fields-row">
              <label><span>Razão social *</span><input name="razao-social" autoComplete="organization" required placeholder="Nome da empresa" /></label>
              <label><span>CNPJ *</span><input name="cnpj" required inputMode="numeric" placeholder="00.000.000/0000-00" /></label>
            </div>
            <div className="home-fields-row">
              <label><span>Solicitante *</span><input name="solicitante" autoComplete="name" required placeholder="Seu nome" /></label>
              <label><span>Área / perfil *</span><select name="perfil" required defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Marketing</option><option>Compras</option><option>Agência ou revenda</option><option>Empreendedor(a)</option><option>Outro</option></select></label>
            </div>
            <div className="home-fields-row">
              <label><span>Cidade *</span><input name="cidade" autoComplete="address-level2" required placeholder="Cidade / UF" /></label>
              <label><span>E-mail corporativo *</span><input name="email" type="email" autoComplete="email" required placeholder="voce@empresa.com.br" /></label>
            </div>
            <label><span>Telefone / WhatsApp *</span><input name="telefone" autoComplete="tel" required placeholder="(11) 00000-0000" /></label>
            <label><span>Mensagem *</span><textarea name="mensagem" rows={5} required placeholder="Conte sobre o produto, quantidade, campanha, prazo e referências..." /></label>
            <div className="home-form-actions"><small>Ao enviar, o briefing será aberto no WhatsApp oficial da ATO para sua confirmação.</small><button type="submit">Enviar solicitação <ArrowIcon /></button></div>
          </form>
        </div>
      </section>

      <footer>
        <div className="container footer-grid">
          <a className="footer-logo" href="/"><img src="/ato/logo-ato.png" alt="ATO Produtos" /></a>
          <p>Produtos promocionais e embalagens personalizadas, fabricados no Brasil.</p>
          <nav aria-label="Navegação do rodapé"><a href="/sobre">A ATO</a><a href="/catalogo">Produtos</a><a href="#processo">Processo</a><a href="#qualidade">Qualidade</a><a href="/contato">Contato</a></nav>
          <div className="footer-seals"><img src="/certificados/industria-brasileira.png" alt="Indústria Brasileira" /><img src="/certificados/iso-9001.png" alt="ISO 9001:2015" /></div>
          <small>© 2026 ATO Produtos. Todos os direitos reservados.</small>
        </div>
      </footer>

      <button className="quote-float" type="button" onClick={() => setQuoteOpen(true)} aria-label={`Abrir orçamento com ${selectedCodes.length} produtos`}>
        <span className="quote-float-icon"><ArrowIcon /></span><span className="quote-float-copy"><small>Projeto personalizado</small><strong>Solicitar orçamento</strong></span>{selectedCodes.length > 0 && <b>{selectedCodes.length}</b>}
      </button>

      {quoteOpen && (
        <div className="quote-layer" role="presentation">
          <button className="quote-backdrop" type="button" onClick={() => setQuoteOpen(false)} aria-label="Fechar orçamento" />
          <aside className="quote-drawer" role="dialog" aria-modal="true" aria-labelledby="quote-title">
            <div className="quote-drawer-head">
              <div><span>Solicitação de orçamento</span><h2 id="quote-title">Seu projeto começa aqui.</h2></div>
              <button type="button" onClick={() => setQuoteOpen(false)} aria-label="Fechar">×</button>
            </div>
            <div className="selected-products">
              <div className="selected-title"><strong>Produtos selecionados</strong><span>{selectedCodes.length}</span></div>
              {selectedCodes.length ? products.filter((product) => selectedCodes.includes(product.code)).map((product) => (
                <div className="selected-item" key={product.code}>
                  <img src={product.image} alt="" />
                  <div><strong>{product.name}</strong><small>{product.code}</small></div>
                  <button type="button" onClick={() => setSelectedCodes((current) => current.filter((code) => code !== product.code))} aria-label={`Remover ${product.name}`}>×</button>
                </div>
              )) : <p className="no-selection">Nenhum produto selecionado. Você ainda pode enviar um briefing para um projeto exclusivo.</p>}
            </div>
            <form className="quote-form" onSubmit={submitQuote}>
              <div className="form-row"><label>Empresa<input name="empresa" required placeholder="Nome da empresa" /></label><label>Seu nome<input name="nome" required placeholder="Como podemos te chamar?" /></label></div>
              <div className="form-row"><label>E-mail<input name="email" type="email" required placeholder="voce@empresa.com.br" /></label><label>Telefone<input name="telefone" required placeholder="(11) 00000-0000" /></label></div>
              <label>Quantidade estimada<input name="quantidade" inputMode="numeric" placeholder="Ex.: 500 unidades" /></label>
              <label>Conte um pouco sobre o projeto<textarea name="mensagem" rows={4} placeholder="Campanha, prazo, cores, materiais ou referências..." /></label>
              <button className="submit-quote" type="submit">Enviar briefing pelo WhatsApp <ArrowIcon /></button>
              <small>Ao continuar, seu briefing será preparado para envio à equipe comercial da ATO.</small>
            </form>
          </aside>
        </div>
      )}
    </main>
  );
}
