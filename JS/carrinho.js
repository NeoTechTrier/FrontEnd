let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let freteValor = 0;


const valoresFrete = {
    'Norte': 45.00,
    'Nordeste': 40.00,
    'Centro-Oeste': 35.00,
    'Sudeste': 25.00,
    'Sul': 30.00
};

// Itens do carrinho
function renderizarCarrinho() {
    const cartItemsDiv = document.getElementById('cartItems');
    
    if (carrinho.length === 0) {
        cartItemsDiv.innerHTML = `
            <div class="text-center py-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-cart-x mb-3" viewBox="0 0 16 16">
                    <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793z"/>
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
                <h3>Seu carrinho está vazio</h3>
                <p class="text-muted">Adicione produtos para começar suas compras!</p>
                <a href="Index.html" class="btn btn-primary mt-3">Ver Produtos</a>
            </div>
        `;
        return;
    }

    cartItemsDiv.innerHTML = carrinho.map((item, index) => `
        <div class="cart-item">
            <div class="row align-items-center">
                <div class="col-md-2 text-center">
                    <img src="${item.imagem}" alt="${item.nome}" class="product-image">
                </div>
                <div class="col-md-4">
                    <h5 class="mb-1">${item.nome}</h5>
                    <p class="text-muted mb-0">${item.categoria}</p>
                </div>
                <div class="col-md-2 text-center">
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="diminuirQuantidade(${index})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantidade}" min="1" readonly>
                        <button class="quantity-btn" onclick="aumentarQuantidade(${index})">+</button>
                    </div>
                </div>
                <div class="col-md-2 text-center">
                    <p class="mb-0 fw-bold">R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
                </div>
                <div class="col-md-2 text-center">
                    <button class="remove-btn" onclick="removerItem(${index})" title="Remover item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    atualizarResumo();
}


function aumentarQuantidade(index) {
    carrinho[index].quantidade++;
    salvarCarrinho();
    renderizarCarrinho();
}

function diminuirQuantidade(index) {
    if (carrinho[index].quantidade > 1) {
        carrinho[index].quantidade--;
        salvarCarrinho();
        renderizarCarrinho();
    }
}

function removerItem(index) {
    if (confirm('Deseja remover este item do carrinho?')) {
        carrinho.splice(index, 1);
        salvarCarrinho();
        renderizarCarrinho();
    }
}


function calcularSubtotal() {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
}

function calcularTotalItens() {
    return carrinho.reduce((total, item) => total + item.quantidade, 0);
}

function atualizarResumo() {
    const subtotal = calcularSubtotal();
    const totalItens = calcularTotalItens();
    const total = subtotal + freteValor;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2).replace('.', ',');
    document.getElementById('totalItems').textContent = totalItens;
    document.getElementById('total').textContent = total.toFixed(2).replace('.', ',');
}

// localStorage
function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

document.getElementById('frete').addEventListener('change', function() {
    const regiao = this.value;
    const custoFreteDiv = document.getElementById('custoFrete');
    const freteValorSpan = document.getElementById('freteValor');

    if (regiao) {
        freteValor = valoresFrete[regiao];
        custoFreteDiv.style.display = 'block';
        custoFreteDiv.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-success me-1" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
            Frete calculado: R$ ${freteValor.toFixed(2).replace('.', ',')}
        `;
        freteValorSpan.textContent = `R$ ${freteValor.toFixed(2).replace('.', ',')}`;
    } else {
        freteValor = 0;
        custoFreteDiv.style.display = 'none';
        freteValorSpan.textContent = 'R$ 0,00';
    }

    atualizarResumo();
});

document.getElementById('btnFinalizar').addEventListener('click', function() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    const regiao = document.getElementById('frete').value;
    if (!regiao) {
        alert('Por favor, selecione uma região para calcular o frete!');
        return;
    }

    alert('Compra finalizada com sucesso! Em breve você receberá um email de confirmação.');
    carrinho = [];
    salvarCarrinho();
    renderizarCarrinho();
    document.getElementById('frete').value = '';
    freteValor = 0;
    document.getElementById('custoFrete').style.display = 'none';
    document.getElementById('freteValor').textContent = 'R$ 0,00';
});

document.getElementById('btnContinuar').addEventListener('click', function() {
    window.location.href = 'Index.html';
});

renderizarCarrinho();