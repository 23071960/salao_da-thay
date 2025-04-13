document.getElementById('clientForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Coletar dados do formulário
    const formData = new FormData(this);
    const clientData = {};
    
    // Processar dados do formulário
    formData.forEach((value, key) => {
      if (key === 'tipoCabelo') {
        if (!clientData[key]) clientData[key] = [];
        clientData[key].push(value);
      } else {
        clientData[key] = value;
      }
    });
    
    // Adicionar data/hora do cadastro
    clientData.dataCadastro = new Date().toISOString();
    
    // Recuperar lista existente ou criar nova
    let clientsList = JSON.parse(localStorage.getItem('salaoThayClients')) || [];
    
    // Adicionar novo cliente
    clientsList.push(clientData);
    
    // Salvar no localStorage
    localStorage.setItem('salaoThayClients', JSON.stringify(clientsList));
    
    // Redirecionar para a página de dados
    window.location.href = 'dados_recebidos.html';
  });