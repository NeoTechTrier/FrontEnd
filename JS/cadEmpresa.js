const urlEmpresa = "http://localhost:8085/empresa/criar";

document
  .getElementById("botaoCadEmpresa")
  .addEventListener("click", function () {
    const nmFantasia = document.getElementById("nmFantasia").value;
    const nmRazao = document.getElementById("nmRazao").value;
    const nuCNPJ = document.getElementById("nuCNPJ").value;
    const nuTelefone = document
      .getElementById("nuTelefone")
      .value.replace(/\D/g, "");

    const dsCidade = document.getElementById("dsCidade").value;
    const dsEstado = document.getElementById("dsEstado").value;
    const dsEndereco = document.getElementById("dsEndereco").value;
    const nuEndereco = document.getElementById("nuEndereco").value;

    if (
      nmFantasia &&
      nmRazao &&
      nuCNPJ &&
      nuTelefone &&
      dsCidade &&
      dsEstado &&
      dsEndereco &&
      nuEndereco
    ) {
      const payload = {
        nmFantasia: nmFantasia,
        nmRazao: nmRazao,
        nuCNPJ: nuCNPJ,
        nuTelefone: nuTelefone,
        dsCidade: dsCidade,
        dsEstado: dsEstado,
        dsEndereco: dsEndereco,
        nuEndereco: nuEndereco,
      };
      console.log("Telefone enviado:", nuTelefone);
      console.log("CNPJ enviado:", nuCNPJ);
      const token = localStorage.getItem("token");
      fetch(urlEmpresa, {
        method: "POST",
        headers: { "Content-Type": "application/json",Authorization: `Bearer ${token}`},
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
          alert(`Erro: ${error.message} `);
          console.error(`Erro no envio:", ${error}`);
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

/*Mascaras*/
document.getElementById("nuCNPJ").addEventListener("input", (e) => {
  let valor = e.target.value();
  e.target.value = valor.substring(0, 18);
});

document.getElementById("nuTelefone").addEventListener("input", (e) => {
  let valor = e.target.value.replace(/\D/g, "");
  valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
  valor = valor.replace(/(\d{5})(\d{4})/, "$1-$2");
  e.target.value = valor.substring(0, 15);
});
