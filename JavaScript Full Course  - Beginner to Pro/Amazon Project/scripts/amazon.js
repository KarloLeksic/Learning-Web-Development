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
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select>
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

// Gore u buttonu vidimo atribut data-product-id
// Njegova je svrha dodati bilo koji atribut html elementu
// Samo je bitno da pocinje sa data-

// Stavljanje prethodno generiranog HTML-a na stranicu koristeci DOM
document.querySelector('.js-products-grid').innerHTML = productsHTML;

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

      // Provjera jel on vec u kosarici, ako je povecanje kolicine, ako nije dodavanje
      let matchingItem;

      cart.forEach(item => {
        if (productId === item.productId) {
          // Vec je on u kosarici
          matchingItem = item;
        }
      });

      if (matchingItem) {
        matchingItem.quantity++;
      } else {
        cart.push({
          productId: productId,
          quantity: 1
        });
      }

      console.log(cart);
    });
  });