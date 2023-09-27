import productDetails from "./productDetails.mjs";
import { getParam } from "./utils.mjs";

const productId = getParam("product");
productDetails(productId);

// This should add products to cart
// function addProductToCart(product) {

//   const cartItems = getLocalStorage("so-cart") || [];
//   cartItems.push(product);

//   setLocalStorage("so-cart", cartItems);

// }
// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await findProductById(e.target.dataset.id);
//   addProductToCart(product);
//   const productId = getParam();
//   //console.log(productId);
//   //console.log(findProductById(productId));
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
