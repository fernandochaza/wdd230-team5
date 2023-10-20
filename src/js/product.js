import productDetails from "./productDetail.mjs";
import cartItemSuperscript from "./superscript";
import { getParam, loadHeaderFooter } from "./utils.mjs";

main();

async function main() {
  await loadHeaderFooter();
  cartItemSuperscript();
}

const productId = getParam("product");
productDetails(productId);
