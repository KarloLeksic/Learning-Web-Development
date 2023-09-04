// Dohvacanje elemenata po njihovim ID-evima, mogli smo koristiti i querySelector
const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

// poziva se kada se klikne add button
function addTask() {
  // Provjeravamo jeli polje za unos prazno
  if (inputBox.value === '') {
    // Ako je ispisi poruku 
    alert('You must write something!');
  }
  else {
    // Ako nije prazno kreiarj list item
    let li = document.createElement('li');

    // Dodjeljivanje vrijednosti (teksta zabiljeske)
    li.innerHTML = inputBox.value;

    // Dodavanje na stranicu
    listContainer.appendChild(li);

    // Kreiranje span elementa za x
    let span = document.createElement('span');

    // Ovo je simbol za x
    span.innerHTML = '\u00d7';

    // Dodajemo ga u list item jer imamo css za njega da se poravna
    li.appendChild(span);
  }

  inputBox.value = '';
  saveData();
}

// Dodavanje akcije kada se klikne na list item cijeli kako bi mogli pristupiti i li i spanu
// e koji je parametar funkcije je objekt koji sadrzi informacije o tom eventu
// onda gledamo gdje je tocno stisnuto i na temelju toga radimo razne akcije
listContainer.addEventListener('click', function (e) {
  // Ako je kliknuto na tekst, onda treba staviti ili maknuti klasu
  // u CSS-u je sredeno kak svaka izgleda
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
  }

  // Ako je kliknuto bas na span onda ga treba obrisati
  else if (e.target.tagName === 'SPAN') {
    e.target.parentElement.remove();
  }
  saveData();
}, false);

function saveData() {
  localStorage.setItem('data', listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem('data');
}

showTask();