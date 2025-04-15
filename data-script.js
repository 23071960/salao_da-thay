async function fetchClientData() {
  const response = await fetch('https://opensheet.elk.sh/1oONTghcFATt2sRBUkBiNRjymq_m8c4VXt2aHpJxfasU/Respostas');
  const data = await response.json();
  const container = document.getElementById('clientDataDisplay');
  container.innerHTML = '';

  if (data.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-user-slash"></i>
        <p>Nenhum cliente cadastrado ainda.</p>
      </div>`;
    return;
  }

  window.clientData = data;
  renderClientCards(data);
}

function renderClientCards(data) {
  const container = document.getElementById('clientDataDisplay');
  container.innerHTML = '';

  data.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'client-card';
    card.innerHTML = `
      <div class="client-header">
        <h4>${item.nome}</h4>
        <span class="register-date">${item.Timestamp.split("T")[0]}</span>
      </div>
      <div class="client-summary">
        <p><strong>Telefone:</strong> ${item.telefone}</p>
        <p><strong>Endereço:</strong> ${item.endereco}</p>
        <p><strong>Tipo de Cabelo:</strong> ${item.tipoCabelo}</p>
        <button class="view-details" onclick="showClientDetails(${index})">
          Ver mais <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function showClientDetails(index) {
  const client = window.clientData[index];
  const modal = document.getElementById('clientModal');
  const detailGrid = document.getElementById('clientDetails');

  const fieldMap = {
    nome: 'Nome Completo',
    telefone: 'Telefone',
    endereco: 'Endereço',
    dataNasc: 'Data de Nascimento',
    autoImagem: 'Autoimagem',
    autoestima: 'Autoestima',
    inseguranca: 'Inseguranças',
    tipoCabelo: 'Tipo de Cabelo',
    corCabelo: 'Cor do Cabelo',
    comprimentoCabelo: 'Comprimento do Cabelo',
    procedimentos: 'Procedimentos já realizados',
    rotina: 'Rotina de cuidados',
    produtos: 'Produtos usados',
    alergias: 'Alergias',
    expectativas: 'Expectativas',
    preferencias: 'Preferências',
    observacoes: 'Observações',
    Timestamp: 'Data de Registro'
  };

  detailGrid.innerHTML = Object.entries(client)
    .filter(([key]) => fieldMap[key])
    .map(([key, value]) => `
      <div class="detail-section">
        <h4>${fieldMap[key]}</h4>
        <p>${value}</p>
      </div>
    `).join('');

  modal.style.display = 'block';
}

window.onclick = function(event) {
  const modal = document.getElementById('clientModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

document.addEventListener('DOMContentLoaded', fetchClientData);
