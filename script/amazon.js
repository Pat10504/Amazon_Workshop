
let productHTML = '';
products.forEach( productlist => {
    productHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${productlist.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${productlist.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${(productlist.rating.stars * 10)}.png">
            <div class="product-rating-count link-primary">
              ${productlist.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(productlist.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class = "js-quantity-selector-${productlist.id}">
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

          <button class="add-to-cart-button button-primary js-add-to-cart" 
          data-product-id="${productlist.id}">
            Add to Cart
          </button>
        </div>
    `
});
document.querySelector('.js-product').innerHTML = productHTML;
document.querySelectorAll('.js-add-to-cart')
.forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        const getSelectQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

        let matching;
        cart.forEach((item) => {
            if(productId === item.productId){
                matching = item;
            }
        });
        if(matching){
          matching.quantity += getSelectQuantity;
        }else{
          cart.push({
            productId: productId,
            quantity: getSelectQuantity 
          });
        }
        let productQuantity = 0;
        cart.forEach((item) => {
          productQuantity += item.quantity
        });

        document.querySelector('.js-cart-quantity')
          .innerHTML = productQuantity;
    });
});