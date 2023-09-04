// Pravljenje sesije i dohvacanje odma na pocetku da vidimo jel 
// neko vec ulogiran pa da ga ne bacamo na login stranicu
let session = new Session();
session = session.getSession();

if (session != "") {
  window.location.href = 'hexa.html';
}

// S ovima takoder nece ni mocu pristupiti login stranici ako je ulogiran jer ga odma redirecta


// Prikazivanje modala za registraciju na klik - listener na gumb
document.querySelector('#registracija').addEventListener('click', () => {
  document.querySelector('.custom-modal').style.display = 'block';
});

// Micanje modala za registraciju kad se klikne na X - isto listener
document.querySelector('#close-modal').addEventListener('click', () => {
  document.querySelector('.custom-modal').style.display = 'none';
});

// Konfiguracija za validaciju forme iz projekta 8
// To su imena fieldova
let config = {
  'korisnicko_ime': {
    required: true,
    minlength: 5,
    maxlength: 50
  },

  'register_email': {
    required: true,
    email: true,
    minlength: 5,
    maxlength: 50
  },

  'register_lozinka': {
    required: true,
    minlength: 7,
    maxlength: 25,
    matching: 'ponovi_lozinku'
  },

  'ponovi_lozinku': {
    required: true,
    minlength: 7,
    maxlength: 25,
    matching: 'register_lozinka'
  }
}

// Objekt za validaciju
let validator = new Validator(config, '#registrationForm');

// Dodavanje listenera za submit buttton za registraciju
document.querySelector('#registrationForm').addEventListener('submit', e => {
  e.preventDefault();

  if (validator.validationPassed()) {

    // Registracija ako je dobro popunjeno

    // Potreban nam je backend, neka baza podataka gdje cemo cuvati
    // podatke o korisnicima. Za to cemo koristiti Mock API

    // Nije moguce u free planu napraviti za komentare, ali bilo bi da svaki komentar
    // ima ID, userID, postID i content

    // Unasanje korisnika u api
    let user = new User();
    user.username = document.querySelector('#korisnicko_ime').value;
    user.email = document.querySelector('#register_email').value;
    user.password = document.querySelector('#lozinka').value;
    user.create();

    // Ako je uspjesno prosla registracija treba ga redirectati na glavnu stranicu

    // Problem je sada kad smo registrirani on vraca opet na pocetnu stranicu,
    // a i isto ako nismo, mozemo pomocu linka uci u hexa.html. 
    // To se nesmije dogadati pa cemo dodati cookie

    // To se zove session control i on je implementiran na pocetku

  } else {
    // Validacija nije prosla pa izbacujemo gresku
    alert('Polja nisu dobro popunjena');
  }
});


// Login forma
document.querySelector('#loginForm').addEventListener('submit', e => {
  e.preventDefault();

  // Uzimamo mail i lozinku
  let email = document.querySelector('#login_email').value;
  let password = document.querySelector('#login_lozinka').value;

  // Logiramo korisnika tako da stvorimo novi objekt za usera
  let user = new User();

  // Popunimo ga sa podacima
  user.email = email;
  user.password = password;

  // Pozovemo login funkciju koja provjerava jeli korisnik u bazi i logira nas
  user.login();
});