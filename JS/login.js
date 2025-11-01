const urlLogin = "http://localhost:8085/auth/login";

document.getElementById("botaoLogin").addEventListener("click", async function () {
  const dsEmail = document.getElementById("dsEmailLogin").value.trim();
  const dsSenha = document.getElementById("dsSenhaLogin").value.trim();

  if (!dsEmail || !dsSenha) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  const payload = {
    dsEmail: dsEmail,
    dsSenha: dsSenha,
  };

  try {
    const response = await fetch(urlLogin, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let data = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      const mensagemErro =
        data?.message ||
        data?.error ||
        `Erro ao enviar dados (${response.status})`;

      alert(`${mensagemErro}`);
      console.error("Erro de login:", data);
      return;
    }

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
  } catch (error) {
    console.error("Erro inesperado:", error);
    alert(`Erro de conexão: ${error.message}`);
  }
});
