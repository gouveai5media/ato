import type { Metadata } from "next";
import { FloatingQuote, PageArrowIcon, SiteFooter, SiteHeader } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Sobre Nós | ATO Produtos",
  description: "Conheça a ATO Produtos, indústria brasileira de produtos promocionais e embalagens personalizadas.",
};

const journey = [
  { number: "01", title: "Atendimento", text: "O atendimento é personalizado e conta com profissionais técnicos. Seu gerente de contas acompanha todo o processo e será o elo entre a ideia do projeto e o recebimento do produto.", mark: "A" },
  { number: "02", title: "Criação", text: "Nossa equipe desenvolve ideias, artes e layouts para que cada produto seja mais criativo, charmoso e alinhado à identidade da sua marca.", mark: "C" },
  { number: "03", title: "Desenvolvimento", text: "Criação, atendimento e desenvolvimento trabalham juntos na busca por soluções de produto, prazo, materiais e investimento.", mark: "D" },
  { number: "04", title: "PCP — Planejamento de Produção", text: "A equipe do PCP controla integralmente o processo produtivo, garantindo que todas as etapas estejam alinhadas ao prazo acordado.", mark: "P" },
  { number: "05", title: "Fabricação interna", text: "Corte, solda eletrônica, costura, área serigráfica, controle de qualidade e embalagem acontecem em uma estrutura própria com mais de 900m².", mark: "F" },
  { number: "06", title: "Feedback", text: "Acompanhamento sem ruído: seu gerente de contas informa o andamento do pedido e mantém sua equipe atualizada durante a produção.", mark: "↗" },
  { number: "07", title: "Entrega final", text: "Seu pedido é entregue dentro do combinado, com a qualidade, a segurança e o comprometimento que traduzem o padrão ATO Produtos.", mark: "✓" },
];

export default function SobrePage() {
  return <main className="internal-page">
    <SiteHeader active="sobre" />

    <section className="internal-hero about-page-hero">
      <div className="internal-hero-image" aria-hidden="true" />
      <div className="internal-hero-shade" aria-hidden="true" />
      <div className="container internal-hero-content">
        <div className="internal-hero-copy">
          <p className="eyebrow"><span /> Sobre nós</p>
          <h1>Uma indústria movida por <em>ideias que ganham forma.</em></h1>
          <p>Somos a ATO Produtos: uma indústria brasileira jovem, criativa e apaixonada por transformar marcas em produtos que permanecem.</p>
          <div className="internal-hero-actions"><a className="primary-link" href="#nosso-jeito">Conheça nosso jeito <PageArrowIcon /></a><a className="text-link" href="/catalogo">Ver produtos</a></div>
        </div>
        <div className="internal-hero-facts">
          <div><strong>100%</strong><span>produção brasileira</span></div>
          <div><strong>+900m²</strong><span>estrutura própria</span></div>
          <div><strong>360°</strong><span>da criação à entrega</span></div>
        </div>
      </div>
    </section>

    <section className="about-manifesto">
      <div className="container manifesto-grid">
        <div className="manifesto-number">ATO<br /><em>01</em></div>
        <div className="manifesto-copy">
          <p className="eyebrow dark"><span /> Quem somos</p>
          <h2>Design, cores e texturas para manter sua marca <em>à frente.</em></h2>
          <div className="manifesto-columns">
            <p>Fabricamos e personalizamos produtos promocionais e embalagens em solda eletrônica para empresas que querem transformar cada entrega em uma experiência de marca.</p>
            <p>Aqui você encontra pesquisa de tendências, cuidado estético e capacidade produtiva reunidos em um processo próximo, técnico e transparente.</p>
          </div>
        </div>
      </div>
      <div className="container manifesto-gallery">
        <figure className="gallery-large"><img src="/produtos/bolsa-red-velvet.png" alt="Bolsa Red Velvet personalizada" /></figure>
        <figure><img src="/produtos/frasqueira-mini-puffer.jpg" alt="Frasqueira Mini Puffer personalizada" /></figure>
        <div className="gallery-statement"><span>Feito aqui.</span><strong>Personalizado<br />para a sua marca.</strong><small>São Paulo • Brasil</small></div>
      </div>
    </section>

    <section className="way-section" id="nosso-jeito">
      <div className="container way-layout">
        <aside className="way-intro">
          <p className="eyebrow"><span /> Nosso jeito</p>
          <h2>Do início ao fim, <em>com você.</em></h2>
          <p>Um fluxo integrado que combina atendimento consultivo, criação e produção própria para reduzir ruídos e aumentar a qualidade da entrega.</p>
          <div className="way-seal"><img src="/certificados/industria-brasileira.png" alt="Indústria Brasileira" /><span>Estrutura<br />produtiva própria</span></div>
        </aside>
        <div className="journey-list">
          {journey.map((item) => <article className="journey-item" key={item.number}>
            <span className="journey-number">{item.number}</span>
            <div className="journey-mark">{item.mark}</div>
            <div><h3>{item.title}</h3><p>{item.text}</p></div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="about-quality">
      <div className="container about-quality-grid">
        <div className="about-quality-seals"><div><img src="/certificados/iso-9001.png" alt="ISO 9001:2015" /></div><div><img src="/certificados/industria-brasileira.png" alt="Indústria Brasileira" /></div></div>
        <div><p className="eyebrow dark"><span /> Compromisso ATO</p><h2>O cuidado está no processo.<br /><em>E aparece no resultado.</em></h2><p>Planejamento, acompanhamento e controle de qualidade sustentam cada projeto — do primeiro contato à entrega final.</p><a className="primary-link dark-button" href="/contato#formulario">Começar um projeto <PageArrowIcon /></a></div>
      </div>
    </section>

    <SiteFooter />
    <FloatingQuote />
  </main>;
}
