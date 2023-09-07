// Dobivanje varijable izvan datoteke (iz modula):
// 1. Dodavanje tipa modula - u amazon.html-u na dnu
// 2. Export - u cart.js
// 3. input - tamo gdje je zelimo koristiti
import { cart, addToCart, getCartQuantity, updateCartQuantityElement } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrecny } from './utils/money.js';
// Vazno za module:
// Moramo importe napraviti na pocetku 
// Moramo koristiti Live Server da bi moduli radili

// Benefiti modula:
// 1. Izbjegavamo konflikte u nazivima varijabla, jedino kad importamo onda se moze dogoditi, ali nemoramo importati kad nemoramo
// Mozemo i promijeniti naziv varijable tako da importamo na ovakav nacin
// import {cart as myCart} from '../data/cart.js';
// 2. Ne moramo brinuti o redosljedu ucitavanja skripti (kraj amazon.html-a)


// Idemo citati podatke bolje nego da ih hardcodeamo u HTML-u

// Za kombiniranje pojedinacnih produkata u jedan
let productsHTML = '';

// Generiranje html-a za svaki produkt bolje nego hardcodanje
products.forEach(product => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrecny(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select class="select-quantity-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button js-add-to-cart-button button-primary"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

updateCartQuantityElement('.js-cart-quantity');

// Gore u buttonu vidimo atribut data-product-id
// Njegova je svrha dodati bilo koji atribut html elementu
// Samo je bitno da pocinje sa data-

// Stavljanje prethodno generiranog HTML-a na stranicu koristeci DOM
document.querySelector('.js-products-grid').innerHTML = productsHTML;

updateCartQuantityElement('.js-cart-quantity');

// Dodavenje funkcionalnosti na add to cart button
document.querySelectorAll('.js-add-to-cart-button')
  // Idemo kroz svaki button
  .forEach(button => {
    // I dodavamo listenere
    button.addEventListener('click', () => {
      // Dodavanje u cart
      // Cart nam je kao lista gdje imamo proizvode i koliko ih ima
      // Dataset nam daje sve te atribute koje smo dodali kao data-
      // Ponasa se kao objekt - znaci da ga mozemo pretrazivati sa .
      // console.log(button.dataset.productID); // productID smo vidli tako da ispisemo objekt koji nam vraca kad kliknemo na button
      const productId = button.dataset.productId;

      // Dohvacanje selektora koji sadrzi kolicinu
      const selectQuantityElement = document.querySelector(`.select-quantity-${productId}`);
       
      // Pretvaranje kolicine u int
      const quantity = parseInt(selectQuantityElement.value);

      // Dodavanje u kosaricu i azuriranje broja u kosarici na vrhu stranice
      addToCart(productId, quantity);
      updateCartQuantityElement('.js-cart-quantity');
    });
  });

