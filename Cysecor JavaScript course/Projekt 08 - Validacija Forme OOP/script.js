// Prvi nacin: object literal

/*
const Osoba = {
  first_name: 'Niko',
  last_name: 'Nikolic',
  phone: '0123456789',

  getNameAndPhone: function () {
    console.log(`${this.first_name} - ${this.phone}`);
  }
}

Osoba.getNameAndPhone();
*/

// Problem je u tome sto bi za jos jednu osobu morali jos jednom sve pisati

// Bolji nacin
/*
function Osoba(first_name, last_name, phone) {
  this.first_name = first_name;
  this.last_name = last_name;
  this.phone = phone;

  this.getNameAndPhone = function () {
    console.log(`${first_name} - ${phone}`);
  }
}

let osoba1 = new Osoba('Niko', 'Nikolic', '0123456789');
let osoba2 = new Osoba('Ivan', 'Ivanic', '0123654789');

osoba1.getNameAndPhone();
*/

/* Ovo nijie neki nacin
const Osoba = {
  first_name: 'Niko',
  getNameAndPhone: function () {
    console.log(`${this.first_name} - ${this.phone}`);
  }
}

// Nemamo telefon pa dobijemo undefined
Osoba.getNameAndPhone();

// Ali ju mozemo dodati na nacin
Osoba.phone = '123456789';
// Problem je taj sto u objekt dodajemo telefon, pa svaka instanca tog objekta ima taj telefon
// To ne valja

// Mozemo na ovaj nacin
let niko = Object.create(Osoba);
niko.phone = '0132456789';
niko.getNameAndPhone();
*/

// Najbolje je ovako
// Ovo je sablona
/*
class Osoba {
  constructor(first_name, last_name, phone) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone = phone;
  }

  getNameAndPhone() {
    console.log(`${this.first_name} - ${this.phone}`);
  }
}

// Ovo je objekt
let osoba1 = new Osoba('Niko', 'Nikolic', '0654978654');

osoba1.getNameAndPhone();

// Mozemo pristupati propertijima i ovako
osoba1.phone; // Mozemo ga printat ili bilo sta
*/

// Mala glupa animacija koja nije u tutorijalu, al je fora
let form = document.querySelector('form');
form.className = 'animate';

// Projekt

// Konfiguracija koja vrijedi za pojedina polja
let config = {
  'ime_prezime': {
    required: true,
    minlength: 3,
    maxlength: 50
  },

  'korisnicko_ime': {
    required: true,
    minlength: 5,
    maxlength: 50
  },

  'email': {
    required: true,
    email: true,
    minlength: 5,
    maxlength: 50
  },

  'broj_telefona': {
    required: false,
    minlength: 9,
    maxlength: 13
  },

  'postanski_broj': {
    // Mozemo i izostaviti ako je false
    required: false,
    onlyNumbers: true,
    minlength: 5,
    maxlength: 10
  },

  'lozinka': {
    required: true,
    minlength: 7,
    maxlength: 25,
    matching: 'ponovi_lozinku'
  },

  'ponovi_lozinku': {
    required: true,
    minlength: 7,
    maxlength: 25,
    matching: 'lozinka'
  }
};

let validator = new Validator(config);