const urlEditEmpresa = "http://localhost:8085/empresa/update";
const urlEmpresa = "http://localhost:8085/empresa";

document.getElementById("editar").addEventListener("click", function () {
  const modalEditEmpresa = new bootstrap.Modal(
    document.getElementById("modalEditEmpresa")
  );
  modalEditEmpresa.show();
});

document.getElementById("botaoEditar").addEventListener("click", function () {
  const cdEmpresa = document.getElementById("cdEmpresa").value;
  const mudanca = document.getElementById("mudanca").value;
  const select = document.getElementById("selectEmpresa").value;

  switch (select) {
    case "nmFantasia":
      payload = { nmFantasia: mudanca };
      break;
    case "nmRazao":
      payload = { nmRazao: mudanca };
      break;
    case "nuCNPJ":
      payload = { nuCNPJ: mudanca };
      break;
    case "nuTelefone":
      payload = { nuTelefone: mudanca };
      break;
    case "dsCidade":
      payload = { dsCidade: mudanca };
      break;
    case "dsEstado":
      payload = { dsEstado: mudanca };
      break;
    case "dsEndereco":
      payload = { dsEndereco: mudanca };
      break;
    case "nuEndereco":
      payload = { nuEndereco: mudanca };
      break;
  }

  const token = localStorage.getItem("token");
  fetch(`${urlEditEmpresa}/${cdEmpresa}`, {
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
