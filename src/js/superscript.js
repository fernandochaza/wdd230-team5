import { getLocalStorage } from "./utils.mjs";

function cartItemSuperscript() {
  let cartItems = getLocalStorage("so-cart");

  if (cartItems.length > 0) {
    let superscriptContainer = document.createElement("span");
    document.querySelector(".cart").append(superscriptContainer);
    superscriptContainer.textContent = cartItems.length;
  }
}

export default cartItemSuperscript;
