import { loginRequest } from "./externalServices.mjs";
import { setLocalStorage } from "./utils.mjs";

import { jwtDecode } from "jwt-decode";

const tokenKey = "so-token";
async function login(cred, redirect) {
  const token = await loginRequest(cred);

  setLocalStorage(tokenKey, token);
  
  checkLogin(token);

  // window.location = redirect;
}

function isTokenValid() {}

function checkLogin(token) {
  if (!token) return false;
  const date = new Date();

  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
}

export { login, isTokenValid, checkLogin };
