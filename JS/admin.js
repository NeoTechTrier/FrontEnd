const token = localStorage.getItem("token");

const mainUsuarios = document.querySelector("#mainUsuario");
const mainEstoque = document.querySelector("#mainEstoque");
const mainProdutos = document.querySelector("#mainProdutos");

const urlUsuario = "http://localhost:8085/usuario/listar/usuarios";
const urlEstoque = "http://localhost:8085/estoque/listar/todos";
const urlApiProdutos = "http://localhost:8085/produto/listar/todos";
const urlProduto = "http://localhost:8085/produto";
const urlProdutoCriar = "http://localhost:8085/produto/criar";
const urlEstoqueCriar = "http://localhost:8085/estoque/criar";

function exibirUsuario(usuarios) {
  mainUsuarios.innerHTML = "";
  usuarios.forEach((usuario) => {
    const divCard = document.createElement("div");
    const cardBody = document.createElement("div");
    const nome = document.createElement("p");
    const telefone = document.createElement("p");
    const email = document.createElement("p");
    const cidade = document.createElement("p");
    const flAtivo = document.createElement("p");

    divCard.classList = "card my-3 mx-auto rounded-4";
    cardBody.classList = "card-body";
    nome.classList = "text-center text-light fw-bold my-1";
    telefone.classList = email.classList = cidade.classList = flAtivo.classList =
      "text-primary fw-bold my-1";

    nome.innerText = `${usuario.nmCliente}`;
    email.innerText = `EMAIL: ${usuario.dsEmail}`;
    telefone.innerText = `TELEFONE: ${usuario.nuTelefone}`;
    cidade.innerText = `CIDADE: ${usuario.dsCidade}`;
    flAtivo.innerText = `ATIVO: ${usuario.flAtivo}`;

    divCard.appendChild(cardBody);
    [nome, email, telefone, cidade, flAtivo].forEach((el) =>
      cardBody.appendChild(el)
    );
    mainUsuarios.appendChild(divCard);
  });
}

function exibirEstoque(estoques) {
  mainEstoque.innerHTML = "";
  estoques.forEach((estoque) => {
    const divCard = document.createElement("div");
    const cardBody = document.createElement("div");
    const cdEstoque = document.createElement("p");
    const codigoProduto = document.createElement("p");
    const nmProduto = document.createElement("p");
    const qtdEstoqueProduto = document.createElement("p");
    const flAtivoEstoque = document.createElement("p");

    divCard.classList = "card my-3 mx-auto rounded-4";
    cardBody.classList = "card-body";
    cdEstoque.classList = "text-center text-light fw-bold my-1";
    codigoProduto.classList = nmProduto.classList = qtdEstoqueProduto.classList = flAtivoEstoque.classList =
      "text-primary fw-bold my-1";

    cdEstoque.innerText = `CÓDIGO ESTOQUE: ${estoque.cdEstoque}`;
    codigoProduto.innerText = `CÓDIGO PRODUTO: ${estoque.cdProduto}`;
    nmProduto.innerText = `NOME PRODUTO: ${estoque.nmProduto}`;
    qtdEstoqueProduto.innerText = `QUANTIDADE: ${estoque.qtdEstoqueProduto}`;
    flAtivoEstoque.innerText = `ATIVO: ${estoque.flAtivo}`;

    divCard.appendChild(cardBody);
    [cdEstoque, codigoProduto, nmProduto, qtdEstoqueProduto, flAtivoEstoque].forEach(
      (el) => cardBody.appendChild(el)
    );
    mainEstoque.appendChild(divCard);
  });
}

function exibirProdutos(produtos) {
  mainProdutos.innerHTML = "";
  produtos.forEach((produto) => {
    const divCard = document.createElement("div");
    const cardBody = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("h5");
    const categoria = document.createElement("span");
    const valor = document.createElement("p");
    const descricao = document.createElement("p");

    divCard.classList = "card my-3 mx-auto rounded-4";
    cardBody.classList = "card-body";
    img.classList = "card-img-top";
    title.classList = "fw-bold";
    categoria.classList = "badge px-3 py-1";
    valor.classList = "text-primary fw-bold my-1";

    img.src = `${urlProduto}/${produto.cdProduto}/imagem`;
    img.alt = produto.nmProduto;
    title.innerText = produto.nmProduto;
    categoria.innerText = produto.dsCategoria;
    valor.innerText = `R$ ${produto.vlProduto}`;
    descricao.innerText = produto.dsProduto;

    divCard.appendChild(img);
    divCard.appendChild(cardBody);
    [title, categoria, valor, descricao].forEach((el) => cardBody.appendChild(el));
    mainProdutos.appendChild(divCard);
  });
}


async function fetchComErro(url, options = {}) {
  try {
    const response = await fetch(url, options);
    let data = null;
    try {
      data = await response.json();
    } catch {}
    if (!response.ok) {
      const mensagemErro = data?.message || data?.error || `Erro ${response.status}`;
      throw new Error(mensagemErro);
    }
    return data;
  } catch (error) {
    alert(`${error.message}`);
    console.error("Erro na requisição:", error);
    return null;
  }
}


document.addEventListener("DOMContentLoaded", async function () {
  const usuarios = await fetchComErro(urlUsuario, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (usuarios) exibirUsuario(usuarios);

  const estoques = await fetchComErro(urlEstoque, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (estoques) exibirEstoque(estoques);

  const produtos = await fetchComErro(urlApiProdutos, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (produtos) exibirProdutos(produtos);
});


document.getElementById("botaoCadProduto").addEventListener("click", async function (e) {
  e.preventDefault();
  const nmProduto = document.getElementById("nmProduto").value;
  const vlProduto = document.getElementById("vlProduto").value;
  const dsProduto = document.getElementById("dsProduto").value;
  const dsCategoria = document.getElementById("dsCategoria").value;
  const imgProduto = document.getElementById("imgProduto").files[0];
  const cdEmpresa = document.getElementById("cdEmpresa").value;

  if (!nmProduto || !vlProduto || !dsProduto || !dsCategoria || !imgProduto) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  const categoriaMap = {
    "1": "PERIFERICOS",
    "2": "GABINETE",
    "3": "RAM",
    "4": "PROCESSADOR",
  };
  const Categoria = categoriaMap[dsCategoria];

  const formData = new FormData();
  formData.set("nmProduto", nmProduto);
  formData.set("vlProduto", vlProduto.replace(",", "."));
  formData.set("dsProduto", dsProduto);
  formData.set("dsCategoria", Categoria);
  formData.set("imgProduto", imgProduto);
  formData.set("cdEmpresa", cdEmpresa);

  const data = await fetchComErro(urlProdutoCriar, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (data) {
    alert(`✅ Dados enviados com sucesso! Código do produto: ${data.cdProduto}`);
    document.getElementById("cdProduto").value = data.cdProduto;
    cadProduto.classList.toggle("d-block");
  }
});


document.getElementById("botaoCadEstoque").addEventListener("click", async function () {
  const cdProduto = document.getElementById("cdProduto").value;
  const qtdEstoqueProduto = document.getElementById("qtdEstoqueProduto").value;

  if (!cdProduto || !qtdEstoqueProduto) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  const payload = {
    cdProduto: parseInt(cdProduto),
    qtdEstoqueProduto: parseInt(qtdEstoqueProduto),
  };

  const data = await fetchComErro(urlEstoqueCriar, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (data) {
    const modalEstoque = new bootstrap.Modal(document.getElementById("modalEstoque"));
    modalEstoque.show();
    alert("Dados enviados com sucesso");
  }
});

document.getElementById("logoutAdmin")?.addEventListener("click", () => localStorage.clear());
document.getElementById("logout")?.addEventListener("click", () => localStorage.clear());
