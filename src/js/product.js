import productDetails from "./productDetail.mjs";
import cartItemSuperscript from "./superscript";
import { getParam, loadHeaderFooter } from "./utils.mjs";

const productId = getParam("product");
productDetails(productId);

async function main() {
  await loadHeaderFooter();
  cartItemSuperscript();
}

main();
