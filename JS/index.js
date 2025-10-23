const mainProdutos = document.querySelector("#mainProdutos");
const urlApi = "http://localhost:8085/produto/listar/todos";
const urlproduto = "http://localhost:8085/produto";
const urlusuario = "http://localhost:8085/usuario";
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

document.getElementById("botaoLogin").addEventListener("click", function () {
  const nmUsuario = document.getElementById("").value;
});

("use strict");
const limparFormulario = (endereco) => {
  document.getElementById("dsEndereco").value = "";
  document.getElementById("dsCidade").value = "";
  document.getElementById("dsEstado").value = "";
};

const preencherFormulario = (endereco) => {
  document.getElementById("dsEndereco").value = endereco.logradouro;
  document.getElementById("dsCidade").value = endereco.localidade;
  document.getElementById("dsEstado").value = endereco.uf;
};

const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async () => {
  limparFormulario();

  const cep = document.getElementById("cep").value.replace("-", "");
  const urlCep = `https://viacep.com.br/ws/${cep}/json/`;
  if (cepValido(cep)) {
    const dados = await fetch(urlCep);
    const endereco = await dados.json();
    if (endereco.hasOwnProperty("erro")) {
      document.getElementById("dsEndereco").value = "CEP não encontrado!";
    } else {
      preencherFormulario(endereco);
    }
  } else {
    document.getElementById("dsEndereco").value = "CEP incorreto!";
  }
};

document.getElementById("cep").addEventListener("focusout", pesquisarCep);
