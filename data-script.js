document.addEventListener('DOMContentLoaded', function() {
    const clientsList = JSON.parse(localStorage.getItem('salaoThayClients')) || [];
    const dataContainer = document.getElementById('clientDataDisplay');
    
    if (clientsList.length === 0) {
      dataContainer.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-user-slash"></i>
          <p>Nenhum cliente cadastrado ainda.</p>
          <a href="pesquisa.html" class="cta-button">Cadastrar Primeiro Cliente</a>
        </div>
      `;
      return;
    }
    
    // Ordenar por data mais recente primeiro
    clientsList.sort((a, b) => new Date(b.dataCadastro) - new Date(a.dataCadastro));
    
    let html = `
      <div class="clients-header">
        <h3>Total de Clientes: ${clientsList.length}</h3>
        <div class="search-box">
          <input type="text" id="clientSearch" placeholder="Buscar cliente...">
          <i class="fas fa-search"></i>
        </div>
      </div>
      
      <div class="clients-grid">
    `;
    
    clientsList.forEach((client, index) => {
      const registerDate = new Date(client.dataCadastro).toLocaleDateString('pt-BR');
      
      html += `
        <div class="client-card" data-client-index="${index}">
          <div class="client-header">
            <h4>${client.nome || 'Cliente sem nome'}</h4>
            <span class="register-date">${registerDate}</span>
          </div>
          
          <div class="client-summary">
            <p><strong>Contato:</strong> ${client.endereco || 'Não informado'}</p>
            <p><strong>Último procedimento:</strong> ${client.procedimento || 'Não informado'}</p>
            <p><strong>Autoestima:</strong> ${client.definicaoAutoestima ? client.definicaoAutoestima.substring(0, 50) + (client.definicaoAutoestima.length > 50 ? '...' : '') : 'Não definido'}</p>
          </div>
          
          <button class="view-details" data-client-index="${index}">
            Ver detalhes <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      `;
    });
    
    html += `</div>`;
    
    // Modal para detalhes
    html += `
      <div id="clientModal" class="modal">
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <div id="modalClientDetails"></div>
        </div>
      </div>
    `;
    
    dataContainer.innerHTML = html;
    
    // Adicionar eventos para o modal
    document.querySelectorAll('.view-details').forEach(button => {
      button.addEventListener('click', function() {
        const index = this.getAttribute('data-client-index');
        showClientDetails(clientsList[index]);
      });
    });
    
    document.querySelector('.close-modal')?.addEventListener('click', closeModal);
    
    // Função para buscar clientes
    document.getElementById('clientSearch')?.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      document.querySelectorAll('.client-card').forEach(card => {
        const clientName = card.querySelector('h4').textContent.toLowerCase();
        card.style.display = clientName.includes(searchTerm) ? 'block' : 'none';
      });
    });
  });
  
  function showClientDetails(client) {
    const modal = document.getElementById('clientModal');
    const modalContent = document.getElementById('modalClientDetails');
    
    modalContent.innerHTML = `
      <h3>${client.nome || 'Cliente sem nome'}</h3>
      <div class="client-details-grid">
        <div class="detail-section">
          <h4>Dados Pessoais</h4>
          <p><strong>Contato:</strong> ${client.endereco || 'Não informado'}</p>
          <p><strong>Nascimento:</strong> ${client.dataNasc || 'Não informado'}</p>
          <p><strong>Data Cadastro:</strong> ${new Date(client.dataCadastro).toLocaleString('pt-BR')}</p>
        </div>
        
        <div class="detail-section">
          <h4>Autoavaliação</h4>
          <p><strong>Exercícios:</strong> ${client.exercicios || 'Não informado'}</p>
          <p><strong>Filhos:</strong> ${client.filhos || 'Não informado'}</p>
          <p><strong>Cabelo natural:</strong> ${client.cabeloNatural || 'Não informado'}</p>
          <p><strong>Muda cor:</strong> ${client.mudarCor || 'Não informado'}</p>
        </div>
        
        <div class="detail-section">
          <h4>Cabelo</h4>
          <p><strong>Tipo:</strong> ${Array.isArray(client.tipoCabelo) ? client.tipoCabelo.join(', ') : (client.tipoCabelo || 'Não informado')}</p>
          <p><strong>Oleosidade:</strong> ${client.oleosidade || 'Não informada'}</p>
          <p><strong>Textura:</strong> ${client.textura || 'Não informada'}</p>
        </div>
        
        <div class="detail-section">
          <h4>Cuidados</h4>
          <p><strong>Último procedimento:</strong> ${client.procedimento || 'Não informado'}</p>
          <p><strong>Rotina:</strong> ${client.rotinaCuidados || 'Não informada'}</p>
          <p><strong>Último corte:</strong> ${client.ultimoCorte || 'Não informado'}</p>
        </div>
        
        <div class="detail-section">
          <h4>Preferências</h4>
          <p><strong>Música favorita:</strong> ${client.musica || 'Não informada'}</p>
          <p><strong>3 palavras:</strong> ${client.tresPalavras || 'Não informado'}</p>
          <p><strong>Praia/Campo:</strong> ${client.preferencia || 'Não informada'}</p>
        </div>
        
        <div class="detail-section">
          <h4>Outras Informações</h4>
          <p><strong>O que traz alegria:</strong> ${client.alegria || 'Não informado'}</p>
          <p><strong>Incômodo com cabelo:</strong> ${client.incomodoCabelo || 'Não informado'}</p>
          <p><strong>Expectativas:</strong> ${client.expectativa || 'Não informado'}</p>
        </div>
      </div>
      
      <div class="full-width-section">
        <h4>Definição de Autoestima</h4>
        <p>${client.definicaoAutoestima || 'Não definido'}</p>
      </div>
      
      <div class="full-width-section">
        <h4>Informações Adicionais</h4>
        <p>${client.informacoesAdicionais || 'Nenhuma informação adicional'}</p>
      </div>
    `;
    
    modal.style.display = 'block';
  }
  
  function closeModal() {
    document.getElementById('clientModal').style.display = 'none';
  }
  
  // Fechar modal ao clicar fora
  window.addEventListener('click', function(event) {
    const modal = document.getElementById('clientModal');
    if (event.target === modal) {
      closeModal();
    }
  });