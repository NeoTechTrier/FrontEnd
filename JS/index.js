//const produtosComId = produtos.map((p, index) => ({ ...p, id: index }));

const senhaInput = document.getElementById("inputSenha");
const filtros = document.getElementById("navCategorias");
const inputBusca = document.getElementById("busca");
const botaoLogin = document.getElementById("botaoLogin");

//Função para filtrar os produtos
/*function filtrarCategoria(categoria) {
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
});*/

//TESTE DE CONEXÃO COM O BACK-END
const urlApi = "http://localhost:8085/produto/listar/todos";
const mainProdutos = document.getElementById("mainProdutos");

//GET
fetch(urlApi)
  .then((response) => {
    response.json();
  })
  .then(function (myJson) {
    const data = myJson.data;
    data.forEach((post) => {
      div.innerHTML =
        '<div class="card pb-3 px-3 ">' +
        '<img src="' +
        post.imgProduto +
        '" class="card-img-top" alt=""/>' +
        '<div class="card-body">' +
        '<span class="card-title fw-bold badge rounded-3 px-2" id="categoriaBagde">' +
        post.dsCategoria +
        "</span>" +
        '<p class="card-title fw-bold mt-2">' +
        post.nmProduto +
        "</p>" +
        '<p class="card-text fw-bold text-primary">' +
        post.vlProduto +
        "</p>" +
        '<p class="card-text mb-3">' +
        post.dsProduto +
        "</p>" +
        "</div>" +
        '<a href="Pages/login.html" class="btn w-100 mx-auto mt-auto cardBtn">Adicionar ao carrinho</a>';
      ("</div>");
      mainProdutos.appendChild(div);
    });
  })
  .catch((error) => {
    mainProdutos.value = `Erro:  ${error.message}`;
  });
