// Simulação de dados do carrinho
const carrinho = [
  { nome: "Produto 1", preco: 89.9 },
  { nome: "Produto 2", preco: 149.0 },
  { nome: "Produto 3", preco: 59.9 },
];

const valorFrete = 25.0;

// Calcular valores
function calcularValores() {
  const subtotal = carrinho.reduce((acc, item) => acc + item.preco, 0);
  const total = subtotal + valorFrete;

  document.getElementById("subtotal").textContent = `R$ ${subtotal
    .toFixed(2)
    .replace(".", ",")}`;
  document.getElementById("frete").textContent = `R$ ${valorFrete
    .toFixed(2)
    .replace(".", ",")}`;
  document.getElementById("total").textContent = `R$ ${total
    .toFixed(2)
    .replace(".", ",")}`;
}

calcularValores();

function selectPayment(type) {
  
  document.querySelectorAll(".payment-option").forEach((opt) => {
    opt.classList.remove("active");
  });

 
  document.querySelectorAll(".payment-details").forEach((detail) => {
    detail.classList.remove("active");
  });

  
  document.querySelector(`#${type}`).checked = true;
  document.querySelector(`#${type}`).parentElement.classList.add("active");

  
  document.getElementById(`${type}-details`).classList.add("active");
}

function confirmarPagamento(tipo) {
  const total = document.getElementById("total").textContent;


  const modalHTML = `
        <div class="modal fade" id="successModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body text-center p-5">
                        <div class="mb-4">
                            <i class="fas fa-check-circle text-success" style="font-size: 80px;"></i>
                        </div>
                        <h3 class="text-success mb-3">Pagamento Aprovado!</h3>
                        <p class="text-muted mb-2">Pagamento com cartão de ${tipo}</p>
                        <h4 class="text-dark">${total}</h4>
                        <p class="text-muted mt-3">Seu pedido foi confirmado com sucesso!</p>
                        <button type="button" class="btn btn-success mt-3" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const modal = new bootstrap.Modal(document.getElementById("successModal"));
  modal.show();

  document
    .getElementById("successModal")
    .addEventListener("hidden.bs.modal", function () {
      this.remove();
    });
}
