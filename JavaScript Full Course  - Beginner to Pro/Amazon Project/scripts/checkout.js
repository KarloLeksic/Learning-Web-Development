// Ponovno idemo generirati HTML

// Treba nam nasa kosarica i produkti
import { cart, removeFromCart, addToCart, updateCartQuantityElement, updateQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrecny } from './utils/money.js';

updateCartQuantityElement('.cart-quantity');

let cartSummaryHTML = '';

// Opet idemo kroz kosaricu i generiramo elemente
cart.forEach(cartItem => {
  // Trebamo pretraziti produkte prema ID-u da bi dobili informacije o njemu da ih mozemo poslje ispisati
  const productId = cartItem.productId;

  // Trazenje proizvoda koji se poklapa po ID-u
  let matchingProduct;
  products.forEach(product => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  // Sada mozemo pristupiti slici, cijeni, itd

  // Generiranje HTML-a po proizvodu koji se poklapa
  cartSummaryHTML +=
    `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrecny(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
              Update
            </span>

            <input class="quantity-input" type="number">
            <span class="save-quantity-link js-save-quantity-link link-primary"
            data-product-id="${matchingProduct.id}">Save</span>

            <span class="delete-quantity-link js-delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

// Dodavanje tih generiranih elemenata na stranicu
document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

// Brisanje proizvoda iz kartice
// Listeneri na gumb delete
document.querySelectorAll('.js-delete-quantity-link')
  // Na svaki!
  .forEach(link => {
    link.addEventListener('click', () => {
      // Brisanje iz kosarice
      const productId = link.dataset.productId;
      removeFromCart(productId);

      // Brisanje vizualno sa stranice
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`);

      container.remove();

      updateCartQuantityElement('.cart-quantity');
    })
  });

// Promjena kolicine u kosarici klikom na gumb update
document.querySelectorAll('.js-update-quantity-link')
  // Za svaki Update gumb
  .forEach(link => {
    // Dodajemo listener na click
    link.addEventListener('click', () => {
      // Dohvacamo ID proizvoda - imamo atribut sa ID-jem
      const productId = link.dataset.productId;

      // Mice se gumb update i pojavljuje se save i polje za unos kolicine
      // Dodajemo klasu da se ureduje kolicina
      // Dohavtimo taj container u kojem se uređuje količina
      const itemContainer = link.closest('.cart-item-container');

      // Dodajemo klasu za uređivanje
      itemContainer.classList.add('is-editing-quantity');

      // Dajemo u fokus odma input element da mozemo klikati odma sa tastaturom bez klik misa na taj element
      const inputElement = itemContainer.querySelector('.quantity-input');
      inputElement.focus();
    });
  });

// Sada obrnuto za kad se stisne save gumb da se makne input i da se prikaze update i nova kolicina
document.querySelectorAll('.js-save-quantity-link')
  .forEach(link => {
    link.addEventListener('click', () => {
      // Dohvacanje kolicine iz inputa
      const itemContainer = link.closest('.cart-item-container');
      const newQuantityInputElement = itemContainer.querySelector('.quantity-input');

      // Azuziranje broja na stranici
      // Provjera da neko ne unese 0 ili manje, sto nema smisla
      const newQuantity = parseInt(newQuantityInputElement.value);
      if(newQuantity > 0) {
        itemContainer.querySelector('.quantity-label').innerHTML = newQuantity;

        // Upisivanje u kosaricu ako je ispravan unos
        // Za to nam treba jos i ID proizvoda
        updateQuantity(link.dataset.productId, newQuantity);

        updateCartQuantityElement('.cart-quantity');
      }
      
      // Resetiranje na prazni input ako se opet klikne
      newQuantityInputElement.value = '';

      // Micanje klase da se trenutno uređuje što sakriva save gumb i input
      itemContainer.classList.remove('is-editing-quantity');
    });
  });