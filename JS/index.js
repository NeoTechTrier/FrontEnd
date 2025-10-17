const mainProdutos = document.querySelector("#mainProdutos");
const urlApi = "http://localhost:8085/produto/listar/todos";
const urlImg = "http://localhost:8085/produto";
const urlCategoria = "http://localhost:8085/produto";

//GET produtos home
document.addEventListener("DOMContentLoaded", function () {
  fetch(urlApi)
    .then((response) => response.json())
    .then((data) => exibirProdutos(data));
  function exibirProdutos(produtos) {
    produtos.forEach((produto) => {
      //Define quais elementos devem ser criados
      const div = document.createElement("div");
      const divCard = document.createElement("div");
      const cardBody = document.createElement("div");
      const img = document.createElement("img");
      const title = document.createElement("h5");
      const categoria = document.createElement("span");
      const valor = document.createElement("p");
      const descricao = document.createElement("p");
      const btnCarrinho = document.createElement("a");

      //Define as listas de classes dos elementos para os cards
      div.classList = "px-5 pb-3";
      divCard.classList = "card my-3 mx-auto rounded-4";
      cardBody.classList = "card-body";
      img.classList = "card-img-top";
      title.classList = "fw-bold";
      categoria.classList = "badge w-25";
      valor.classList = "text-primary fw-bold my-1";
      btnCarrinho.classList = "btn btn-outline-primary w-100 mx-auto cardBtn";

      //Chama a imagem através do endpoint
      img.src = `${urlImg}/${produto.cdProduto}/imagem`;
      img.alt = produto.nmProduto;

      //Define os dados a serem renderizados
      title.innerText = `${produto.nmProduto}`;
      categoria.innerText = `${produto.dsCategoria}`;
      valor.innerText = `R$ ${produto.vlProduto}`;
      descricao.innerText = `${produto.dsProduto}`;
      btnCarrinho.innerText = `Adicionar ao carrinho`;

      //Define a ordem dos elementos
      divCard.appendChild(img);
      divCard.appendChild(cardBody);
      cardBody.appendChild(title);
      cardBody.appendChild(categoria);
      cardBody.appendChild(valor);
      cardBody.appendChild(descricao);
      divCard.appendChild(div);
      div.appendChild(btnCarrinho);
      mainProdutos.appendChild(divCard);
    });
  }
});
