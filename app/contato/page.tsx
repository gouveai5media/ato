"use client";

import { FormEvent, useState } from "react";
import { PageArrowIcon, SiteFooter, SiteHeader } from "../components/SiteChrome";
import { categories } from "../data/products";

export default function ContatoPage() {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState("Produto promocional");
  const [interest, setInterest] = useState("");
  const [customer, setCustomer] = useState({ razaoSocial: "", cnpj: "", solicitante: "", cargo: "", cidade: "", email: "", telefone: "" });

  function goToProject(event: React.MouseEvent<HTMLButtonElement>) {
    const form = event.currentTarget.form;
    if (!form?.reportValidity()) return;
    const data = new FormData(form);
    setCustomer({
      razaoSocial: String(data.get("razao-social") || ""),
      cnpj: String(data.get("cnpj") || ""),
      solicitante: String(data.get("solicitante") || ""),
      cargo: String(data.get("cargo") || ""),
      cidade: String(data.get("cidade") || ""),
      email: String(data.get("email") || ""),
      telefone: String(data.get("telefone") || ""),
    });
    setStep(2);
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      "Olá, equipe ATO! Gostaria de iniciar um projeto.",
      "",
      `Razão social: ${customer.razaoSocial}`,
      `CNPJ: ${customer.cnpj}`,
      `Solicitante: ${customer.solicitante}`,
      `Cargo / área: ${customer.cargo}`,
      `Cidade: ${customer.cidade}`,
      `E-mail: ${customer.email}`,
      `Telefone: ${customer.telefone}`,
      "",
      `Tipo de projeto: ${projectType}`,
      `Categoria de interesse: ${interest || "A definir com a equipe"}`,
      `Quantidade: ${form.get("quantidade") || "A definir"}`,
      `Prazo desejado: ${form.get("prazo") || "A combinar"}`,
      `Referência: ${form.get("referencia") || "Não informada"}`,
      "",
      `Briefing: ${form.get("mensagem")}`,
    ].join("\n");
    window.open(`https://wa.me/5511915789742?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return <main className="internal-page contact-page">
    <SiteHeader active="contato" />

    <section className="contact-page-hero">
      <div className="contact-orbit" aria-hidden="true" />
      <div className="container contact-hero-grid">
        <div><p className="eyebrow"><span /> Contato</p><h1>Toda grande entrega começa com um <em>bom briefing.</em></h1></div>
        <div className="contact-hero-copy"><p>Conte o que sua marca precisa. Nossa equipe vai orientar materiais, formatos, quantidades e acabamentos para transformar a ideia em um projeto viável.</p><span>Retorno comercial personalizado</span></div>
      </div>
    </section>

    <section className="dynamic-form-section" id="formulario">
      <div className="container dynamic-form-layout">
        <aside className="contact-sidebar">
          <p className="eyebrow dark"><span /> Fale com a ATO</p>
          <h2>Estamos prontos para <em>ouvir sua ideia.</em></h2>
          <div className="contact-channel"><small>E-mail</small><a href="mailto:atoprodutos@atoprodutos.com.br">atoprodutos@atoprodutos.com.br</a></div>
          <div className="contact-channel"><small>Telefone</small><a href="tel:+551156167178">(11) 5616-7178</a></div>
          <div className="contact-channel"><small>Endereço</small><p>R. Galeno de Castro, 189<br />Jurubatuba, São Paulo — SP</p></div>
          <div className="contact-social"><a href="https://www.instagram.com/atoprodutos/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://www.linkedin.com/company/ato-produtos/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
        </aside>

        <div className="dynamic-form-shell">
          <div className="form-progress" aria-label={`Etapa ${step} de 2`}><div className={step >= 1 ? "active" : ""}><span>01</span><p>Seus dados</p></div><i /><div className={step >= 2 ? "active" : ""}><span>02</span><p>Seu projeto</p></div></div>
          <form className="contact-dynamic-form" onSubmit={submitContact}>
            {step === 1 ? <div className="form-step">
              <div className="form-step-head"><small>Etapa 01</small><h2>Primeiro, conte quem está falando com a gente.</h2><p>Essas informações ajudam a direcionar seu atendimento para a pessoa certa.</p></div>
              <div className="dynamic-fields-row"><label><span>Razão social *</span><input name="razao-social" autoComplete="organization" required placeholder="Nome da empresa" defaultValue={customer.razaoSocial} /></label><label><span>CNPJ *</span><input name="cnpj" inputMode="numeric" required placeholder="00.000.000/0000-00" defaultValue={customer.cnpj} /></label></div>
              <div className="dynamic-fields-row"><label><span>Solicitante *</span><input name="solicitante" autoComplete="name" required placeholder="Seu nome" defaultValue={customer.solicitante} /></label><label><span>Cargo / área *</span><input name="cargo" required placeholder="Ex.: Marketing, Compras..." defaultValue={customer.cargo} /></label></div>
              <div className="dynamic-fields-row"><label><span>Cidade / UF *</span><input name="cidade" autoComplete="address-level2" required placeholder="São Paulo / SP" defaultValue={customer.cidade} /></label><label><span>E-mail corporativo *</span><input name="email" type="email" autoComplete="email" required placeholder="voce@empresa.com.br" defaultValue={customer.email} /></label></div>
              <label><span>Telefone / WhatsApp *</span><input name="telefone" autoComplete="tel" required placeholder="(11) 00000-0000" defaultValue={customer.telefone} /></label>
              <div className="dynamic-form-next"><small>Seus dados serão usados apenas para o atendimento deste briefing.</small><button type="button" onClick={goToProject}>Continuar para o projeto <PageArrowIcon /></button></div>
            </div> : <div className="form-step">
              <div className="form-step-head"><small>Etapa 02</small><h2>Agora, vamos dar forma à sua ideia.</h2><p>Você pode preencher somente o que já souber. Nossa equipe ajuda a definir o restante.</p></div>
              <fieldset className="project-type"><legend>O que você precisa? *</legend>{["Produto promocional", "Embalagem personalizada", "Campanha completa", "Falar com um gerente"].map((item) => <label className={projectType === item ? "selected" : ""} key={item}><input type="radio" name="tipo-projeto" value={item} checked={projectType === item} onChange={() => setProjectType(item)} /><span>{item}</span></label>)}</fieldset>
              {projectType !== "Falar com um gerente" && <>
                <div className="dynamic-fields-row"><label><span>Categoria de interesse</span><select name="interesse" value={interest} onChange={(event) => setInterest(event.target.value)}><option value="">Ainda não sei</option>{categories.filter((item) => item !== "Todos").map((item) => <option key={item}>{item}</option>)}<option>Produto exclusivo</option></select></label><label><span>Quantidade estimada</span><input name="quantidade" inputMode="numeric" placeholder="Ex.: 500 unidades" /></label></div>
                <div className="dynamic-fields-row"><label><span>Prazo desejado</span><input name="prazo" placeholder="Ex.: Outubro de 2026" /></label><label><span>Link de referência</span><input name="referencia" type="url" placeholder="https://..." /></label></div>
              </>}
              <label><span>Conte sobre o projeto *</span><textarea name="mensagem" rows={6} required placeholder="Fale sobre a campanha, público, cores, materiais, prazo e resultado esperado..." /></label>
              <div className="project-summary"><span>Resumo do atendimento</span><div><p><small>Projeto</small><strong>{projectType}</strong></p><p><small>Interesse</small><strong>{interest || "A definir"}</strong></p></div></div>
              <div className="dynamic-form-next final"><button className="back-button" type="button" onClick={() => setStep(1)}>← Voltar</button><button type="submit">Preparar briefing no WhatsApp <PageArrowIcon /></button></div>
            </div>}
          </form>
        </div>
      </div>
    </section>

    <section className="contact-reassurance"><div className="container reassurance-grid"><div><strong>Atendimento consultivo</strong><p>Um gerente de contas acompanha o projeto do começo ao fim.</p></div><div><strong>Produção própria</strong><p>Criação, desenvolvimento e fabricação conectados em uma só estrutura.</p></div><div><strong>Cotação personalizada</strong><p>Materiais, quantidade e acabamento definidos para cada necessidade.</p></div></div></section>

    <SiteFooter />
  </main>;
}
