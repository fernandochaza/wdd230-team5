import checkoutProcess from "./checkoutProcess.mjs";
import cartItemSuperscript from "./superscript";
import { loadHeaderFooter } from "./utils.mjs";

async function main() {
  await loadHeaderFooter();
  cartItemSuperscript();
}

checkoutProcess.init("so-cart", ".order-summary");
checkoutProcess.calculateOrderTotal();

const form = document.querySelector("#order-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = checkoutProcess.prepareData(e.target);
  await checkoutProcess.checkout(data);
});

main();
