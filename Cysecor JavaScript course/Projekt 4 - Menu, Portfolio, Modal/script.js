// Kada kliknemo menu tipku da se otvori meni
const mobileMenu = () => {

  // Dohvacanje liste u koju je smjesten meni
  let menu = document.querySelector('.header ul');

  // Dohvacanje gumba
  let btn = document.querySelector('.header button');

  // Mozemo provjeravati sto pise i na temelju toga mjenjati sto pise i prikazivati meni
  if (btn.innerText === 'MENU') {
    // Cijeli CSS se moze pisati preko JS-a na nacin da se napise 
    // .style i onda .zeljeniProperty

    // Prikaz menija ispod
    menu.style.display = 'block';

    // Da na gumbu pise close
    btn.innerText = 'CLOSE';
  } else {
    // Sakrivanje menija
    menu.style.display = 'none';

    // Da na gumbu pise MENU
    btn.innerText = 'MENU';
  }
}

// Slider za slike radi na nacin da samo jedna slika ima display block, a ostale
// display none. Kada se klikne na strelicu mjenjamo property display tako da sljedeca
// slika ima display block, a ostale none

// Dohvacanje buttona i slika
let rightBtn = document.querySelector('#right-btn');
let leftBtn = document.querySelector('#left-btn');
let pictures = document.querySelectorAll('.slider-images img');

// Index za sliku koja se prikazuje
let imgNum = 0;

// Dodavanje listenera na buttone
rightBtn.addEventListener('click', () => {
  // Stavimo sve da su none
  displayNone();

  // Povecavamo index slike koja se prikazuje
  imgNum++;

  // Prelazak na prvu sliju kad dode do kraja
  if (imgNum === pictures.length) {
    imgNum = 0;
  }

  // Samo ta koju ocemo da bude block
  pictures[imgNum].style.display = 'block';
});

// Isto ko na desno samo suprotno
leftBtn.addEventListener('click', () => {
  displayNone();
  imgNum--;

  if (imgNum === -1) {
    imgNum = pictures.length - 1;
  }

  pictures[imgNum].style.display = 'block';
});

// Ovo u listenerima smo mogli staviti u funkcije da izgleda ljepse

// Stavljanje svih slika na display: none;
const displayNone = () => {
  // pictures smo gore dohvatili
  pictures.forEach((img) => {
    // Stavljanje svake slike na none
    img.style.display = 'none';
  });
}

// Prikazivanje itema po kategorijama
// Svaki element ima custom atribut koji se zove 'data-category' i ima vrijednost
// onoga sto se u tom divu nalazi (hoteli, ostalo, restorani, ...).
// data-category su poveznica izmedu gumbova u portfolio-categories i portfolio-items

const portfolioSort = (button) => {
  // Uzimanje data categoryja iz buttona
  let category = button.getAttribute('data-category');

  // Kad kliknemo na neku, sve ih sakrijemo i pokazemo samo te kliknute

  // Skrivanje svih 'portfolio-item'-a
  // Dohgvacanje svih
  let portfolioItems = document.querySelectorAll('.portfolio-single-item');

  // Skrivanje
  portfolioItems.forEach((item) => {
    item.style.display = 'none';
  });

  // Pokazivanje svih ako je kliknuto na sve
  if (category === 'sve') {
    portfolioItems.forEach((item) => {
      item.style.display = 'block';
    });
  }

  // Prolazanje kroz sve atribute i usporedujemo jel se na gumbu nalazi
  // isti atribut ko i u div-u za prikazivanje. U divu za prikazivanje ih moze biti vise
  // pa se zato koristi includes
  portfolioItems.forEach((item) => {
    if (item.getAttribute('data-category').includes(category)) {
      item.style.display = 'block';
    }
  });
}

// Modal - napravljen u CSS pomocu position fixed
// JS samo prikazuje kad se klikne na njega - promjena display propertyja
// Funkcija je mogla i preko event listenera
const openModal = () => {
  // Dohvacanje modala iz htmla
  let modalWindow = document.querySelector('.popup-modal');

  // Prikazivanje modala
  modalWindow.style.display = 'block';

  // Prikazivanje overlaya
  let overlay = document.querySelector('.overlay');
  overlay.style.display = 'block';
}

// Zatvaramo modal
const closeModal = () => {
  let modalWindow = document.querySelector('.popup-modal');
  modalWindow.style.display = 'none';

  let overlay = document.querySelector('.overlay');
  overlay.style.display = 'none';
}