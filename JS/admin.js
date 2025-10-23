const mainUsuarios = document.querySelector("#mainUsuario");
const urlUsuario = "http://localhost:8085/usuario/listar/usuarios";

function exibirUsuario(usuarios) {
  mainUsuarios.innerHTML = "";
  usuarios.forEach((usuario) => {
    //Define quais elementos devem ser criados
    const divCard = document.createElement("div");
    const cardBody = document.createElement("div");
    const nome = document.createElement("p");
    const telefone = document.createElement("p");
    const email = document.createElement("p");
    const cidade = document.createElement("p");
    const flAtivo = document.createElement("p");

    //Define as listas de classes dos elementos para os cards
    divCard.classList = "card my-3 mx-auto rounded-4";
    cardBody.classList = "card-body";
    nome.classList = "text-center text-light fw-bold my-1";
    telefone.classList = "text-primary fw-bold my-1";
    email.classList = "text-primary fw-bold my-1";
    cidade.classList = "text-primary fw-bold my-1";
    flAtivo.classList = "text-primary fw-bold my-1";

    //Define os dados a serem renderizados
    nome.innerText = `${usuario.nmCliente}`;
    email.innerText = `EMAIL: ${usuario.dsEmail}`;
    telefone.innerText = `TELEFONE: ${usuario.nuTelefone}`;
    cidade.innerText = `CIDADE: ${usuario.dsCidade}`;
    flAtivo.innerText = `ATIVO: ${usuario.flAtivo}`;

    //Define a ordem dos elementos
    divCard.appendChild(cardBody);
    cardBody.appendChild(nome);
    cardBody.appendChild(email);
    cardBody.appendChild(telefone);
    cardBody.appendChild(cidade);
    cardBody.appendChild(flAtivo);
    mainUsuarios.appendChild(divCard);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fetch(urlUsuario)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao buscar usuários\n" + ` ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      exibirUsuario(data);
    })
    .catch((error) => {
      console.error("Erro ao carregar usuários:" + error);
    });
});

/*------------------------------------------------------------------------------------------------------*/
const mainEstoque = document.querySelector("#mainEstoque");
const urlEstoque = "http://localhost:8085/estoque/listar/todos";

function exibirEstoque(estoques) {
  mainEstoque.innerHTML = "";
  estoques.forEach((estoque) => {
    //Define quais elementos devem ser criados
    const divCard = document.createElement("div");
    const cardBody = document.createElement("div");
    //const codigoProduto = document.createElement("p");
    const cdEstoque = document.createElement("p");
    const qtdEstoqueProduto = document.createElement("p");
    const flAtivoEstoque = document.createElement("p");

    //Define as listas de classes dos elementos para os cards
    divCard.classList = "card my-3 mx-auto rounded-4";
    cardBody.classList = "card-body";
    cdEstoque.classList = "text-center text-light fw-bold my-1";
    //codigoProduto.classList = "text-primary fw-bold my-1";
    qtdEstoqueProduto.classList = "text-primary fw-bold my-1";
    flAtivoEstoque.classList = "text-primary fw-bold my-1";

    //Define os dados a serem renderizados
    cdEstoque.innerText = `CÓDIGO ESTOQUE: ${estoque.cdEstoque}`;
    //codigoProduto.innerText = `CÓDIGO PRODUTO: ${estoque.cdProduto}`;
    qtdEstoqueProduto.innerText = `QUANTIDADE: ${estoque.qtdEstoqueProduto}`;
    flAtivoEstoque.innerText = `ATIVO: ${estoque.flAtivo}`;

    //Define a ordem dos elementos
    divCard.appendChild(cardBody);
    cardBody.appendChild(cdEstoque);
    //cardBody.appendChild(codigoProduto);
    cardBody.appendChild(qtdEstoqueProduto);
    cardBody.appendChild(flAtivoEstoque);
    mainEstoque.appendChild(divCard);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fetch(urlEstoque)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao buscar estoque\n" + ` ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      exibirEstoque(data);
    })
    .catch((error) => {
      console.error("Erro ao carregar estoque:" + error);
    });
});

/*------------------------------------------------------------------------------------------------------*/

const mainEmpresas = document.querySelector("#mainEmpresa");
const urlEmpresa = "http://localhost:8085/empresa/listar/usuarios";

function exibirUsuario(empresas) {
  mainEmpresas.innerHTML = "";
  empresas.forEach((empresa) => {
    //Define quais elementos devem ser criados
    const divCard = document.createElement("div");
    const cardBody = document.createElement("div");
    const nome = document.createElement("p");
    const telefone = document.createElement("p");
    const email = document.createElement("p");
    const cidade = document.createElement("p");
    const flAtivo = document.createElement("p");

    //Define as listas de classes dos elementos para os cards
    divCard.classList = "card my-3 mx-auto rounded-4";
    cardBody.classList = "card-body";
    nome.classList = "text-center text-light fw-bold my-1";
    telefone.classList = "text-primary fw-bold my-1";
    email.classList = "text-primary fw-bold my-1";
    cidade.classList = "text-primary fw-bold my-1";
    flAtivo.classList = "text-primary fw-bold my-1";

    //Define os dados a serem renderizados
    nome.innerText = `${usuario.nmCliente}`;
    email.innerText = `EMAIL: ${usuario.dsEmail}`;
    telefone.innerText = `TELEFONE: ${usuario.nuTelefone}`;
    cidade.innerText = `CIDADE: ${usuario.dsCidade}`;
    flAtivo.innerText = `ATIVO: ${usuario.flAtivo}`;

    //Define a ordem dos elementos
    divCard.appendChild(cardBody);
    cardBody.appendChild(nome);
    cardBody.appendChild(email);
    cardBody.appendChild(telefone);
    cardBody.appendChild(cidade);
    cardBody.appendChild(flAtivo);
    mainUsuarios.appendChild(divCard);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fetch(urlUsuario)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao buscar usuários\n" + ` ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      exibirUsuario(data);
    })
    .catch((error) => {
      console.error("Erro ao carregar usuários:" + error);
    });
});
