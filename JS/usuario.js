const mainProdutos = document.querySelector("#mainUsuario");
const urlusuario = "http://localhost:8085/usuario/listar/usuarios";

function exibirUsuario(usuarios) {
  mainProdutos.innerHTML = "";
  usuarios.forEach((usuario) => {
    //Define quais elementos devem ser criados
    const divCard = document.createElement("div");
    const cardBody = document.createElement("div");
    const nome = document.createElement("p");
    const telefone = document.createElement("p");
    const email = document.createElement("p");
    const cidade = document.createElement("p");
    const flAtivo = document.createElement("p");
    const btnEditar = document.createElement("a");

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
    mainProdutos.appendChild(divCard);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fetch(urlusuario)
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
