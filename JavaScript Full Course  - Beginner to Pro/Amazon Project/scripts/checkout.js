// Ponovno idemo generirati HTML

// Treba nam nasa kosarica i produkti
import { cart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrecny } from './utils/money.js';

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
    <div class="cart-item-container">
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
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary">
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
