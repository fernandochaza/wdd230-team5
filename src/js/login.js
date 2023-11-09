import { isTokenValid, login } from "./auth.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const redirect = getParam("redirect");

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.target;

  const email = form.elements.username.value;
  const password = form.elements.password.value;

  const token = await login({ email, password }, redirect);
});
