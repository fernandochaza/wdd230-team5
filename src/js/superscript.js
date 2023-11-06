import { getLocalStorage } from "./utils.mjs";

function cartItemSuperscript() {
  let cartItems = getLocalStorage("so-cart");
  let total = 0;
  let numOfItem;

  if (cartItems && cartItems.length > 0) {
    cartItems.forEach((item) => {
      //Count all the number of items by using the Count key instead of the length of the array
      numOfItem = item.Count;
      total += numOfItem;
    });

    let superscriptContainer = document.createElement("span");
    superscriptContainer.textContent = total;

    let cartDiv = document.getElementById("main-cart");
    cartDiv.append(superscriptContainer);
  }
}

export default cartItemSuperscript;
