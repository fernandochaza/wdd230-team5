import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
 
  // Check if cartItems is defined and that the cart contains items
  // before displaying them
  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item, item.Id));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  }
}

function cartItemTemplate(item, id) {
  const newItem = `
  <li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div class="cart-card__quantity" id="${id}"><span>qty:</span>
  <span class="material-symbols-outlined dec">remove</span>
  <input value="${item.Count}" class="input-qty">
  <span class="material-symbols-outlined inc">add</span></div>
  <p class="cart-card__price">$${(item.FinalPrice * item.Count).toFixed(2)}</p>
  
</li>
<span class="x-button" id="${id}">X</span>
`;

  return newItem;
}

export default renderCartContents;
