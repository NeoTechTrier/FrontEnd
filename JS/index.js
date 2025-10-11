const produtos = [
  //produtos teste
  {
    image: "./IMG/perifericos-categoria.png",
    nome: "Mouse Gamer Logitech G502 HERO",
    categoria: "Periféricos",
    preco: 349.99,
    descricao: "Mouse gamer com 11 botões programáveis e sensor HERO 25K.",
  },
  {
    image: "./IMG/perifericos-categoria.png",
    nome: "Teclado Mecânico Redragon Kumara K552",
    categoria: "Periféricos",
    preco: 289.99,
    descricao: "Teclado mecânico com switches Outemu Blue e iluminação RGB.",
  },
  {
    image: "./IMG/computer-memory-storage-categoria.png",
    nome: "Corsair Vengeance LPX 16GB (2x8GB) DDR4 3200MHz",
    categoria: "Memória RAM",
    preco: 499.99,
    descricao:
      "Kit dual channel de alta performance, ideal para gamers e criadores.",
  },
  {
    image: "./IMG/computer-memory-storage-categoria.png",
    nome: "Kingston Fury Beast 8GB DDR5 5200MHz",
    categoria: "Memória RAM",
    preco: 379.99,
    descricao: "Módulo de memória DDR5 com alta velocidade e design elegante.",
  },
  {
    image: "./IMG/processador-categoria.png",
    nome: "Intel Core i5-13600K",
    categoria: "Processador",
    preco: 1799.0,
    descricao:
      "Processador de 14 núcleos (6P+8E) para alto desempenho em jogos e multitarefa.",
  },
  {
    image: "./IMG/processador-categoria.png",
    nome: "AMD Ryzen 7 7800X3D",
    categoria: "Processador",
    preco: 2299.0,
    descricao:
      "Processador topo de linha com tecnologia 3D V-Cache para máximo desempenho em games.",
  },
  {
    image: "./IMG/placa-de-video-categoria.png",
    nome: "NVIDIA GeForce RTX 4070 Ti 12GB",
    categoria: "Placa de Vídeo",
    preco: 5499.0,
    descricao:
      "Placa de vídeo com arquitetura Ada Lovelace e Ray Tracing de última geração.",
  },
  {
    image: "./IMG/placa-de-video-categoria.png",
    nome: "AMD Radeon RX 7800 XT 16GB",
    categoria: "Placa de Vídeo",
    preco: 4599.0,
    descricao: "Desempenho excelente em 1440p com suporte à tecnologia FSR 3.",
  },
  {
    image: "./IMG/gabinete-categoria.png",
    nome: "NZXT H510 Flow",
    categoria: "Gabinete",
    preco: 749.99,
    descricao: "Gabinete Mid Tower com ótimo fluxo de ar e design minimalista.",
  },
  {
    image: "./IMG/gabinete-categoria.png",
    nome: "Cooler Master TD500 Mesh V2",
    categoria: "Gabinete",
    preco: 829.99,
    descricao:
      "Gabinete com painel frontal em mesh, suporte a RGB e excelente ventilação.",
  },
];

const mainProdutos = document.getElementById("mainProdutos");
const senhaInput = document.getElementById("inputSenha");
const filtros = document.getElementById("navCategorias");
const inputBusca = document.getElementById("busca");
const produtosComId = produtos.map((p, index) => ({ ...p, id: index }));

function exibirProdutos(lista) {
  mainProdutos.innerHTML = "";
  if (lista.length == 0) {
    mainProdutos.innerHTML =
      "<h3 class='Text-center'>Produtos não encontrados.</h3>";
    return;
  }
  lista.forEach((produto) => {
    const col = document.createElement("div");
    col.className = "mb-3 mx-auto";
    col.innerHTML = `
          <div class="card pb-3 px-3 ">
            <img src="${produto.image}" class="card-img-top" alt=""/>
            <div class="card-body">
              <span class="card-title fw-bold badge rounded-3 px-2" id="categoriaBagde">${produto.categoria}</span>
              <p class="card-title fw-bold mt-2">${produto.nome}</p>
              <p class="card-text fw-bold text-primary">R$ ${produto.preco}</p>
              <p class="card-text mb-3">
                ${produto.descricao}
              </p>
          </div>
          <a href="#" class="btn w-100 mx-auto mt-auto cardBtn"
                >Adicionar ao carrinho</a
              >
        </div>
        `;
    mainProdutos.appendChild(col);
  });
}

//Função para filtrar os produtos
function filtrarCategoria(categoria) {
  if (!categoria) return produtosComId;
  return produtosComId.filter((p) => p.categoria === categoria);
}

filtros.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    Array.from(this.children).forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
    const categoria = e.target.getAttribute("data-categoria");
    exibirProdutos(filtrarCategoria(categoria));
  }
});

inputBusca.addEventListener("input", function () {
  const filtroInput = this.value.toLowerCase();
  const listaFiltrada = produtosComId.filter(
    (produto) =>
      produto.nome.toLowerCase().includes(filtroInput) ||
      produto.categoria.toLowerCase().includes(filtroInput)
  );
  exibirProdutos(listaFiltrada);
});

document.addEventListener("DOMContentLoaded", () => {
  exibirProdutos(produtosComId);
});

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate__animated", "animate__fadeInUp");
        observer.unobserve(entry.target);
      }
    });
  });

  // Escolha o que quer animar:
  document.querySelectorAll("#mainProdutos, .categoriasLi").forEach((el) => {
    observer.observe(el);
  });
});
