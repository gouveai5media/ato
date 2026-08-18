export type Product = {
  name: string;
  code: string;
  category: string;
  material: string;
  image: string;
  tags: string[];
  featured?: boolean;
};

export const products: Product[] = [
  { name: "Bolsa Valentin", code: "C.BS-290", category: "Bolsas e sacolas", material: "Verniz PU", image: "/produtos/bolsa-valentin.png", tags: ["bolsa", "verniz", "feminina", "ziper", "personalizada"], featured: true },
  { name: "Bolsa Cherry", code: "C.BS-288", category: "Bolsas e sacolas", material: "Verniz PU", image: "/produtos/bolsa-cherry.png", tags: ["bolsa", "verniz", "ombro", "feminina", "presente"], featured: true },
  { name: "Bolsa Red Velvet", code: "C.BS-289", category: "Bolsas e sacolas", material: "Camurção", image: "/produtos/bolsa-red-velvet.png", tags: ["bolsa", "camurca", "cordao", "premium", "moda"], featured: true },
  { name: "Frasqueira Mini Puffer", code: "C.NEC-455", category: "Necessaires", material: "Veludo puffer", image: "/produtos/frasqueira-mini-puffer.jpg", tags: ["necessaire", "frasqueira", "beleza", "cosmetico", "veludo"], featured: true },
  { name: "Bolsa Térmica Premium", code: "C.BT-61-PAL", category: "Térmicas", material: "Palha e térmico", image: "/produtos/bolsa-termica.jpg", tags: ["termica", "lancheira", "alimentos", "bebida", "palha"] },
  { name: "Mochila Urbana", code: "C.MOCH-53", category: "Malas e mochilas", material: "Bidim", image: "/produtos/mochila-urbana.jpg", tags: ["mochila", "notebook", "viagem", "urbana", "corporativo"] },
  { name: "Sacola Cristal", code: "C.BS-20-SC40", category: "PVC solda", material: "PVC cristal", image: "/produtos/sacola-pvc.jpg", tags: ["pvc", "solda", "transparente", "sacola", "embalagem"] },
  { name: "Sacola em Poliéster", code: "C.BS-07-POL", category: "Bolsas e sacolas", material: "Poliéster", image: "/produtos/sacola-poliester.jpg", tags: ["sacola", "bolsa", "poliester", "evento", "brinde"] },
  { name: "Clutch Mini Queops", code: "C.CLU-82-QUE", category: "Necessaires", material: "Sintético", image: "/produtos/clutch-mini.jpg", tags: ["clutch", "necessaire", "carteira", "feminina", "premium"] },
  { name: "Avental Eco", code: "C.DV-37", category: "Ecológicos", material: "Fibra sustentável", image: "/produtos/avental-eco.jpg", tags: ["avental", "eco", "ecologico", "sustentavel", "gastronomia"] },
  { name: "Mini Mochila para Cães", code: "C.PET-16", category: "Produtos pet", material: "Tecido personalizado", image: "/produtos/mini-mochila-pet.jpg", tags: ["pet", "cachorro", "mochila", "passeio", "animal"], featured: true },
  { name: "Chaveiro Love", code: "C.DV-75", category: "Diversos", material: "Montana", image: "/produtos/chaveiro-love.png", tags: ["chaveiro", "presente", "acessorio", "coracao", "brinde"] },
];

export const categories = ["Todos", "Bolsas e sacolas", "Necessaires", "Térmicas", "PVC solda", "Malas e mochilas", "Diversos", "Ecológicos", "Produtos pet"];

export const synonyms: Record<string, string[]> = {
  bolsa: ["sacola", "mochila", "mala", "clutch", "shoulder"],
  sacola: ["bolsa", "ecobag"],
  necessaire: ["frasqueira", "clutch", "organizador", "cosmetico"],
  termica: ["lancheira", "alimento", "bebida", "cooler"],
  ecologico: ["eco", "sustentavel", "lona", "reciclado"],
  embalagem: ["pvc", "sacola", "zip", "solda"],
  viagem: ["mala", "mochila", "frasqueira"],
  pet: ["animal", "cachorro", "gato"],
};

export function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}
