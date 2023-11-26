import { loadHeaderFooter } from "./utils.mjs";
import cartItemSuperscript from "./superscript";
import { getParam } from "./utils.mjs";
import { login } from "./auth.mjs";
import { checkLogin } from "./auth.mjs";
import { check } from "prettier";

await loadHeaderFooter();
cartItemSuperscript();

// const redirect = getParam("redirect");

let loginBtn = document.querySelector('#loginBtn');
let creds;

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    creds = {email, password};
    login(creds);
})

