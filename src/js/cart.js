import renderCartContents from "./shoppingCart.mjs";
import cartItemSuperscript from "./superscript";
import { loadHeaderFooter } from "./utils.mjs";
import { removeCartItem } from "./removeItemFromCart.mjs";
import { displayCartTotal } from "./totalInCart.mjs";

main();
async function main() {
  await loadHeaderFooter();
  cartItemSuperscript();
}

renderCartContents();
removeCartItem();
displayCartTotal();
