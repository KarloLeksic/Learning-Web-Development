// Dohvatimo sve inpute
let inputs = document.querySelectorAll('input');

// Mjesto za upisivanje gresaka
// To je objekat koji sadrzi nizove
// key-value parovi
let errors = {
  "ime_prezime": [],
  "korisnicko_ime": [],
  "email": [],
  "lozinka": [],
  "ponovi_lozinku": []
};

// Provjeravamo inpute i koja je njihova vrijednost
inputs.forEach(element => {
  // Reagira se na promjenu svakog elementa
  element.addEventListener('change', e => {
    // Dobivamo tocno taj element na kojeg smo kliknuli
    let currentInput = e.target;

    // Uzimamo vrijednost tog unosa
    let inputValue = currentInput.value;

    // Dobivanje atributa name iz trenutnog inputa da znamo o kojem se radi
    let inputName = currentInput.getAttribute('name');

    // Zelimo da svako polje ima 4 znakova
    if (inputValue.length > 4) {
      // Ako ima, validacija za svaki posebno, ali prije ispraznimo greske koje su bile od prije
      errors[inputName] = [];

      // Idemo po svakom inputu
      switch (inputName) {
        case 'ime_prezime':
          // Mora imati razmak i to znaci da imamo ime i prezime, ali taj razmak ne smije 
          // biti na kraju ili na pocetku da nebi neko mogo zeznut validaciju
          // Zato ga trimamo
          let validation = inputValue.trim();

          // Razdvajamo trimani niz po razmaku jel ih sad na kraju i na pocetku nema
          validation = validation.split(' ');

          // Ako validation niz ima 2 ili vise elementa to znaci da imamo ime i prezime
          if (validation.length < 2) {
            errors[inputName].push('Moras napisati i ime i prezime!');
          }
          break;

        case 'email':
          if (!validateEmail(inputValue)) {
            // Ako nije dobar
            errors[inputName].push('Neispravna email adresa!');
          }
          break;

        case 'ponovi_lozinku':
          // Bitno nam je samo da se poklapaju gornja i donja lozinka
          let lozinka = document.querySelector('input[name="lozinka"]').value;
          if (inputValue !== lozinka) {
            errors[inputName].push('Lozinke se ne poklapaju!');
          }
          break;
      }
    } else {
      // Ako nemamo 4 znaka u bilo kojoj ispisujemo ovu gresku
      errors[inputName] = ['Polje ne moze imati manje od 5 znakova!'];
    }

    populateErrors();
  });
});

// Funkcija za ispisivanje gresaka na ekran
const populateErrors = () => {
  // Praznimo greske koje su bile
  for (let elem of document.querySelectorAll('ul')) {
    elem.remove();
  }

  // Uzimamo sve kljuceve od objekta errors i idemo kroz petlju
  for (let key of Object.keys(errors)) {
    // Uzimanje tocno tog inputa
    let input = document.querySelector(`input[name='${key}']`);

    // Uzimanje parrent elementa
    let parentElement = input.parentElement;

    // Stvaranje elementa za gresku (<ul>) jer ga nema u html-u
    let errorsElement = document.createElement('ul');

    // Dodavanje na kraj parrenta
    parentElement.appendChild(errorsElement);

    // Prolazimo kroz greske po keyevima
    errors[key].forEach(error => {
      // Stvaramo li za svaku gresku
      let li = document.createElement('li');

      // Dodjeljujemo greski njenu vrijednost
      li.innerText = error;

      // Dodajemo gresku na ekran ispod inputa
      errorsElement.appendChild(li);
    });
  }
}

// Ovo se zove regex
const validateEmail = email => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }

  return false;
}