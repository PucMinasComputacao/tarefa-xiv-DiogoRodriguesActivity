const API_URL = "http://localhost:3000/catalogo";

async function fetchItems() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Erro ao buscar dados.");
  return await response.json();
}

function createCard(item) {
  const card = document.createElement("div");
  card.className = "filme-card";

  card.innerHTML = `
    <img src="${item.imagem}" alt="${item.titulo}">
    <div class="card-body">
      <span class="categoria">${item.categoria} · ${item.tipo === "serie" ? "Série" : "Filme"}</span>
      <h2>${item.titulo}</h2>
      <p>${item.descricaoCurta}</p>
      <div class="card-footer">
        <span class="nota">⭐ ${item.nota}</span>
        <a href="details.html?id=${item.id}">Ver detalhes →</a>
      </div>
    </div>
  `;

  return card;
}

function renderCards(items) {
  const container = document.getElementById("cards-lista");
  container.innerHTML = "";

  if (!items || items.length === 0) {
    showMessage("Nenhum item encontrado.");
    return;
  }

  showMessage("");
  items.forEach(item => container.appendChild(createCard(item)));
}

function showMessage(text) {
  document.getElementById("message").textContent = text;
}

async function init() {
  showMessage("Carregando...");
  try {
    const items = await fetchItems();
    renderCards(items);
  } catch (error) {
    showMessage("Erro ao carregar. Json não está ativado.");
    console.error(error);
  }
}

init();