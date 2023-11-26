import { loadHeaderFooter } from "./utils.mjs";
import cartItemSuperscript from "./superscript";
import { login } from "./auth.mjs";

main();
async function main() {
  await loadHeaderFooter();
  cartItemSuperscript();
}

// const redirect = getParam("redirect");

let loginBtn = document.querySelector("#loginBtn");
let creds;

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  creds = { email, password };
  login(creds);
});
