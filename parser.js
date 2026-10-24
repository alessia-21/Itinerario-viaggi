// parser.js — legge i viaggi scritti in testo semplice (cartella data/)
//
// FORMATO di data/<id>.txt
//   # Nome viaggio | Periodo | latitudine, longitudine     <- prima riga (serve alla mappa)
//   @foto img/IMG_0001.JPG | Tokyo                         <- opzionale, una riga per foto
//   ## Titolo del giorno                                   <- inizia un nuovo giorno
//   08:45 | Attività | nota facoltativa                    <- una riga per attività
//   > Nota di fine giornata                                <- nota finale (facoltativa)
//   + Nome luogo | icona | Descrizione                     <- luogo per "Scopri di più" (facoltativo)
//   // commento (ignorato)
//
// I giorni si numerano da soli: giorno1, giorno2, ...

const SEP = " | ";

export function parseTrip(testo) {
  const trip = { nome: "", periodo: "", lat: 0, lng: 0, foto: [], giorni: {} };
  let n = 0;
  let giorno = null;

  testo.split(/\r?\n/).forEach(raw => {
    const riga = raw.trim();
    if (!riga || riga.startsWith("//")) return;

    if (riga.startsWith("## ")) {
      n++;
      giorno = { titolo: riga.slice(3).trim(), attivita: [], noteFinali: [], luoghi: [] };
      trip.giorni["giorno" + n] = giorno;
    } else if (riga.startsWith("# ")) {
      const [nome, periodo, coord] = riga.slice(2).split(SEP).map(s => s.trim());
      const [lat, lng] = (coord || "0,0").split(",").map(Number);
      Object.assign(trip, { nome, periodo: periodo || "", lat, lng });
    } else if (riga.startsWith("@foto")) {
      const [src, alt] = riga.slice(5).split(SEP).map(s => s.trim());
      trip.foto.push({ src, alt: alt || "" });
    } else if (!giorno) {
      return; // righe prima del primo giorno: ignorate
    } else if (riga.startsWith(">")) {
      giorno.noteFinali.push(riga.slice(1).trim());
    } else if (riga.startsWith("+")) {
      const [nome, icona, descrizione] = riga.slice(1).split(SEP).map(s => s.trim());
      giorno.luoghi.push({
        nome: icona ? `${nome} <i class='fas fa-${icona}'></i>` : nome,
        descrizione: descrizione || ""
      });
    } else {
      const [ora, attivita, nota] = riga.split(SEP).map(s => s.trim());
      giorno.attivita.push({ ora, attivita: attivita || "", nota });
    }
  });

  return trip;
}

export async function loadTrip(id) {
  const res = await fetch(`data/${id}.txt`);
  if (!res.ok) throw new Error(`Viaggio "${id}" non trovato`);
  const trip = parseTrip(await res.text());
  trip.id = id;
  return trip;
}

// data/index.txt: un id di viaggio per riga (l'ordine è quello mostrato)
export async function loadAllTrips() {
  const res = await fetch("data/index.txt");
  const ids = (await res.text())
    .split(/\r?\n/).map(s => s.trim())
    .filter(s => s && !s.startsWith("//"));
  const risultati = await Promise.allSettled(ids.map(loadTrip));
  return risultati.filter(r => r.status === "fulfilled").map(r => r.value);
}

export function tripFromUrl() {
  return new URLSearchParams(window.location.search).get("trip") || "giappone";
}
