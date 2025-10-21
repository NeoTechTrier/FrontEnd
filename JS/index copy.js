const urlProduto = "http://localhost:8085/produto/criar";

//POST produtos
document
  .getElementById("botaoCadProduto")
  .addEventListener("click", function () {
    const nmProduto = document.getElementById("nmProduto").value;
    const vlProduto = document.getElementById("vlProduto").value;
    const dsProduto = document.getElementById("dsProduto").value;
    const dsCategoria = document.getElementById("dsCategoria").value;
    const imgProduto = document.getElementById("imgProduto").files[0];
    const cdEmpresa = document.getElementById("cdEmpresa").value;

    if (nmProduto && vlProduto && dsCategoria && dsProduto && imgProduto) {
      const formData = new FormData();
      formData.set("nmProduto", nmProduto);
      formData.set("vlProduto", parseFloat(vlProduto, 10));
      formData.set("dsProduto", dsProduto);
      formData.set("dsCategoria", dsCategoria);
      formData.set("imgProduto", imgProduto);
      formData.set("cdEmpresa", cdEmpresa);

      fetch(urlProduto, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erro ao enviar dados: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          alert("Dados enviados com sucesso");
          console.log("Resposta da API:", data);
          return response.json();
        })
        .catch((error) => {
          alert(`Error: ${error.message}`);
          console.error(`Erro ${error.message}`);
          return response.json();
        });
    } else {
      alert("Por favor, preencha todos os campos!");
    }
  });
