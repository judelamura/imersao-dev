let cardContainer = document.querySelector(".card-container");
let searchInput = document.querySelector("#searchInput");
let searchButton = document.querySelector("#botao-busca");
let dados = [];

async function IniciarBusca() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    // Renderiza todos os cards inicialmente
    renderizarCards(dados);

    // Adiciona o "ouvinte" para o evento de clique no botão
    searchButton.addEventListener("click", () => {
        realizarBusca();
    });

    // Opcional: Realizar a busca também ao pressionar "Enter" no campo de busca
    searchInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            realizarBusca();
        }
    });
}

function realizarBusca() {
    const termoBusca = searchInput.value.toLowerCase();
    
    const dadosFiltrados = dados.filter(dado => {
        const nome = dado.nome.toLowerCase();
        const descricao = dado.descricao.toLowerCase();
        // Converte o ano para string para poder usar o método 'includes'
        const ano = dado.ano.toString(); 
        return nome.includes(termoBusca) || descricao.includes(termoBusca) || ano.includes(termoBusca);
    });

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = "";

    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.ano}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>  
        `
        cardContainer.appendChild(article);
    }
}

// Inicia todo o processo quando a página carrega
IniciarBusca();