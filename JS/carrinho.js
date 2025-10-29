const mainProdutos = document.querySelector("#mainProdutos");
const urlproduto = "http://localhost:8085/produto";

function exibirProdutos(produtos) {
  mainProdutos.innerHTML = "";
  produtos.forEach((produto) => {
    //Define quais elementos devem ser criados
    const div = document.createElement("div");
    const divCard = document.createElement("div");
    const cardBody = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("h5");
    const categoria = document.createElement("p");
    const valor = document.createElement("p");
    const descricao = document.createElement("p");
    const btnExcluir = document.createElement("a");

    //Define as listas de classes dos elementos para os cards
    div.classList = "px-5 pb-3";
    divCard.classList =
      "card cardCarrinho d-flex flex-row flex-nowrap justify-content-center align-items-center my-2 rounded-4";
    cardBody.classList = "card-body bodyCard";
    img.classList = "imgCarrinho rounded-4";
    title.classList = "fw-bold";
    categoria.classList = "badge px-3 py-1";
    valor.classList = "text-primary fw-bold my-1";
    btnExcluir.classList = "btn btn-outline-danger w-100 mx-auto";

    console.log(produto);

    //Chama a imagem através do endpoint
    img.src = `${urlproduto}/${produto.cdProduto}/imagem`;
    img.alt = produto.nmProduto;

    //Define os dados a serem renderizados
    title.innerText = `${produto.nmProduto}`;
    categoria.innerText = `${produto.dsCategoria}`;
    valor.innerText = `R$ ${produto.vlProduto}`;
    descricao.innerText = `${produto.dsProduto}`;
    btnExcluir.innerText = `Excluir`;

    function excluirCarrinho(cdProduto) {
      let produtosSalvos = JSON.parse(localStorage.getItem("cdProdutos")) || [];
      // Remove o produto do array
      produtosSalvos = produtosSalvos.filter((id) => id !== cdProduto);
      // Atualiza o localStorage
      localStorage.setItem("cdProdutos", JSON.stringify(produtosSalvos));
      // Atualiza a tela
      exibirProdutosSalvos();
    }
    btnExcluir.addEventListener("click", () => {
      excluirCarrinho(produto.cdProduto);
    });

    //Define a ordem dos elementos
    divCard.appendChild(img);
    divCard.appendChild(cardBody);
    cardBody.appendChild(title);
    cardBody.appendChild(categoria);
    cardBody.appendChild(valor);
    cardBody.appendChild(descricao);
    div.appendChild(btnExcluir);
    divCard.appendChild(div);
    mainProdutos.appendChild(divCard);
  });
}

function salvarProduto(cdProduto) {
  let produtosSalvos = JSON.parse(localStorage.getItem("cdProdutos")) || [];
  if (!produtosSalvos.includes(cdProduto)) {
    produtosSalvos.push(cdProduto);
  }
  localStorage.setItem("cdProdutos", JSON.stringify(produtosSalvos));
}

function pegarProdutos() {
  return JSON.parse(localStorage.getItem("cdProdutos")) || [];
}

function exibirProdutosSalvos() {
  const token = localStorage.getItem("token");
  const urlApi = "http://localhost:8085/produto/listar/todos";
  const salvos = pegarProdutos();
  mainProdutos.innerHTML = "";
  if (salvos.length === 0) {
    const alert = document.createElement("h3");
    const btnAlert = document.createElement("a");

    btnAlert.innerText = "Voltar as compras";
    alert.innerText = "Carrinho Vazio!";

    alert.classList = "text-white fw-bold";
    btnAlert.classList = "btn btn-outline-primary text-white fw-bold";
    btnAlert.href = "../Pages/logado.html";

    mainProdutos.appendChild(alert);
    mainProdutos.appendChild(btnAlert);
  } else {
    const finalizarCompra = document.querySelector("#finalizarCompra");

    const btnFinalizar = document.createElement("a");
    btnFinalizar.classList = "btn btn-outline-primary w-50 mx-auto mt-5";
    btnFinalizar.innerText = `Finalizar Compra`;
    finalizarCompra.appendChild(btnFinalizar);
    fetch(urlApi, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((todosProdutos) => {
        const produtosSalvosIds = pegarProdutos();
        const produtosFiltrados = todosProdutos.filter((produto) =>
          produtosSalvosIds.includes(produto.cdProduto)
        );

        exibirProdutos(produtosFiltrados);
      });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  exibirProdutosSalvos();
});
