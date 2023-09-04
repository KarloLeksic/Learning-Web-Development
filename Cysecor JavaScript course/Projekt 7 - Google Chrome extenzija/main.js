/*
Da bi se dodalo u Chrome odemo na upravljanje prosirenjima i ukljucimo developer mode.
Zatim kliknemo na "Ucitaj raspakirano" i odaberemo mapu gdje je extenzija

Svaki put kad izmjenimo kod extenzije moramo otici na extensions u chrome i 
kliknuti ikonicu za reload
*/

// Ucitamo logo, najbolje inspectamo i vidimo jel smo ga ulovili sa console log
let logo = document.querySelector('.lnXdpd');

// Ako napisemo ovako onda on trazi na googlu sliku
// logo.src = 'images/cysecor_logo.png';

// Da bi ucitali sliku sa naseg kompjutera moramo ju uciniti dostupnima, a to je u manifestu
logo.src = chrome.runtime.getURL('images/cysecor_logo.png');
logo.srcset = chrome.runtime.getURL('images/cysecor_logo.png');

// Ovo sam dodao jer nije bilo automatski, slika je bila ozoblicena
// Mozda postoji i bolji nacin za ovo
//logo.width = '100';
//logo.height = '120';

// Samostalno
// Promjena logoa kada preta=razujemo
let logo1 = document.querySelector('a img .jfN4p');
console.log('nasa slikaaa:' + logo1);

//logo1.src = chrome.runtime.getURL('images/cysecor_logo.png');
//logo1.srcset = chrome.runtime.getURL('images/cysecor_logo.png');
