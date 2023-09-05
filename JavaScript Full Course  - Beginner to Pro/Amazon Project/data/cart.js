// Prazna kosarica na pocetku
export const cart = [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 7
},
{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 21
}];

export function addToCart(productId) {
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
    matchingItem.quantity++;
  } else {
    // Ako on nije u kosarici onda dodati novog
    cart.push({
      productId: productId,
      // Treba se dodati da cupa koliko je odabrano
      // Dodavanje vrijednosti svakom select elementu da se zna iz kojeg cupati vrijednost
      quantity: 1
    });
  }
}
