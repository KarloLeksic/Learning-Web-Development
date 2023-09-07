// Prazna kosarica na pocetku
export let cart = JSON.parse(localStorage.getItem('cart'));

// Ako je kosarica prazna dodaj neke defaultne
if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1
    }
  ];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantity) {
  // Provjera jel on vec u kosarici, ako je povecanje kolicine, ako nije dodavanje
  let matchingItem;

  // Prolazimo kroz svakog u kosarici
  cart.forEach(cartItem => {
    if (productId === cartItem.productId) {
      // Vec je on u kosarici, spremimo taj item
      matchingItem = cartItem;
    }
  });

  // Ako je pronasao onaj koji vec je u kosarici samo povecati kolicinu
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    // Ako on nije u kosarici onda dodati novog
    cart.push({
      productId: productId,
      // Treba se dodati da cupa koliko je odabrano
      // Dodavanje vrijednosti svakom select elementu da se zna iz kojeg cupati vrijednost
      quantity: quantity
    });
  }

  saveToStorage();
}

// Promjena kolicine kad je vec u kosarici
export function updateQuantity(productId, newQuantity) {
  cart.forEach(cartItem => {
    if(cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
      saveToStorage();
    }
  });
}

export function removeFromCart(productId) {
  // Mozemo napraviti novi niz i onda u taj novi kopirati sve osim tog kojeg treba izbrisati i efektivno dobijemo brisnje
  let newCart = [];

  cart.forEach(cartItem => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  // Sad samo promijenimo da je nas cart taj novi cart
  cart = newCart;

  saveToStorage();
}

export function getCartQuantity() {
  // Racunanje koliko ukupno imamo u kosarici
  // Prolazimo kroz sve proizvode u kosarici i zbrajamo kolicine
  let cartQuantity = 0;
  cart.forEach(cartItem => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

export function updateCartQuantityElement(quantityElementSelector) {
  // Prikazivanje tog broja u kosarici na vrhu stranice
  document.querySelector(quantityElementSelector).innerHTML = getCartQuantity();
}