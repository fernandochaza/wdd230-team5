import productList from "./productList.mjs";
import { getParam } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import cartItemSuperscript from "./superscript";

main();
async function main() {
  await loadHeaderFooter();
  cartItemSuperscript();
}

const category = getParam("category");
productList(category, ".product-list");
