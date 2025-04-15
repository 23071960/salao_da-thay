document.addEventListener("DOMContentLoaded", async () => {
  const display = document.getElementById('clientDataDisplay');
  const endpoint = 'https://script.google.com/macros/s/AKfycbycQdygEYQ6TmRn_NBaRDVv57HJF3zf89_3fs6HIykeE7n_-XQ0kMn51jTvij8gTCQO/exec';

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.length === 0) {
      display.innerHTML = '<p>Nenhum dado encontrado.</p>';
      return;
    }

    let table = '<table><thead><tr>';
    Object.keys(data[0]).forEach(key => {
      table += `<th>${key}</th>`;
    });
    table += '</tr></thead><tbody>';

    data.forEach(row => {
      table += '<tr>';
      Object.values(row).forEach(value => {
        table += `<td>${value}</td>`;
      });
      table += '</tr>';
    });

    table += '</tbody></table>';
    display.innerHTML = table;
  } catch (err) {
    console.error('Erro ao buscar dados:', err);
    display.innerHTML = '<p>Erro ao carregar dados.</p>';
  }
});
