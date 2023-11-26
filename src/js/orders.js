import cartItemSuperscript from "./superscript";
import { loadHeaderFooter } from "./utils.mjs";
import { orderDisplay } from "./currentOrders.mjs";

main();
async function main() {
  await loadHeaderFooter();
  cartItemSuperscript();
}

orderDisplay();
