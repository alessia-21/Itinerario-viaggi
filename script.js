function openDay(day) {
  // Nasconde la sidebar
  document.getElementById('sidebar').style.display = 'none';

  // Mostra il contenuto scelto
  const content = document.getElementById('content');
  if (day === 'giorno1') {
    content.innerHTML = "<h2>Giorno 1</h2><p>Oggi visitiamo il centro storico con tappe culturali e gastronomiche.</p><button onclick='goBack()'>Torna indietro</button>";
  } else if (day === 'giorno2') {
    content.innerHTML = "<h2>Giorno 2</h2><p>Escursione panoramica in montagna, con pranzo al rifugio.</p><button onclick='goBack()'>Torna indietro</button>";
  } else if (day === 'giorno3') {
    content.innerHTML = "<h2>Giorno 3</h2><p>Giornata di relax al mare, tra sole e passeggiate sul lungomare.</p><button onclick='goBack()'>Torna indietro</button>";
  }
}

function goBack() {
  // Riporta la sidebar visibile
  document.getElementById('sidebar').style.display = 'block';
  // Reset del contenuto
  document.getElementById('content').innerHTML = "<h2>Seleziona un giorno dall’elenco</h2>";
}