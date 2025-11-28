// trip.js
import { jpDaysScopri } from "./utilsScopri.js";

let currentTrip = jpDaysScopri;

function setTrip(trip) {
  currentTrip = trip;
  renderSidebar();
}

function renderSidebar() {
  const sidebar = document.getElementById("days-list");
  sidebar.innerHTML = "";

  Object.keys(currentTrip).forEach(dayKey => {
    const li = document.createElement("li");
    li.textContent = `${dayKey} – ${currentTrip[dayKey].titolo}`;
    li.setAttribute("data-day", dayKey);
    li.addEventListener("click", () => openDay(dayKey));
    sidebar.appendChild(li);
  });
}

export function openDay(dayKey) {
  const dati = currentTrip[dayKey];
  if (!dati) return;

  document.getElementById("sidebar").style.display = "none";
  document.getElementById("default-view").style.display = "none";

  const dayView = document.getElementById("day-view");
  dayView.style.display = "block";

  let html = `
    <div class="day-header">
      <button id="back-btn" class="back-btn">←</button>
      <h2>${dati.titolo}</h2>
    </div>
    <h3>Luoghi di interesse</h3>
    <ul class="luoghi">
  `;

  // Stampa solo i luoghi con descrizione
  dati.luoghi.forEach(l => {
    html += `<li><strong>${l.nome}</strong>: ${l.descrizione}</li>`;
  });

  html += `</ul>`;

  dayView.innerHTML = html;
  document.getElementById("back-btn").addEventListener("click", goBack);
}

function goBack() {
  document.getElementById("sidebar").style.display = "block";
  document.getElementById("day-view").style.display = "none";
  document.getElementById("default-view").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  setTrip(jpDays);   // inizializza sidebar
});
