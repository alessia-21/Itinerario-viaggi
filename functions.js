import { days } from "./utils.js";

function openDay(day) {
  document.getElementById('sidebar').style.display = 'none';
  document.getElementById('default-view').style.display = 'none';
  const dayView = document.getElementById('day-view');
  dayView.style.display = 'block';

  const dati = days[day];
  let html = `<h2>${dati.titolo}</h2><ul class="agenda">`;

  dati.attivita.forEach(item => {
    html += `<li>
      <span class="ora">${item.ora}</span> – ${item.attivita}
      ${item.nota ? `<div class="nota">(${item.nota})</div>` : ""}
    </li>`;
  });

  html += `</ul>`;

  if (dati.noteFinali && dati.noteFinali.length > 0) {
    html += `<h3>Note finali</h3><ul class="note-finali">`;
    dati.noteFinali.forEach(nota => {
      html += `<li>${nota}</li>`;
    });
    html += `</ul>`;
  }

  html += `<button id="back-btn">Torna indietro</button>`;
  dayView.innerHTML = html;

  document.getElementById('back-btn').addEventListener('click', goBack);
}

function goBack() {
  document.getElementById('sidebar').style.display = 'block';
  document.getElementById('day-view').style.display = 'none';
  document.getElementById('default-view').style.display = 'block';
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('#days-list li').forEach(li => {
    li.addEventListener('click', () => {
      const day = li.getAttribute('data-day');
      openDay(day);
    });
  });
});