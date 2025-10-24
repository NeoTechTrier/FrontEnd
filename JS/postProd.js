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

      fetch(urlProduto, {
        method: "POST",
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

/*---------------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------------------*/
const urlEstoque = "http://localhost:8085/estoque/criar";

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

      fetch(urlEstoque, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
