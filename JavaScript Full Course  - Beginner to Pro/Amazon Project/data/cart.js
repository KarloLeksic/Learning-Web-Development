// Prazna kosarica na pocetku
export const cart = [];

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
}
