class Validator {
  constructor(config) {
    // Ucitavamo konfu
    this.elementsConfig = config;

    // Objekt za errore, prazno, kasnije cemo dodati keyeve iz konfe
    this.errors = {};

    this.generateErrorsObject();
    this.inputListener();
  }

  // Pravimo niz koji ce sadrzavati greske i postavljamo ga da bude prazan
  generateErrorsObject() {
    for (let field in this.elementsConfig) {
      // Dodajemo da ima key kao naziv kako bi mogli kasnije odrediti gdje ide greska
      this.errors[field] = [];
    }
  }

  // Stavljamo listenere
  inputListener() {
    // Uzimamo elements config jer su tu upisani nazivi tih polja
    // i svaki name u tome nam je selektor za jedan input
    // Zato smo ih i nazvali da se zovu identicno
    let inputSelector = this.elementsConfig;

    for (let field in inputSelector) {
      // field ide po imenu i prezimenu, emailu, dobi tocan name iz konfe 
      // da tocno njega nade i doda listener koji validira
      let el = document.querySelector(`input[name = '${field}']`);

      /* 
        0. - ime_prezime
        1. - korisnicko_ime
        2. - ...
      */

      // validate je funkcija koja ce validirati inpute
      // input je event kada god nesto unisimo
      // Predajemo mu this da znamo s kojim elementom baratamo
      el.addEventListener('input', this.validate.bind(this));
    }
  }

  //  Glavna funkcija za validiranje
  validate(e) {
    // Uzimamo sva polja, a ona se nalaze u objektu za konfiguraciju
    let elFields = this.elementsConfig;

    // Uzmemo trenutno polje, hvatamo ga jer smo poslali this gore u listeneru
    let field = e.target;

    // Uzimamo naziv polja i njegovu vrijednost
    let fieldName = field.getAttribute('name');
    let fieldValue = field.value;

    // Praznimo polje sa greskama
    // Koristimo field name jer je tako u konfi da se ide po imenima
    // Gore je errors prazan i onda mu dodajemo atribute koje god zelimo
    // Najlakse je po imenu
    this.errors[fieldName] = [];

    // Provjera jel obavezno i jel prazno
    // elFields je konfa
    // [fieldName] je ime u konfi (za indeksiranje), a svako to ime ima 
    // jos neke vrijednosti kojima pristupamo sa tockom
    // fileName gleda trenutni input
    if (elFields[fieldName].required) {
      // Ako je obavezno i ako je prazno onda nevalja, mora biti nesta
      if (fieldValue === '') {
        this.errors[fieldName].push('Polje je prazno!');
      }
    }

    // Provjeravamo mail sa regexom iz proslog projekta
    if (elFields[fieldName].email) {
      if (!this.validateEmail(fieldValue)) {
        this.errors[fieldName].push('Neispravna email adresa!');
      }
    }

    // Provjera jel su samo brojevi 
    if (elFields[fieldName].onlyNumbers) {
      if (!this.validatePostalCode(fieldValue)) {
        this.errors[fieldName].push('Neispravan postanski broj!');
      }
    }

    // Provjeravamo jel dobra duljina
    if (fieldValue.length < elFields[fieldName].minlength ||
      fieldValue.length > elFields[fieldName].maxlength) {
      this.errors[fieldName].push(`Polje mora imati minimalno ${elFields[fieldName].minlength} i maksimalno ${elFields[fieldName].maxlength} znakova`)
    }

    // Provjera jel se lozinke poklapaju
    if (elFields[fieldName].matching) {
      // Pronaci element s kojim se matcha, to je definirano u konfi
      let matchingEl = document.querySelector(`input[name="${elFields[fieldName].matching}"]`);

      if (fieldValue !== matchingEl.value) {
        // Ako se ne mecaju, staviti gresku u niz
        this.errors[fieldName].push('Lozinke se ne poklapaju');
      }

      // Mice gresku i gore i dole ako se unese dobra lozinka
      // Provjera jel se mecaju, ako da, string za gresku ce biti 0
      if (this.errors[fieldName].length === 0) {
        // Praznimo gresku trenutnom elementu
        this.errors[fieldName] = [];

        // Praznimo gresku elementu koji se mora mecati
        this.errors[elFields[fieldName].matching] = [];
      }
    }

    // Ispisati greske koje smo popunili u errors objekt
    this.populateErrors(this.errors);
  }

  populateErrors(errors) {
    // Brisemo <ul>ove da nemamo duple greske
    for (const elem of document.querySelectorAll('ul')) {
      elem.remove();
    }

    // Prolazimo kroz greske prema keyevima u errors objektu (poklapaju se sa konfom i svime)
    for (let key of Object.keys(errors)) {
      // Dohvacanje parent elementa da bi dodali child u njega
      let parentElement = document.querySelector(`input[name="${key}"]`).parentElement;

      // Kreiranje ul elementa gdje cemo staviti li ako ima greske
      let errorsElement = document.createElement('ul');

      // Dodavanje ul na kraj parrenta (ispod input elementa)
      parentElement.appendChild(errorsElement);

      // Kada smo u trenutnoj gresci po keyu, moze ih biti vise za dodavanje pa idemo
      // dodati jedan po jedan string na ekran, jednu po jednu gresku za jedan input koja moze biti
      errors[key].forEach(error => {
        // Kreiranje li elementa
        let li = document.createElement('li');

        // Dodavanje teksta greske
        li.innerText = error;

        // Dodavanje na stranicu
        errorsElement.appendChild(li);
      });
    }
  }

  // Validacija emaila preko regexa, vraca true ak valja, false ak nevalja
  validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }

    return false;
  }

  // Validacija postanskog broja, da budu samo brojevi, nemoze slova
  validatePostalCode(postalCode) {
    if (/^[0-9]*$/.test(postalCode)) {
      return true;
    }

    return false;
  }
}