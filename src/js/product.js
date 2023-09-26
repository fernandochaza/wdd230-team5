import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

// This should add products to cart
function addProductToCart(product) {
  
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);

  setLocalStorage("so-cart", cartItems);

}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
