import {days} from "functions.js";

function openDay(day) {
  document.getElementById('sidebar').style.display = 'none';
  const content = document.getElementById('content');
  let html = `<h2>${day.replace('giorno','Giorno ')}</h2><ul class="agenda">`;
  days[day].forEach(item => {
    html += `<li><span class="ora">${item.ora}</span> – ${item.attivita}</li>`;
  });
  html += `</ul><button onclick="goBack()">Torna indietro</button>`;
  content.innerHTML = html;
}

function goBack() {
  document.getElementById('sidebar').style.display = 'block';
  document.getElementById('content').innerHTML = "<h2>Seleziona un giorno dall’elenco</h2>";
}