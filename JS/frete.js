document.getElementById("frete").addEventListener("change", function() {
 const regioes = {
        "Norte": 20.00,
        "Nordeste": 15.00,
        "Centro-Oeste": 12.00,
        "Sudeste": 10.00,
        "Sul": 18.00
    };

    const regiaoSelecionada = this.value;
    const custoFrete = regioes[regiaoSelecionada];
    const textoExibicao = custoFrete ? `Custo do frete para ${regiaoSelecionada}: R$ ${custoFrete.toFixed(2)}` : "Selecione uma região válida.";

    document.getElementById("custoFrete").innerText = textoExibicao;
});