const mainPedido = document.querySelector("#mainPedido");
const urlPedido = "http://localhost:8085/pedido/listar/todos";

function exibirPedido(pedidos) {
  mainPedido.innerHTML = "";
  pedidos.forEach((pedido) => {
    //Define quais elementos devem ser criados
    const divCard = document.createElement("div");
    const cardBody = document.createElement("div");
    const cdUsuario = document.createElement("p");
    const formaPagamento = document.createElement("p");
    const vlFrete = document.createElement("p");
    const vlTotalPedido = document.createElement("p");
    const divisor = document.createElement("hr");

    //Define as listas de classes dos elementos para os cards
    divCard.classList = "card my-3 mx-auto rounded-4";
    cardBody.classList = "card-body";
    cdUsuario.classList = "text-center text-primary fw-bold my-1";
    formaPagamento.classList = "textColor fw-bold my-2";
    vlFrete.classList = "text-white fw-bold my-2";
    vlTotalPedido.classList = "textColor fw-bold my-2";

    //Define os dados a serem renderizados
    cdUsuario.innerText = `CÓDIGO USUÁRIO: ${pedido.cdUsuario}`;
    formaPagamento.innerText = `FORMA DE PAGAMENTO: ${pedido.formaPagamento}`;
    vlFrete.innerText = `VALOR DO FRETE: R$${pedido.vlFrete}`;
    vlTotalPedido.innerText = `VALOR TOTAL: R$${pedido.vlTotalPedido.toFixed(
      2
    )}`;

    //Define a ordem dos elementos
    divCard.appendChild(cardBody);
    cardBody.appendChild(cdUsuario);
    cardBody.appendChild(divisor);
    cardBody.appendChild(formaPagamento);
    cardBody.appendChild(vlFrete);
    cardBody.appendChild(vlTotalPedido);
    mainPedido.appendChild(divCard);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  fetch(urlPedido, {
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
      exibirPedido(data);
    })
    .catch((error) => {
      console.error("Erro ao carregar estoque:" + error);
    });
});
