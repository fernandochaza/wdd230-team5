import cartItemSuperscript from "./superscript.js";
import { loadHeaderFooter } from "./utils.mjs";

main();

async function main() {
  await loadHeaderFooter();
  cartItemSuperscript();
}
