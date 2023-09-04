// Varijabla za ukupnu cijenu, kao globalna
let allTotal = 0;

// Ovaj element se odnosi na element na koji je kliknut
function addToCart(element) {
  // Zeimo uzeti cijeli taj div koji se odnosi na jedan proizvod jer nam trebaju
  // vise informacija
  let mainEl = element.closest('.single-item');

  // Treba nam cijena, pretrazujemo u glavnom elementu kojeg smo prethodno nasli
  let price = mainEl.querySelector('.price').innerText;

  // Isto tako uzimamo i ime
  let name = mainEl.querySelector('h3').innerText;

  // Uzmemo kolicinu, ali treba paziti jer dobijemo string!
  let quantity = parseInt(mainEl.querySelector('input').value);

  // Uzimanje vrijednosti iz inputa, tako smo napravili da je 
  // odma iznad pa se moze uzeti sa previous sibling da bude efikasno
  //let input = element.previousElementSibling;

  // Dohvacanje podrucja za kosaricu da ubacimo 
  let cartItems = document.querySelector('.cart-items');

  // Provjera koliko je dodano, nemoze 0
  if (quantity > 0) {

    price = parseInt(price.substring(1));

    let total = price * quantity;

    allTotal += total;

    // Dodavanje na stranicu
    cartItems.innerHTML += `<div class="cart-single-item">
                                <h3>${name}</h3>
                                <p>$${price} x ${quantity} = $<span>${total}</span></p>
                                <button onclick="removeFromCart(this)" class="remove-item">Ukloni</button>
                            </div>`;

    document.querySelector('.total').innerText = `Total: $${allTotal}`;

    // Zelimo disableati gumb kada dodamo
    // Isipsujemo da je dodano
    element.innerText = 'Dodano';

    // Disable gumba
    element.setAttribute('disabled', 'true');

  } else {
    alert('Odaberi kolicinu');
  }
}

function removeFromCart(element) {
  // Dphvacamo glavni element kojeg brisemo
  let mainEl = element.closest('.cart-single-item');

  // Dohvacanje cijene za pojedinu namirnicu
  let price = parseInt(mainEl.querySelector('p span').innerText);

  allTotal -= price;

  // Upisivanje na mjesto
  document.querySelector('.total').innerText = `Total: $${allTotal}`;

  // Brisemo
  mainEl.remove();

  // Vracanje inputa na 0 i vracanje gumba
  // Dohvacanje trenutnog povrca
  let name = mainEl.querySelector('h3').innerText;

  // Dohvacanje svih povrca
  let vegetables = document.querySelectorAll('.single-item');
  
  // Prolazimo kroz sve povrce da vidimo na koji smo kliknuli
  vegetables.forEach(function(vege) {
    // Dohvacamo ime trenutnog / na koji je kliknuto i usporedujemo sa svima
    if(vege.querySelector('.si-content h3').innerText === name) {
      // Ako je isto vracamo value na 0
      vege.querySelector('.actions input').value = 0;

      // Vracanje gumba na pocetno stanje
      vege.querySelector('.actions button').removeAttribute('disabled');
      vege.querySelector('.actions button').innerText ='Dodaj';
    }
  });
}