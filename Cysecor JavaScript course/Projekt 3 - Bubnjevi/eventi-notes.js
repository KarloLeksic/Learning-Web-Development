// Bolji nacin za pisanje finkcija - arrow functions
// Moze i let, ali je const bolje
// Ako u zagradama imamo samo jedan argument, mozemo maknuti zagrade
// Ako u funkciji imamo samo jednu liniju koda, onda mozemo maknuti viticaste
const klikni_me = (a, b) => {
  console.log(a + b);
}

// Pozivanje funkcije
klikni_me(20, 15);


// Dodavanje eventa na btn recimo
let btn = document.querySelector('button');

// Parametri su koji event i koja funkcija
btn.addEventListener("click", function(e) {
  // Sta se dogada u funkciji
  console.log(e); // Ispisemo informacije o tom eventu
});

// Za vise buttona korisnimo petlju da dodamo listener na svaki button

// Ili na moderniji nacin
btn.addEventListener("click", (e) => {
  // Sprijecavanje onoga sta se dogada po defaultu
  // Npr. ako stavimo to na link, on nece voditi na stranicu
  e.preventDefault();
  console.log(e.target); // Ispisuje na sta je kliknuto
});

// Ako zelimo mijenjati sirinu prozora i da se okine event
window.addEventListener("resize", () => {
  // Ispis koja je sirina
  console.log(window.innerWidth);
});

// Slusanje slova koja se upisuju u nekoj formi
let input = document.querySelector('input');

input.addEventListener("keydown", (e) => {
  // Ispisivanje u konzolu tocno ono sta smo upisali i 
  // delite se vidi i sve
  console.log(event.key);
});

// Detektiranje pokrete misa ako zelimo na cijeli window
window.addEventListener("mousemove", (e) => {

});
// Ako zelimo na nekom elementu onda ga upisemo umjesto window