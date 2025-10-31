const urlEditEstoque = "http://localhost:8085/estoque/update";

document.getElementById("cdEstoque").addEventListener("input", function () {
  document.getElementById("cdProduto").value = this.value;
});

document.getElementById("editar").addEventListener("click", function () {
  const modalEditEstoque = new bootstrap.Modal(
    document.getElementById("modalEditEstoque")
  );
  modalEditEstoque.show();
});

document.getElementById("botaoEditar").addEventListener("click", function () {
  const cdEstoque = document.getElementById("cdEstoque").value;
  const cdProduto = document.getElementById("cdProduto").value;
  const qtdEstoqueProduto = document.getElementById("qtdEstoqueProduto").value;

  const payload = {
    cdProduto: parseInt(cdProduto),
    qtdEstoqueProduto: parseInt(qtdEstoqueProduto),
  };
  const token = localStorage.getItem("token");
  fetch(`${urlEditEstoque}/${cdEstoque}`, {
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
  console.log(payload);
});
