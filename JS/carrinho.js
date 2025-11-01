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
    const lblFrete = document.createElement("p");
    const selectPagamento = document.createElement("select");
    const selectFrete = document.createElement("select");
    const PIX = document.createElement("option");
    const CARTAO = document.createElement("option");

    const AC = document.createElement("option");
    const AL = document.createElement("option");
    const AP = document.createElement("option");
    const AM = document.createElement("option");
    const BA = document.createElement("option");
    const CE = document.createElement("option");
    const DF = document.createElement("option");
    const ES = document.createElement("option");
    const GO = document.createElement("option");
    const MA = document.createElement("option");
    const MT = document.createElement("option");
    const MS = document.createElement("option");
    const MG = document.createElement("option");
    const PA = document.createElement("option");
    const PB = document.createElement("option");
    const PR = document.createElement("option");
    const PE = document.createElement("option");
    const PI = document.createElement("option");
    const RJ = document.createElement("option");
    const RN = document.createElement("option");
    const RS = document.createElement("option");
    const RO = document.createElement("option");
    const RR = document.createElement("option");
    const SC = document.createElement("option");
    const SP = document.createElement("option");
    const SE = document.createElement("option");
    const TO = document.createElement("option");

    AC.textContent = "AC - R$ 60,00";
    AC.value = "AC";
    AL.textContent = "AL - R$ 45,00";
    AL.value = "AL";
    AP.textContent = "AP - R$ 65,00";
    AP.value = "AP";
    AM.textContent = "AM - R$ 70,00";
    AM.value = "AM";
    BA.textContent = "BA - R$ 40,00";
    BA.value = "BA";
    CE.textContent = "CE - R$ 45,00";
    CE.value = "CE";
    DF.textContent = "DF - R$ 35,00";
    DF.value = "DF";
    ES.textContent = "ES - R$ 30,00";
    ES.value = "ES";
    GO.textContent = "GO - R$ 35,00";
    GO.value = "GO";
    MA.textContent = "MA - R$ 50,00";
    MA.value = "MA";
    MT.textContent = "MT - R$ 40,00";
    MT.value = "MT";
    MS.textContent = "MS - R$ 35,00";
    MS.value = "MS";
    MG.textContent = "MG - R$ 25,00";
    MG.value = "MG";
    PA.textContent = "PA - R$ 55,00";
    PA.value = "PA";
    PB.textContent = "PB - R$ 45,00";
    PB.value = "PB";
    PR.textContent = "PR - R$ 15,00";
    PR.value = "PR";
    PE.textContent = "PE - R$ 40,00";
    PE.value = "PE";
    PI.textContent = "PI - R$ 45,00";
    PI.value = "PI";
    RJ.textContent = "RJ - R$ 25,00";
    RJ.value = "RJ";
    RN.textContent = "RN - R$ 45,00";
    RN.value = "RN";
    RS.textContent = "RS - R$ 20,00";
    RS.value = "RS";
    RO.textContent = "RO - R$ 60,00";
    RO.value = "RO";
    RR.textContent = "RR - R$ 70,00";
    RR.value = "RR";
    SC.textContent = "SC - R$ 10,00";
    SC.value = "SC";
    SP.textContent = "SP - R$ 20,00";
    SP.value = "SP";
    SE.textContent = "SE - R$ 40,00";
    SE.value = "SE";
    TO.textContent = "TO - R$ 50,00";
    TO.value = "TO";

    btnFinalizar.classList =
      "btn btn-outline-primary w-50 mx-auto mt-3 btnFinalizar fw-bold";
    selectPagamento.classList =
      "form-control w-50 mx-auto fw-bold border border-primary bg-dark text-center text-primary";
    selectFrete.classList =
      "form-control w-50 mx-auto fw-bold border border-primary bg-dark text-center text-primary mt-3";
    lblFormaPag.classList = "text-white fw-bold mb-2 text-center";
    lblFrete.classList = "text-white fw-bold mb-2 text-center";

    lblFormaPag.innerText = "Selecione a forma de pagamento";
    lblFrete.innerText = "Selecione o estado";
    btnFinalizar.innerText = `Finalizar Compra`;
    PIX.innerText = `PIX`;
    CARTAO.innerText = `CARTÃO`;

    selectFrete.appendChild(AC);
    selectFrete.appendChild(AL);
    selectFrete.appendChild(AP);
    selectFrete.appendChild(AM);
    selectFrete.appendChild(BA);
    selectFrete.appendChild(CE);
    selectFrete.appendChild(DF);
    selectFrete.appendChild(ES);
    selectFrete.appendChild(GO);
    selectFrete.appendChild(MA);
    selectFrete.appendChild(MT);
    selectFrete.appendChild(MS);
    selectFrete.appendChild(MG);
    selectFrete.appendChild(PA);
    selectFrete.appendChild(PB);
    selectFrete.appendChild(PR);
    selectFrete.appendChild(PE);
    selectFrete.appendChild(PI);
    selectFrete.appendChild(RJ);
    selectFrete.appendChild(RN);
    selectFrete.appendChild(RS);
    selectFrete.appendChild(RO);
    selectFrete.appendChild(RR);
    selectFrete.appendChild(SC);
    selectFrete.appendChild(SP);
    selectFrete.appendChild(SE);
    selectFrete.appendChild(TO);

    selectPagamento.appendChild(PIX);
    selectPagamento.appendChild(CARTAO);
    pagamentoCompra.appendChild(lblFormaPag);
    pagamentoCompra.appendChild(selectPagamento);
    pagamentoCompra.appendChild(selectFrete);
    finalizarCompra.appendChild(btnFinalizar);

    if (PIX) {
      localStorage.setItem("formaPagamento", (formaPagamento = "PIX"));
    }
    if (CARTAO) {
      localStorage.setItem("formaPagamento", (formaPagamento = "CARTAO"));
    }

    function atualizarTotalComFrete() {
      let valorProdutos = Number(localStorage.getItem("valorPedido")) || 0;
      let frete = parseFloat(localStorage.getItem("frete")) || 0;
      const total = document.getElementById("totalCarrinho");
      if (total) {
        total.innerText = `Total: R$ ${(valorProdutos + frete).toFixed(2)}`;
      }
    }

    selectFrete.addEventListener("change", () => {
      const estadoSelecionado = selectFrete.value;

      let valorFrete = 0;
      switch (estadoSelecionado) {
        case "AC":
          valorFrete = 60.0;
          break;
        case "AL":
          valorFrete = 45.0;
          break;
        case "AP":
          valorFrete = 65.0;
          break;
        case "AM":
          valorFrete = 70.0;
          break;
        case "BA":
          valorFrete = 40.0;
          break;
        case "CE":
          valorFrete = 45.0;
          break;
        case "DF":
          valorFrete = 35.0;
          break;
        case "ES":
          valorFrete = 30.0;
          break;
        case "GO":
          valorFrete = 35.0;
          break;
        case "MA":
          valorFrete = 50.0;
          break;
        case "MT":
          valorFrete = 40.0;
          break;
        case "MS":
          valorFrete = 35.0;
          break;
        case "MG":
          valorFrete = 25.0;
          break;
        case "PA":
          valorFrete = 55.0;
          break;
        case "PB":
          valorFrete = 45.0;
          break;
        case "PR":
          valorFrete = 15.0;
          break;
        case "PE":
          valorFrete = 40.0;
          break;
        case "PI":
          valorFrete = 45.0;
          break;
        case "RJ":
          valorFrete = 25.0;
          break;
        case "RN":
          valorFrete = 45.0;
          break;
        case "RS":
          valorFrete = 20.0;
          break;
        case "RO":
          valorFrete = 60.0;
          break;
        case "RR":
          valorFrete = 70.0;
          break;
        case "SC":
          valorFrete = 10.0;
          break;
        case "SP":
          valorFrete = 20.0;
          break;
        case "SE":
          valorFrete = 40.0;
          break;
        case "TO":
          valorFrete = 50.0;
          break;
      }

      localStorage.setItem("frete", valorFrete);

      atualizarTotalComFrete();
    });

    atualizarTotalComFrete();

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
  const vlFrete = Number(localStorage.getItem("frete")) || 0;
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

  document
    .getElementById("modalFinalizar")
    .addEventListener("hidden.bs.modal", () => {
      limparCarrinho();
      window.location.href = "../Pages/logado.html";
    });
  function limparCarrinho() {
    const cdProduto = JSON.parse(localStorage.getItem("cdProdutos"));
    if (cdProduto) {
      cdProduto.forEach((id) => {
        localStorage.removeItem(`qtItem_${id}`);
        localStorage.removeItem(`vlProduto_${id}`);
      });
    }
    localStorage.removeItem("cdProdutos");
  }

  alert("Itens do pedido enviados com sucesso!");
});

document.addEventListener("DOMContentLoaded", () => {
  exibirProdutosSalvos();
});
