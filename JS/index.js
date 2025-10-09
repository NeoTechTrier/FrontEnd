const produtos = [
  {
    id: 1,
    nome: "Mouse Gamer Logitech G502 HERO",
    categoria: "Periféricos",
    preco: 349.9,
    descricao: "Mouse gamer com 11 botões programáveis e sensor HERO 25K.",
  },
  {
    id: 2,
    nome: "Teclado Mecânico Redragon Kumara K552",
    categoria: "Periféricos",
    preco: 289.9,
    descricao: "Teclado mecânico com switches Outemu Blue e iluminação RGB.",
  },

  // 💾 Memória RAM
  {
    id: 3,
    nome: "Corsair Vengeance LPX 16GB (2x8GB) DDR4 3200MHz",
    categoria: "Memória RAM",
    preco: 499.99,
    descricao:
      "Kit dual channel de alta performance, ideal para gamers e criadores.",
  },
  {
    id: 4,
    nome: "Kingston Fury Beast 8GB DDR5 5200MHz",
    categoria: "Memória RAM",
    preco: 379.9,
    descricao: "Módulo de memória DDR5 com alta velocidade e design elegante.",
  },

  // ⚙️ Processadores
  {
    id: 5,
    nome: "Intel Core i5-13600K",
    categoria: "Processador",
    preco: 1799.0,
    descricao:
      "Processador de 14 núcleos (6P+8E) para alto desempenho em jogos e multitarefa.",
  },
  {
    id: 6,
    nome: "AMD Ryzen 7 7800X3D",
    categoria: "Processador",
    preco: 2299.0,
    descricao:
      "Processador topo de linha com tecnologia 3D V-Cache para máximo desempenho em games.",
  },

  // 🎮 Placas de Vídeo
  {
    id: 7,
    nome: "NVIDIA GeForce RTX 4070 Ti 12GB",
    categoria: "Placa de Vídeo",
    preco: 5499.0,
    descricao:
      "Placa de vídeo com arquitetura Ada Lovelace e Ray Tracing de última geração.",
  },
  {
    id: 8,
    nome: "AMD Radeon RX 7800 XT 16GB",
    categoria: "Placa de Vídeo",
    preco: 4599.0,
    descricao: "Desempenho excelente em 1440p com suporte à tecnologia FSR 3.",
  },

  // 🖥️ Gabinetes
  {
    id: 9,
    nome: "NZXT H510 Flow",
    categoria: "Gabinete",
    preco: 749.9,
    descricao: "Gabinete Mid Tower com ótimo fluxo de ar e design minimalista.",
  },
  {
    id: 10,
    nome: "Cooler Master TD500 Mesh V2",
    categoria: "Gabinete",
    preco: 829.9,
    descricao:
      "Gabinete com painel frontal em mesh, suporte a RGB e excelente ventilação.",
  },
];

const mainProdutos = document.getElementById("mainProdutos");

function exibirProdutos(lista) {
  mainProdutos.innerHTML = "";
  if (lista.length == 0) {
    mainProdutos.innerHTML =
      "<h3 class='Text-center'>Produtos não encontrados.</h3>";
    return;
  }
  lista.forEach((produto) => {
    const col = document.createElement("div");
    col.className = "mb-3";
    col.innerHTML = `
          <div class="card ">
            <img src="" class="card-img-top" alt=""/>
            <div class="card-body">
              <h5 class="card-title fw-bold">${produto.nome}</h5>
              <h6 class="card-title fw-bold">${produto.categoria}</h6>
              <p class="card-text fw-bold">R$ ${produto.preco}</p>
              <p class="card-text">
                ${produto.descricao}
              </p>
              <a href="#" class="btn btn-outline-primary text-center"
                >Adicionar ao carrinho</a
              >
          </div>
        </div>
        `;
    mainProdutos.appendChild(col);
  });
}
console.log(produtos);

document.addEventListener("DOMContentLoaded", () => {
  exibirProdutos(produtos);
});
