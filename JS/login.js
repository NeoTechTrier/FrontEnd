//LOGIN
const urlLogin = "http://localhost:8085/auth/login";

const btnLogin = document
  .getElementById("botaoLogin")
  .addEventListener("click", function () {
    const dsEmail = document.getElementById("dsEmailLogin").value.trim();
    const dsSenha = document.getElementById("dsSenhaLogin").value.trim();

    if (dsEmail && dsSenha) {
      const payload = {
        dsEmail: dsEmail,
        dsSenha: dsSenha,
      };

      fetch(urlLogin, {
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
          return response.json();
        })
        .then((data) => {
          const token = data.token;

          if (!token) {
            alert("Login falhou: token não recebido!");
            return;
          }

          localStorage.setItem("token", token);
          localStorage.setItem("cdUsuario", data.cdUsuario);
          localStorage.setItem("dsEstado", data.dsEstado);

          if (data.userRole === "USER") {
            window.location.href = "logado.html";
          } else if (data.userRole === "ADMIN") {
            window.location.href = "homeAdmin.html";
          }
          alert("Login realizado com sucesso!");
        })
        .catch((error) => {
          alert(`Erro: ${error.message}`);
          console.error("Erro no envio:", error);
        });
    } else {
      alert("Por favor, preencha todos os campos!");
    }
  });
