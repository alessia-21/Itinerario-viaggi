// functionsScopri.js — pagina "Scopri di più" di un singolo viaggio
import { loadTrip, tripFromUrl } from "./parser.js";

let currentTrip = {};

async function setTrip() {
  const sidebar = document.getElementById("trip-days");
  try {
    const trip = await loadTrip(tripFromUrl());
    document.getElementById("trip-title").textContent = trip.nome;
    document.title = "Scopri – " + trip.nome;

    // Solo i giorni che hanno almeno un luogo descritto
    currentTrip = {};
    Object.entries(trip.giorni).forEach(([k, g]) => {
      if (g.luoghi.length) currentTrip[k] = g;
    });

    const box = document.getElementById("default-view");
    trip.foto.forEach((f, i) => {
      if (i === 0) {
        const gallery = document.createElement("div");
        gallery.className = "gallery";
        box.appendChild(gallery);
      }
      const img = document.createElement("img");
      img.src = f.src;
      img.alt = f.alt;
      box.querySelector(".gallery").appendChild(img);
    });

    sidebar.innerHTML = "";
    if (!Object.keys(currentTrip).length) {
      sidebar.innerHTML = "<li>Nessuna descrizione ancora per questo viaggio.</li>";
      return;
    }
    Object.keys(currentTrip).forEach(dayKey => {
      const li = document.createElement("li");
      li.classList.add("trip-day-item");
      li.textContent = `${dayKey} – ${currentTrip[dayKey].titolo}`;
      li.setAttribute("data-day", dayKey);
      li.addEventListener("click", () => openDay(dayKey));
      sidebar.appendChild(li);
    });
  } catch (e) {
    sidebar.innerHTML = `<li>${e.message}</li>`;
  }
}

export function openDay(day) {
  document.getElementById("sidebar").style.display = "none";
  document.getElementById("default-view").style.display = "none";
  const dayView = document.getElementById("day-view");
  dayView.style.display = "block";

  const dati = currentTrip[day];

  let html = `
    <div class="day-header">
      <button id="back-btn" class="back-btn">←</button>
      <h2>${dati.titolo}</h2>
    </div>
    <h3>Luoghi di interesse</h3>
    <ul class="luoghi">
  `;

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

document.addEventListener("DOMContentLoaded", setTrip);
