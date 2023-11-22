import cartItemSuperscript from "./superscript.js";
import { loadHeaderFooter } from "./utils.mjs";
import { subscribe } from "./newslettersignup.js";

main();

async function main() {
  await loadHeaderFooter();
  cartItemSuperscript();
}
document.querySelector("#subscribe-btn").addEventListener("click", subscribe);
