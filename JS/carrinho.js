const mainProdutos = document.querySelector("#mainProdutos");
const urlproduto = "http://localhost:8085/produto";

function exibirProdutos(produtos) {
  mainProdutos.innerHTML = "";
  let valorTotal = 0;

  produtos.forEach((produto) => {
    if (produto.qtdEstoqueProduto <= 0) {
      return;
    } else {
      const div = document.createElement("div");
      const divCard = document.createElement("div");
      const cardBody = document.createElement("div");
      const img = document.createElement("img");
      const title = document.createElement("h5");
      const categoria = document.createElement("p");
      const valor = document.createElement("p");
      const descricao = document.createElement("p");
      const btnExcluir = document.createElement("a");
      const inputQt = document.createElement("input");
      const inputGroup = document.createElement("div");
      const qntProduto = document.createElement("p");
      const btnMenos = document.createElement("button");
      const btnMais = document.createElement("button");

      div.classList = "px-5 pb-3";
      divCard.classList =
        "card cardCarrinho d-flex flex-row flex-nowrap justify-content-center align-items-center my-3 rounded-2 shadow-sm";
      cardBody.classList = "card-body bodyCard text-center";
      img.classList = "imgCarrinho rounded-2";
      title.classList = "fw-bold";
      categoria.classList = "badge px-3 py-1 bg-primary text-white";
      valor.classList = "text-primary fw-bold my-1 vlProduto";
      btnExcluir.classList =
        "btn btn-outline-danger w-100 mx-auto mt-2 rounded-2 fw-bold";
      inputQt.classList = "form-control text-center border-primary fw-bold";

      inputGroup.classList =
        "d-flex align-items-center justify-content-center gap-2 mt-2";
      btnMenos.classList = "btn btn-primary rounded-2 px-3 py-1 fw-bold";
      btnMais.classList = "btn btn-primary rounded-2 px-3 py-1 fw-bold";
      qntProduto.classList = "badge px-3 py-1 qtEstoque";

      btnMenos.innerText = "-";
      btnMais.innerText = "+";

      img.src = `${urlproduto}/${produto.cdProduto}/imagem`;
      img.alt = produto.nmProduto;

      title.innerText = `${produto.nmProduto}`;
      categoria.innerText = `${produto.dsCategoria}`;
      valor.innerText = `R$ ${produto.vlProduto}`;
      descricao.innerText = `${produto.dsProduto}`;
      qntProduto.innerText = `Estoque: ${produto.qtdEstoqueProduto}`;

      btnExcluir.innerText = `Excluir`;
      inputQt.type = "number";
      inputQt.id = `inputQt_${produto.cdProduto}`;

      const qtdSalva =
        Number(localStorage.getItem(`qtItem_${produto.cdProduto}`)) || 1;
      inputQt.value = qtdSalva;

      inputGroup.appendChild(btnMenos);
      inputGroup.appendChild(inputQt);
      inputGroup.appendChild(btnMais);

      function excluirCarrinho(cdProduto) {
        let produtosSalvos =
          JSON.parse(localStorage.getItem("cdProdutos")) || [];
        produtosSalvos = produtosSalvos.filter((id) => id !== cdProduto);
        localStorage.setItem("cdProdutos", JSON.stringify(produtosSalvos));
        exibirProdutosSalvos();
      }

      btnExcluir.addEventListener("click", () => {
        excluirCarrinho(produto.cdProduto);
      });

      function atualizarTotal() {
        let novoTotal = 0;
        produtos.forEach((p) => {
          const qtd =
            parseInt(localStorage.getItem(`qtItem_${p.cdProduto}`)) || 1;
          novoTotal += Number(p.vlProduto) * qtd;
        });
      }

      btnMenos.addEventListener("click", () => {
        let valorAtual = Number(inputQt.value);
        if (valorAtual > 1) {
          valorAtual--;
          inputQt.value = valorAtual;
          localStorage.setItem(`qtItem_${produto.cdProduto}`, valorAtual);
        }
        atualizarTotal();
      });

      btnMais.addEventListener("click", () => {
        let valorAtual = Number(inputQt.value);
        valorAtual++;
        inputQt.value = valorAtual;
        localStorage.setItem(`qtItem_${produto.cdProduto}`, valorAtual);
        atualizarTotal();
      });

      inputQt.addEventListener("input", () => {
        const val = parseInt(inputQt.value) || 1;
        localStorage.setItem(`qtItem_${produto.cdProduto}`, val);
        atualizarTotal();
      });

      divCard.appendChild(img);
      divCard.appendChild(cardBody);
      cardBody.appendChild(title);
      cardBody.appendChild(categoria);
      cardBody.appendChild(valor);
      cardBody.appendChild(descricao);
      cardBody.appendChild(qntProduto);
      cardBody.appendChild(inputGroup);
      div.appendChild(btnExcluir);
      divCard.appendChild(div);
      mainProdutos.appendChild(divCard);

      valorTotal += Number(produto.vlProduto) * qtdSalva;
    }
  });
  localStorage.setItem("valorPedido", valorTotal);
  const total = document.createElement("h4");
  total.classList = "text-white mt-5 fw-bold text-center";
  total.id = "totalCarrinho";
  total.innerText = `Total: R$ ${valorTotal.toFixed(2)}`;

  mainProdutos.appendChild(total);
}

/*------------------------------------------------------------------------------------------------------*/

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
    btnAlert.innerText = "Voltar às compras";
    alert.innerText = "Carrinho Vazio!";
    alert.classList = "text-white fw-bold";
    btnAlert.classList = "btn btn-outline-primary text-white fw-bold";
    btnAlert.href = "../Pages/logado.html";
    mainProdutos.appendChild(alert);
    mainProdutos.appendChild(btnAlert);
  } else {
    const finalizarCompra = document.querySelector("#finalizarCompra");
    const pagamentoCompra = document.querySelector("#pagamentoCompra");
    pagamentoCompra.innerHTML = "";
    finalizarCompra.innerHTML = "";

    const btnFinalizar = document.createElement("a");
    const lblFormaPag = document.createElement("p");
    const selectPagamento = document.createElement("select");
    const PIX = document.createElement("option");
    const CARTAO = document.createElement("option");

    btnFinalizar.classList =
      "btn btn-outline-primary w-50 mx-auto mt-3 btnFinalizar fw-bold";
    selectPagamento.classList =
      "form-control w-50 mx-auto fw-bold border border-primary bg-dark text-center text-primary";
    lblFormaPag.classList = "text-white fw-bold mb-2 text-center";

    lblFormaPag.innerText = "Selecione a forma de pagamento";
    btnFinalizar.innerText = `Finalizar Compra`;
    PIX.innerText = `Pix`;
    CARTAO.innerText = `Cartão`;

    selectPagamento.appendChild(PIX);
    selectPagamento.appendChild(CARTAO);
    pagamentoCompra.appendChild(lblFormaPag);
    pagamentoCompra.appendChild(selectPagamento);
    finalizarCompra.appendChild(btnFinalizar);

    if (PIX) {
      localStorage.setItem("formaPagamento", (formaPagamento = "PIX"));
    }
    if (CARTAO) {
      localStorage.setItem("formaPagamento", (formaPagamento = "CARTAO"));
    }

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

/*------------------------------------------------------------------------------------------------------*/

const urlPedidoCriar = "http://localhost:8085/pedido/criar";
document.getElementById("finalizarCompra").addEventListener("click", () => {
  const formaPagamentoLocal = localStorage.getItem("formaPagamento");
  const cdUsuario = Number(localStorage.getItem("cdUsuario"));
  const formaPagamento = formaPagamentoLocal;
  const vlFrete = 50;
  const vlTotalPedido = Number(localStorage.getItem("valorPedido")) || 0;

  const payload = {
    cdUsuario: cdUsuario,
    formaPagamento: formaPagamento,
    vlFrete: vlFrete,
    vlTotalPedido: vlTotalPedido,
  };

  const token = localStorage.getItem("token");
  fetch(urlPedidoCriar, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao enviar dados: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("cdPedido", data.cdPedido);
      const modalFinalizar = new bootstrap.Modal(
        document.getElementById("modalFinalizar")
      );
      modalFinalizar.show();
      alert("Dados enviados com sucesso");
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
      console.error(`Erro ${error.message}`);
    });
});

/*------------------------------------------------------------------------------------------------------*/
const urlItemPedido = "http://localhost:8085/itempedido/criar";
document.getElementById("cadItem").addEventListener("click", () => {
  const cdPedido = localStorage.getItem("cdPedido");
  const cdProduto = JSON.parse(localStorage.getItem("cdProdutos"));

  const qtItens = cdProduto.map((id) =>
    parseInt(localStorage.getItem(`qtItem_${id}`))
  );
  const vlProdutoItem = cdProduto.map((id) =>
    parseFloat(localStorage.getItem(`vlProduto_${id}`))
  );
  const token = localStorage.getItem("token");

  for (let i = 0; i < cdProduto.length; i++) {
    console.log(cdPedido, cdProduto, qtItens, vlProdutoItem);
    const payload = {
      cdPedido: cdPedido,
      cdProduto: cdProduto[i],
      qtItem: qtItens[i],
      vlItemPedido: vlProdutoItem[i],
    };

    fetch(urlItemPedido, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao enviar item: ${response.status}`);
      }
      return response.json();
    });
  }

  alert("Itens do pedido enviados com sucesso!");
});

document.addEventListener("DOMContentLoaded", () => {
  exibirProdutosSalvos();
});
