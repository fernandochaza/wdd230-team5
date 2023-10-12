import renderCartContents from "./shoppingCart.mjs";
import cartItemSuperscript from "./superscript";
import { loadHeaderFooter } from "./utils.mjs";

renderCartContents();

async function main() {
  await loadHeaderFooter();
  cartItemSuperscript();
}

main();

