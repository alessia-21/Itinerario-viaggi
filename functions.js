import { loadTrip, tripFromUrl } from "./parser.js";

let currentTrip = {};

function mostraGalleria(trip) {
  const box = document.getElementById("default-view");
  if (!trip.foto.length) return;
  const gallery = document.createElement("div");
  gallery.className = "gallery";
  trip.foto.forEach(f => {
    const img = document.createElement("img");
    img.src = f.src;
    img.alt = f.alt;
    gallery.appendChild(img);
  });
  box.appendChild(gallery);
}

async function setTrip() {
  const sidebar = document.getElementById("days-list");
  try {
    const trip = await loadTrip(tripFromUrl());
    currentTrip = trip.giorni;
    document.getElementById("trip-title").textContent = trip.nome;
    document.title = "Il Mio Itinerario – " + trip.nome;
    mostraGalleria(trip);

    sidebar.innerHTML = "";
    Object.keys(currentTrip).forEach(dayKey => {
      const li = document.createElement("li");
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
    <ul class="agenda">
  `;

  dati.attivita.forEach(item => {
    html += `<li>
  <span class="ora">${item.ora}</span> – ${item.attivita}
  ${item.nota ? `<span class="nota"> *<em>${item.nota}</em></span>` : ""}
</li>`;
  });

  html += `</ul>`;

  if (dati.noteFinali.length) {
    html += `<ul class="agenda note-finali">`;
    dati.noteFinali.forEach(n => {
      html += `<li><span class="nota"><em>${n}</em></span></li>`;
    });
    html += `</ul>`;
  }

  dayView.innerHTML = html;
  document.getElementById("back-btn").addEventListener("click", goBack);
}

function goBack() {
  document.getElementById("sidebar").style.display = "block";
  document.getElementById("day-view").style.display = "none";
  document.getElementById("default-view").style.display = "block";
}

document.addEventListener("DOMContentLoaded", setTrip);
