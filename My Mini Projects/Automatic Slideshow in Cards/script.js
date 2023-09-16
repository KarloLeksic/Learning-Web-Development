// Ovo je da svaki card ima svoje slike i da se one mijenjaju istovremeno, ali svaki sa svojim slikama
/*// Dohvati sve cardove
const cards = document.querySelectorAll('.card');

// U svakom cardu dovati njegove slike
cards.forEach(card => {
  const images = card.querySelectorAll('img');

  // Sakrij sve slike i prikazi samo prvu
  hideAllImages(images);
  images[0].style.display = 'block';

  // Idemo postaviti intervale da se svaki slideshow mijenja sa svojim slikama
  let i = 0;

  setInterval(() => {
    hideAllImages(images);
    images[i].style.display = 'block';
  
    i++;
    if (i >= images.length) {
      i = 0;
    }
  }, 1500);

});

// Za skrivanje svih slika u slideshowu
function hideAllImages(images) {
  images.forEach(img => {
    img.style.display = 'none';
  });
}*/


// Bolje je da se slike prebacuju na hover

// Dohvacanje svih cardova
const cards = document.querySelectorAll('.card');

// Spremanje intervalId-a da bismo ga mogli zaustaviti
let intervalId;

// Kad se hovera bilo koji card, postavlja se timer
cards.forEach(card => {
  // Sakrij sve slike i prikazi samo prvu - ovo ide bez hovera
  const images = card.querySelectorAll('img');
  hideAllImages(images);
  images[0].style.display = 'block';

  // Postavljanje listenera kad miš pređe
  card.addEventListener('mouseenter', () => {
    let i = 0;

    // Postavljanje intervala za svaki card i spremanje ID-a
    intervalId = setInterval(() => {
      // Povecavanje indexa - prikaz sljedece slike
      i++;
      if (i >= images.length) {
        i = 0;
      }

      // Ponovno skrivanje svih slika
      hideAllImages(images);
      images[i].style.display = 'block';
    }, 1000);
  });
});

// I sad kad se mis makne samo prekinemo interval sa ID-jem kojeg imamo
cards.forEach(card => {
  card.addEventListener('mouseleave', () => {
    clearInterval(intervalId);
  });
});

function hideAllImages(images) {
  images.forEach(img => {
    img.style.display = 'none';
  });
}

// Ovo radi savrseno, treba to iskoristiti za portfolio, samo kad bi se samo nekako dodala smooth tranzicija