const mainProdutos = document.querySelector("#mainProdutos");
const urlApi = "http://localhost:8085/produto/listar/todos";
const urlproduto = "http://localhost:8085/produto";

let todosProdutos = []; //salva os produtos da API
//função global para reutilizar em filtro e GET home
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

//GET produtos home
document.addEventListener("DOMContentLoaded", function () {
  fetch(urlApi)
    .then((response) => response.json())
    .then((data) => {
      todosProdutos = data;
      exibirProdutos(todosProdutos);
    });
});

//Ação de filtros
document.addEventListener("DOMContentLoaded", function () {
  const categoriaImgs = document.querySelectorAll(".categoriasImg");

  categoriaImgs.forEach((img) => {
    img.addEventListener("click", () => {
      const categoria = img.getAttribute("data-categoria");

      if (!categoria) {
        //Exibi todos os filtros
        exibirProdutos(todosProdutos);
      } else {
        //Exibi apenas a categoria selecionada
        const filtrados = todosProdutos.filter(
          (produto) => produto.dsCategoria === categoria
        );
        exibirProdutos(filtrados);
      }
    });
  });

  const campoBusca = document.getElementById("busca");

  campoBusca.addEventListener("input", () => {
    const termoBusca = campoBusca.value.trim().toLowerCase();

    if (termoBusca === "") {
      exibirProdutos(todosProdutos); //Campo vazio exibi todos
      return;
    }

    const produtosFiltrados = todosProdutos.filter(
      (produto) =>
        produto.nmProduto.toLowerCase().includes(termoBusca) ||
        produto.dsCategoria.toLowerCase().includes(termoBusca)
    );

    exibirProdutos(produtosFiltrados);
  });
});

/*------------------------------------------------------------------------------------------------------*/

const urlUsuario = "http://localhost:8085/usuario/criar";

document.getElementById("botaoLogin").addEventListener("click", function () {
  const nmCliente = document.getElementById("nmCliente").value;
  const nuCPF = document.getElementById("nuCPF").value;
  const nuTelefone = document.getElementById("nuTelefone").value;
  const dsCidade = document.getElementById("dsCidade").value;
  const dsEstado = document.getElementById("dsEstado").value;
  const dsEndereco = document.getElementById("dsEndereco").value;
  const dsEmail = document.getElementById("dsEmail").value;
  const dsSenha = document.getElementById("dsSenha").value;
  const nuEndereco = document.getElementById("nuEndereco").value;
  const nuRG = document.getElementById("nuRG").value;

  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");

    if (cpf.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    if (resto !== parseInt(cpf.charAt(9))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
  }

  if (!validarCPF(nuCPF)) {
    alert("CPF inválido!");
    return;
  }

  function validarSenha(dsSenha) {
    const regexSenhaForte =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*.?&])[A-Za-z\d@$!%*.?&]{8,}$/;

    return regexSenhaForte.test(dsSenha);
  }
  if (!validarSenha(dsSenha)) {
    alert(
      "A senha deve conter no mínimo 8 caracteres, incluindo: letra maiúscula, minúscula, número e caractere especial."
    );
    return;
  }

  if (
    nmCliente &&
    nuCPF &&
    nuTelefone &&
    dsCidade &&
    dsEstado &&
    dsEndereco &&
    nuEndereco &&
    dsSenha &&
    dsEmail
  ) {
    const payload = {
      nmCliente: nmCliente,
      nuCPF: nuCPF,
      nuTelefone: nuTelefone,
      nuRg: nuRG,
      dsCidade: dsCidade,
      dsEstado: dsEstado,
      dsEndereco: dsEndereco,
      nuEndereco: nuEndereco,
      dsEmail: dsEmail,
      dsSenha: dsSenha,
    };

    fetch(urlUsuario, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ao enviar dados: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        alert("Dados enviados com sucesso!");
        console.log("Resposta da API:", data);
      })
      .catch((error) => {
        alert(`Erro: ${error.message}`);
        console.error("Erro no envio:", error);
      });
  } else {
    alert("Por favor, preencha todos os campos!");
  }
});

("use strict");
const limparFormulario = () => {
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

document.getElementById("nuTelefone").addEventListener("input", (e) => {
  let valor = e.target.value.replace(/\D/g, "");
  valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
  valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
  e.target.value = valor.substring(0, 15);
});

document.getElementById("nuCPF").addEventListener("input", (e) => {
  let valor = e.target.value.replace(/\D/g, "");
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
  valor = valor.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
  e.target.value = valor.substring(0, 14);
});
/*------------------------------------------------------------------------------------------------------*/

const dropdownElementList = document.querySelectorAll(".dropdown-toggle");
const dropdownList = [...dropdownElementList].map(
  (dropdownToggleEl) => new bootstrap.Dropdown(dropdownToggleEl)
);
/*------------------------------------------------------------------------------------------------------*/

