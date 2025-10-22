const mainProdutos = document.querySelector("#mainProdutos");
const urlApi = "http://localhost:8085/produto/listar/todos";
const urlproduto = "http://localhost:8085/produto";
//const urlCategoria = "http://localhost:8085/produto";

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
      categoria.classList = "badge px-3 py-1";
      valor.classList = "text-primary fw-bold my-1";
      btnCarrinho.classList = "btn btn-outline-primary w-100 mx-auto cardBtn";

      //Chama a imagem através do endpoint
      img.src = `${urlproduto}/${produto.cdProduto}/imagem`;
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

//POST produtos
document
  .getElementById("botaoCadProduto")
  .addEventListener("click", function () {
    const nmProduto = document.getElementById("nmProduto").value;
    const vlProduto = document.getElementById("vlProduto").value;
    const dsProduto = document.getElementById("dsProduto").value;
    const dsCategoria = document.getElementById("dsCategoria").value;
    const imgProduto = document.getElementById("imgProduto").files[0];
    const cdEmpresa = document.getElementById("cdEmpresa").value;
    fetch(`${urlproduto}/criar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ao enviar dados: ${response.status}`);
        }
      })
      .then((data) => {
        if (nmProduto && vlProduto && dsCategoria && dsProduto && imgProduto) {
          const formData = new FormData();
          formData.set("nmProduto", nmProduto);
          formData.set("vlProduto", parseFloat(vlProduto, 10));
          formData.set("dsProduto", dsProduto);
          formData.set("dsCategoria", dsCategoria);
          formData.set("imagem", imgProduto);
          formData.set("cdEmpresa", cdEmpresa);

          alert("Dados enviados com sucesso");
          console.log("Resposta da API:", data);
        } else {
          alert("Por favor, preencha todos os campos!");
        }
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
        console.error(`Erro ${error.message}`);
      });
  });
