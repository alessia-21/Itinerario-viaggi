import { jpDays } from "./utils.js";

let currentTrip = jpDays;

function setTrip(trip) {
  currentTrip = trip;
  const sidebar = document.getElementById('days-list');
  sidebar.innerHTML = "";
  Object.keys(currentTrip).forEach(dayKey => {
    const li = document.createElement("li");
    li.textContent = `${dayKey} – ${currentTrip[dayKey].titolo}`;
    li.setAttribute("data-day", dayKey);
    li.addEventListener("click", () => openDay(dayKey));
    sidebar.appendChild(li);
  });
}

export function openDay(day) {
  document.getElementById('sidebar').style.display = 'none';
  document.getElementById('default-view').style.display = 'none';
  const dayView = document.getElementById('day-view');
  dayView.style.display = 'block';

  const dati = currentTrip[day];

  
  let html = `
    <div class="day-header">
      <button id="back-btn" class="back-btn">←</button>
      <h2>${dati.titolo}</h2>
    </div>
    <ul class="agenda">
  `;

  dati.attivita.forEach(item => {
  
  html += `<li>
  <span class="ora">${item.ora}</span> – ${item.attivita}
  ${item.nota ? `<span class="nota"> *<em>${item.nota}</em></span>` : ""}
</li>`;
  });

  html += `</ul>`;
  dayView.innerHTML = html;

  document.getElementById('back-btn').addEventListener('click', goBack);
}

function goBack() {
  document.getElementById('sidebar').style.display = 'block';
  document.getElementById('day-view').style.display = 'none';
  document.getElementById('default-view').style.display = 'block';
}

document.addEventListener("DOMContentLoaded", () => {
  setTrip(jpDays);   // inizializza sidebar
});
