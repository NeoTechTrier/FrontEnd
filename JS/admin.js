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
  const token = localStorage.getItem("token");
  fetch(urlUsuario, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
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
    const codigoProduto = document.createElement("p");
    const cdEstoque = document.createElement("p");
    const nmProduto = document.createElement("p");
    const qtdEstoqueProduto = document.createElement("p");
    const flAtivoEstoque = document.createElement("p");

    //Define as listas de classes dos elementos para os cards
    divCard.classList = "card my-3 mx-auto rounded-4";
    cardBody.classList = "card-body";
    cdEstoque.classList = "text-center text-light fw-bold my-1";
    codigoProduto.classList = "text-primary fw-bold my-1";
    nmProduto.classList = "text-primary fw-bold my-1";
    qtdEstoqueProduto.classList = "text-primary fw-bold my-1";
    flAtivoEstoque.classList = "text-primary fw-bold my-1";

    //Define os dados a serem renderizados
    cdEstoque.innerText = `CÓDIGO ESTOQUE: ${estoque.cdEstoque}`;
    codigoProduto.innerText = `CÓDIGO PRODUTO: ${estoque.cdProduto}`;
    nmProduto.innerText = `NOME PRODUTO: ${estoque.nmProduto}`;
    qtdEstoqueProduto.innerText = `QUANTIDADE: ${estoque.qtdEstoqueProduto}`;
    flAtivoEstoque.innerText = `ATIVO: ${estoque.flAtivo}`;

    //Define a ordem dos elementos
    divCard.appendChild(cardBody);
    cardBody.appendChild(cdEstoque);
    cardBody.appendChild(codigoProduto);
    cardBody.appendChild(nmProduto);
    cardBody.appendChild(qtdEstoqueProduto);
    cardBody.appendChild(flAtivoEstoque);
    mainEstoque.appendChild(divCard);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  fetch(urlEstoque, {
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
      exibirEstoque(data);
    })
    .catch((error) => {
      console.error("Erro ao carregar estoque:" + error);
    });
});

/*------------------------------------------------------------------------------------------------------*/

const mainProdutos = document.querySelector("#mainProdutos");
const urlApi = "http://localhost:8085/produto/listar/todos";
const urlproduto = "http://localhost:8085/produto";
const urlDelete = "http://localhost:8085/produto/delete";

function exibirProdutos(produtos) {
  mainProdutos.innerHTML = "";
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
    const btnExcluir = document.createElement("button");
    const qntProduto = document.createElement("p");

    //Define as listas de classes dos elementos para os cards
    div.classList = "px-5 pb-3";
    divCard.classList = "card my-3 mx-auto rounded-4";
    cardBody.classList = "card-body text-center";
    img.classList = "card-img-top";
    title.classList = "fw-bold";
    categoria.classList = "badge px-3 py-1";
    valor.classList = "text-primary fw-bold my-1";
    qntProduto.classList = "badge px-3 py-1 qtEstoque";
    btnExcluir.classList = "btn btn-outline-danger mt-2 w-100 mx-auto";

    //Chama a imagem através do endpoint
    img.src = `${urlproduto}/${produto.cdProduto}/imagem`;
    img.alt = produto.nmProduto;

    //Define os dados a serem renderizados
    title.innerText = `${produto.nmProduto}`;
    categoria.innerText = `${produto.dsCategoria}`;
    valor.innerText = `R$ ${produto.vlProduto}`;
    descricao.innerText = `${produto.dsProduto}`;
    qntProduto.innerText = `Estoque: ${produto.qtdEstoqueProduto}`;
    btnExcluir.innerText = "EXCLUIR";

    btnExcluir.addEventListener("click", function () {
      produtoSelecionado = produto.cdProduto;
      const modalDelete = new bootstrap.Modal(
        document.getElementById("modalDelete")
      );
      modalDelete.show();
    });

    //Define a ordem dos elementos
    divCard.appendChild(img);
    divCard.appendChild(cardBody);
    cardBody.appendChild(title);
    cardBody.appendChild(categoria);
    cardBody.appendChild(valor);
    cardBody.appendChild(descricao);
    cardBody.appendChild(qntProduto);
    div.appendChild(btnExcluir);
    divCard.appendChild(div);
    mainProdutos.appendChild(divCard);
  });

  document.getElementById("btnDelete").addEventListener("click", function () {
    const token = localStorage.getItem("token");
    fetch(`${urlDelete}/${produtoSelecionado}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ao deletar produto: ${response.status}`);
        }
        alert("Produto excluído com sucesso!");
        location.reload();
      })
      .catch((error) => {
        alert(`Erro: ${error.message}`);
        console.error("Erro ao deletar produto:", error);
      });
  });
}

//GET produtos home
document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  fetch(urlApi, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((data) => {
      exibirProdutos(data);
    });
});

/*------------------------------------------------------------------------------------------------------*/

const urlProduto = "http://localhost:8085/produto/criar";

const cadEstoque = document.getElementById("formCadEstoque");
const cadProduto = document.getElementById("formCadProduto");

//POST produtos
document
  .getElementById("botaoCadProduto")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const nmProduto = document.getElementById("nmProduto").value;
    const vlProduto = document.getElementById("vlProduto").value;
    const dsProduto = document.getElementById("dsProduto").value;
    const dsCategoria = document.getElementById("dsCategoria").value;
    const imgProduto = document.getElementById("imgProduto").files[0];
    const cdEmpresa = document.getElementById("cdEmpresa").value;

    let Categoria;
    switch (dsCategoria) {
      case "1":
        Categoria = "PERIFERICOS";
        break;
      case "2":
        Categoria = "GABINETE";
        break;
      case "3":
        Categoria = "RAM";
        break;
      case "4":
        Categoria = "PROCESSADOR";
        break;
    }

    if (nmProduto && vlProduto && dsCategoria && dsProduto && imgProduto) {
      const formData = new FormData();
      formData.set("nmProduto", nmProduto);
      formData.set("vlProduto", vlProduto.replace(",", "."));
      formData.set("dsProduto", dsProduto);
      formData.set("dsCategoria", Categoria);
      formData.set("imgProduto", imgProduto);
      formData.set("cdEmpresa", cdEmpresa);
      console.log(imgProduto);

      const token = localStorage.getItem("token");
      fetch(urlProduto, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erro ao enviar dados: ${response.status}`);
          }
          console.log(imgProduto);
          cadProduto.classList.toggle("d-block");
          return response.json();
        })
        .then((data) => {
          alert(
            "Dados enviados com sucesso!" +
              "Código do produto: " +
              data.cdProduto
          );
          console.log("Resposta da API:", data);
          document.getElementById("cdProduto").value = data.cdProduto;
        })
        .catch((error) => {
          alert(`Erro: ${error.message}`);
          console.error("Erro no envio:", error);
        });
    } else {
      alert("Por favor, preencha todos os campos!");
    }
  });

/*------------------------------------------------------------------------------------------------------*/
const urlEstoqueCriar = "http://localhost:8085/estoque/criar";

document
  .getElementById("botaoCadEstoque")
  .addEventListener("click", function () {
    const cdProduto = document.getElementById("cdProduto").value;
    const qtdEstoqueProduto =
      document.getElementById("qtdEstoqueProduto").value;

    if (cdProduto && qtdEstoqueProduto) {
      const payload = {
        cdProduto: parseInt(cdProduto),
        qtdEstoqueProduto: parseInt(qtdEstoqueProduto),
      };

      const token = localStorage.getItem("token");
      fetch(urlEstoqueCriar, {
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
          const modalEstoque = new bootstrap.Modal(
            document.getElementById("modalEstoque")
          );
          modalEstoque.show();
          return response.json();
        })
        .then((data) => {
          alert("Dados enviados com sucesso");
          console.log("Resposta da API:", data);
        })
        .catch((error) => {
          alert(`Error: ${error.message}`);
          console.error(`Erro ${error.message}`);
        });
    } else {
      alert("Por favor, preencha todos os campos!");
    }
  });

document.getElementById("logoutAdmin").addEventListener("click", () => {
  localStorage.clear();
});

/*------------------------------------------------------------------------------------------------------*/
