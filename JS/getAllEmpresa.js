const mainEmpresa = document.querySelector("#mainEmpresa");
const urlEmpresa = "http://localhost:8085/empresa/listar/todos";

function exibirEmpresa(empresas) {
  mainEmpresa.innerHTML = "";
  empresas.forEach((empresa) => {
    //Define quais elementos devem ser criados
    const divCard = document.createElement("div");
    const cardBody = document.createElement("div");
    const cdEmpresa = document.createElement("p");
    const nmFantasia = document.createElement("p");
    const nmRazao = document.createElement("p");
    const nuCNPJ = document.createElement("p");
    const nuTelefone = document.createElement("p");
    const dsCidade = document.createElement("p");
    const dsEstado = document.createElement("p");
    const dsEndereco = document.createElement("p");
    const nuEndereco = document.createElement("p");
    const flAtivoEmpresa = document.createElement("p");
    const divisor = document.createElement("hr");

    //Define as listas de classes dos elementos para os cards
    divCard.classList = "card my-3 rounded-4";
    cardBody.classList = "card-body";
    cardBody.id = "cardBodyEmpresa";
    cdEmpresa.classList = "text-center text-primary fw-bold my-1";
    nmFantasia.classList = "textColor fw-bold my-2";
    nmRazao.classList = "text-white fw-bold my-2";
    nuCNPJ.classList = "textColor fw-bold my-2";
    nuTelefone.classList = "text-white fw-bold my-2";
    dsCidade.classList = "textColor fw-bold my-2";
    dsEstado.classList = "text-white fw-bold my-2";
    dsEndereco.classList = "textColor fw-bold my-2";
    nuEndereco.classList = "text-white fw-bold my-2";
    flAtivoEmpresa.classList = "textColor fw-bold my-2";

    //Define os dados a serem renderizados
    cdEmpresa.innerText = `CÓDIGO EMPRESA: ${empresa.cdEmpresa}`;
    nmFantasia.innerText = `NOME FANTASIA: ${empresa.nmFantasia}`;
    nmRazao.innerText = `NOME RAZÃO: ${empresa.nmRazao}`;
    nuCNPJ.innerText = `CNPJ: ${empresa.nuCNPJ}`;
    nuTelefone.innerText = `TELEFONE: ${empresa.nuTelefone}`;
    dsCidade.innerText = `CIDADE: ${empresa.dsCidade}`;
    dsEstado.innerText = `ESTADO: ${empresa.dsEstado}`;
    dsEndereco.innerText = `ENDEREÇO: ${empresa.dsEndereco}`;
    nuEndereco.innerText = `NÚMERO: ${empresa.nuEndereco}`;
    flAtivoEmpresa.innerText = `ATIVO: ${empresa.flAtivo}`;

    //Define a ordem dos elementos
    divCard.appendChild(cardBody);
    cardBody.appendChild(cdEmpresa);
    cardBody.appendChild(divisor);
    cardBody.appendChild(nmFantasia);
    cardBody.appendChild(nmRazao);
    cardBody.appendChild(nuCNPJ);
    cardBody.appendChild(nuTelefone);
    cardBody.appendChild(dsCidade);
    cardBody.appendChild(dsEstado);
    cardBody.appendChild(dsEndereco);
    cardBody.appendChild(nuEndereco);
    cardBody.appendChild(flAtivoEmpresa);
    mainEmpresa.appendChild(divCard);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  fetch(urlEmpresa, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao buscar estoque\n" + ` ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      exibirEmpresa(data);
    })
    .catch((error) => {
      console.error("Erro ao carregar estoque:" + error);
    });
});
