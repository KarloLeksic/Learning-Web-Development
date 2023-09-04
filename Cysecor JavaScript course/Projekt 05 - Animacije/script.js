// Dohvacanje animiranog teksta
let textTag = document.querySelector('.section1 h1');
let text = textTag.textContent; // Moglo je i innerText

// Da bi napravili animaciju, nju napravimo u CSS-u, i onda
// samo dodamo klasu preko JS-a
// Odma ju doda prilikom ucitavanja stranice
//textTag.classList = 'fadeMove';

// Potrebno je razbiti text na slova i onda na svako slovo primjeniti animaciju
let splitedText = text.split(''); // Splitamo po nicemu da dobijemo svako slovo posebno

// Ispraznimo glavni h1 tag da nemamo 2 teksta
textTag.innerHTML = '';

// Stavimo svako slovo u svoj span
for (let i = 0; i < splitedText.length; i++) {
  if (splitedText[i] === ' ') {
    splitedText[i] = '&nbsp'
  }
  textTag.innerHTML += `<span>${splitedText[i]}</span>`;
}

// Dodavanje klase koja animira fadeMove
// setIntervar funkcija izvrsava nesto u zadanim vremenskim intervalima, prvi
// argument je funkcija, a drugi vrijeme u milisekundama
let k = 0;
let spans = textTag.querySelectorAll('span');
let interval = setInterval(() => {
  // Uzimamo svaki span i dodajemo im klasu, svake sekunde sljedecem
  let singleSpan = spans[k];

  singleSpan.className = 'fadeMove'; // Klasa za animaciju
  k++;

  // Problem je da dodaje klase i kad prode sva slova
  if (k === spans.length) {
    // Micemo interval funkciju kada dode do kraja
    clearInterval(interval);
  }
}, 70);

// Za crtu koja se popunjava treba nam event listener za skrolanje
// Samo pomicemo width i crta ide

let border = document.querySelector('.border-line');
let animationWitdh = 0;

window.onscroll = () => {

  // Moramo znati u kojem smjeru idemo
  if (this.oldScroll > this.scrollY) {
    // Idemo gore
    animationWitdh -= 1.5;
  } else {
    // Idemo dole
    animationWitdh += 1.5;
  }

  if (animationWitdh >= 100) {
    animationWitdh = 100;
  }

  if (animationWitdh <= 0) {
    animationWitdh = 0;
  }

  border.style.width = animationWitdh + '%';

  this.oldScroll = this.scrollY;

  // Trenutna pozicija skrola
  // Ja bi recimo ovo mapirao umjesto animation width, mozda je bolje
  //console.log(this.scrollY);

  // Funkcija za aute koji dolaze
  imageAnimation();
}

const imageAnimation = () => {
  // Da bi se auti pomaknuli na 0, samo moramo transform vratiti na 0 jer smo
  // napravili pocetne postavke da budu sa strane
  // Ali to moramo odraditi tek kada se dode na taj dio stranice jel bi inace
  // oni odradili kad bi malo skrolnuli i nebi vidjeli ako nismo na tom djelu stranice
  let sectionForAnimation = document.querySelector('.section2 .images');

  // Dobivanje pozicije koliko je ta pozicija udaljena od vrha browsera
  let sectionPosition = sectionForAnimation.getBoundingClientRect().top;

  // Dobivanje broja koliko je velik ekran kojeg trenutno gledamo
  let screenPosition = window.innerHeight;

  let leftImage = document.querySelector('.slideFromLeft');
  let rightImage = document.querySelector('.slideFromRight');

  // Ako je section position manji od screen position onda treba trigerat animaciju
  // Ispisati u konzoli oba i vidjeti sta se dogada ako je nejasno

  // /1.3 znaci da mora uc za 30 % u sliku da bi se trigerala animacija
  if (sectionPosition < screenPosition / 1.3) {
    // Posto vec imaju class name, sad moramo class list
    leftImage.classList.add('animated');
    rightImage.classList.add('animated');
  }
}
