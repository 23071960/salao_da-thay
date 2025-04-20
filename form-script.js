document.getElementById('form-cliente').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;

  const formData = new FormData(form);

  // Captura os checkboxes manualmente e junta numa string
  const tipoCabelo = Array.from(form.querySelectorAll('input[name="tipoCabelo"]:checked'))
                          .map(el => el.value)
                          .join(',');

  formData.set('tipoCabelo', tipoCabelo); // substitui ou adiciona

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbyLCt-_kLK27IIshD1JlNY3q0LwpG9U5E7oASWOYN_2mK63XVqgK6f75Oxn0Jv3mkb5/exec', {
      method: 'POST',
      body: formData
      // Não use headers aqui, o navegador define automaticamente para FormData
    });

    if (response.ok) {
      alert('Ficha enviada com sucesso!');
      form.reset();
    } else {
      const errorText = await response.text();
      console.error('Erro ao enviar:', errorText);
      alert('Erro ao enviar os dados.');
    }
  } catch (err) {
    console.error('Erro na requisição:', err);
    alert('Erro ao enviar os dados.');
  }
});

// Preenche a data automaticamente no campo de data de hoje
window.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('currentDate').value = today;
});

