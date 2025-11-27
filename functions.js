import { days } from "./utils.js";

function openDay(day) {
  document.getElementById('sidebar').style.display = 'none';
  const content = document.getElementById('content');
  let html = `<h2>${day.replace('giorno','Giorno ')}</h2><ul class="agenda">`;
  days[day].forEach(item => {
    html += `<li><span class="ora">${item.ora}</span> – ${item.attivita}</li>`;
  });
  html += `</ul><button id="back-btn">Torna indietro</button>`;
  content.innerHTML = html;

  document.getElementById('back-btn').addEventListener('click', goBack);
}

function goBack() {
  document.getElementById('sidebar').style.display = 'block';
  document.getElementById('content').innerHTML = "<h2>Seleziona un giorno dall’elenco</h2>";
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('#days-list li').forEach(li => {
    li.addEventListener('click', () => {
      const day = li.getAttribute('data-day');
      openDay(day);
    });
  });
});