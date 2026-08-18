"use client";

import { useMemo, useState } from "react";
import { FloatingQuote, PageArrowIcon, SiteFooter, SiteHeader } from "../components/SiteChrome";
import { categories, normalize, products, synonyms } from "../data/products";

function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>;
}

export default function CatalogoPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");

  const filteredProducts = useMemo(() => {
    const cleanQuery = normalize(query);
    const tokens = cleanQuery.split(/\s+/).filter(Boolean);
    return products.filter((product) => {
      if (category !== "Todos" && product.category !== category) return false;
      if (!cleanQuery) return true;
      const haystack = normalize([product.name, product.code, product.category, product.material, ...product.tags].join(" "));
      return tokens.every((token) => [token, ...(synonyms[token] ?? [])].some((term) => haystack.includes(term)));
    });
  }, [category, query]);

  function requestProduct(name: string, code: string) {
    const message = `Olá, equipe ATO! Gostaria de solicitar um orçamento para ${name} (${code}).`;
    window.open(`https://wa.me/5511915789742?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return <main className="internal-page catalog-page">
    <SiteHeader active="catalogo" />

    <section className="catalog-hero">
      <div className="catalog-hero-grid" aria-hidden="true" />
      <div className="container catalog-hero-content">
        <div><p className="eyebrow"><span /> Catálogo ATO</p><h1>Encontre o produto certo para a sua <em>próxima campanha.</em></h1></div>
        <div className="catalog-hero-side"><span>Sem preços prontos</span><p>Cada projeto é personalizado em material, acabamento, quantidade e aplicação da marca. Por isso, cada cotação é única.</p></div>
      </div>
      <div className="container catalog-search-panel">
        <label className="catalog-page-search"><SearchIcon /><input aria-label="Buscar no catálogo" placeholder="Busque por nome, código, material ou ocasião..." value={query} onChange={(event) => setQuery(event.target.value)} />{query && <button type="button" onClick={() => setQuery("")} aria-label="Limpar busca">×</button>}</label>
        <div><strong>{filteredProducts.length}</strong><span>{filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}</span></div>
      </div>
    </section>

    <section className="catalog-listing">
      <div className="container">
        <div className="catalog-filter-head"><p>Filtrar por categoria</p><span>Explore nossa seleção e solicite uma cotação personalizada.</span></div>
        <div className="category-tabs catalog-page-tabs" aria-label="Categorias do catálogo">
          {categories.map((item) => <button key={item} type="button" className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
        {filteredProducts.length ? <div className="catalog-page-grid">
          {filteredProducts.map((product, index) => <article className="catalog-product" key={product.code}>
            <div className="catalog-product-image"><span className="catalog-product-index">{String(index + 1).padStart(2, "0")}</span>{product.featured && <span className="product-badge">Destaque</span>}<img src={product.image} alt={product.name} loading="lazy" /><button type="button" onClick={() => requestProduct(product.name, product.code)}>Pedir cotação <PageArrowIcon /></button></div>
            <div className="catalog-product-copy"><div><span>{product.category}</span><small>{product.code}</small></div><h2>{product.name}</h2><p>{product.material}</p></div>
          </article>)}
        </div> : <div className="empty-state catalog-empty"><span>0</span><h3>Nenhum produto encontrado.</h3><p>Tente outro termo ou fale com nossa equipe para desenvolver um produto exclusivo.</p><button type="button" onClick={() => { setQuery(""); setCategory("Todos"); }}>Limpar filtros</button></div>}
      </div>
    </section>

    <section className="catalog-custom-cta">
      <div className="container catalog-custom-grid"><div><p className="eyebrow"><span /> Não encontrou o que imaginou?</p><h2>A gente também desenvolve <em>do zero.</em></h2></div><div><p>Envie sua referência, explique a campanha e deixe nossa equipe combinar formato, materiais, cores e acabamento.</p><a className="primary-link" href="/contato#formulario">Criar produto exclusivo <PageArrowIcon /></a></div></div>
    </section>

    <SiteFooter />
    <FloatingQuote />
  </main>;
}
