// Sve ovo do sada je bio sinkroni JS
// Kod se izvrsava liniju po liniju tim redosljedom
// Mozemo staviti funkciju setTimeout(() => {}, 1000); da se ne prestaje izvrsavati tu

// AJAX je asinkroni JS i mozemo ga napraviti da se ono sta traje duze izvrsava u pozadini,
// a ostatak nastavi odma

// https://64cf987dffcda80aff52048d.mockapi.io/:endpoint

// AJAX zahtjev na stariji nacin, imamo API gore
/*
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if(this.readyState == 4 && this.status == 200) {
    console.log(xhttp.responseText);
  }
}
xhttp.open('GET', 'https://64cf987dffcda80aff52048d.mockapi.io/users', true);
xhttp.send();
*/


// Projektic da se dohvati odredeni mail prema ID-u
document.querySelector('#fetchBtn').addEventListener('click', e => {
  e.preventDefault();

  // Dohvacanje ID-ja koji je unesen u polje
  let id = document.querySelector('#userID').value;

  // Novija metoda - GET request
  let request = fetch('https://64cf987dffcda80aff52048d.mockapi.io/users/' + id)
    .then(response => response.json()).then(data => {
      // Ispis podataka u konzolu
      console.log(data);

      // Dohvacanje polja za ispis na stranicu
      let podaci = document.querySelector('#podaci');

      // Upisivanje na stranicu i cupanje iz JSON formata
      podaci.innerHTML = `<p><b>${data['email']}</b></p>`;

    }).catch(error => {
      alert(error);
    });
});
