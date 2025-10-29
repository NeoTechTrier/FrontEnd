const urlEditarPerfil = "http://localhost:8085/usuario/update";
const urlPerfil = "http://localhost:8085/usuario/buscar";

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const cdUsuario = localStorage.getItem("cdUsuario");
  fetch(`${urlPerfil}/${cdUsuario}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("nmCliente").value = data.nmCliente;
      document.getElementById("nuCPF").value = data.nuCPF;
      document.getElementById("nuTelefone").value = data.nuTelefone;
      document.getElementById("dsCidade").value = data.dsCidade;
      document.getElementById("dsEstado").value = data.dsEstado;
      document.getElementById("dsEndereco").value = data.dsEndereco;
      document.getElementById("dsEmail").value = data.dsEmail;
      document.getElementById("nuEndereco").value = data.nuEndereco;
      document.getElementById("nuRG").value = data.nuRG;
      console.log(data);
      console.log(token);
      console.log(cdUsuario);
    });
  document.getElementById("editarModal").addEventListener("click", () => {
    const modalAviso = new bootstrap.Modal(
      document.getElementById("modalAviso")
    );
    modalAviso.show();
  });

  document.getElementById("botaoEditar").addEventListener("click", function () {
    const nmCliente = document.getElementById("nmCliente").value;
    const nuCPF = document.getElementById("nuCPF").value;
    const nuTelefone = document.getElementById("nuTelefone").value;
    const dsCidade = document.getElementById("dsCidade").value;
    const dsEstado = document.getElementById("dsEstado").value;
    const dsEndereco = document.getElementById("dsEndereco").value;
    const dsEmail = document.getElementById("dsEmail").value;
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
    };
    const token = localStorage.getItem("token");
    const cdUsuario = localStorage.getItem("cdUsuario");

    fetch(`${urlEditarPerfil}/${cdUsuario}`, {
      method: "PUT",
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
        alert("Dados atualizados com sucesso!");
        console.log("Resposta da API:", data);
      })
      .catch((error) => {
        alert(`Erro: ${error.message}`);
        console.error("Erro no envio:", error);
      });
  });
});

document.getElementById("logout").addEventListener("click", function () {
  localStorage.clear();
});
