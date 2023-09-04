// Ovo ne radi zato jer nemamo nikakvu domenu, a to nam je bitno da se 
// zna ciji su cookiji 

// Trebamo nekakav server, a to mozemo pokrenuti u pythonu tako
// da odemo sa cmd-om u tu mapu, upisemo "python -m http.server"
// i otvorimo u browseru locallhost:8000 ili koji vec port pise

// Dohvacanje svih cookiea - nema na pocetku
//let kolacici = document.cookie;

// Dodavanje novog cookiea
document.cookie = 'name=cysecor';

// Dodavanje roka trajanja
document.cookie = "login=1; expires=Thu, 20 Sep 2024 12:00:00 UTC";

// Ili na bolji nacin vrijeme
// Objekt za vrijeme
const date = new Date();

let today = date.getTime(); // Trenutno vrijeme
let expires = 2 * 24 * 60 * 60 * 1000; // Vrijeme u milisekundama mora biti

// Postavljanje vremena na za 2 dana kada zelimo da istekne
date.setTime(today + expires);

// Pretvorba u string u tom formatu
let new_date = date.toUTCString();

document.cookie = `test=1; expires=${new_date}`;

// Samo za ispis
kolacici = document.cookie;
console.log(kolacici);

// Svaki puta kada refreshamo on pravi novi cookie jer je ovako napravljeno