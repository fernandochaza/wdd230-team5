import { getLocalStorage } from "./utils.mjs";

function cartItemSuperscript() {
  let cartItems = getLocalStorage("so-cart");

  if (cartItems && cartItems.length > 0) {
    let superscriptContainer = document.createElement("span");
    superscriptContainer.textContent = cartItems.length;

    let cartDiv = document.getElementById("main-cart");
    cartDiv.append(superscriptContainer);
  }
}

export default cartItemSuperscript;
