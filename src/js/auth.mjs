import { loginRequest } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import {jwtDecode} from "jwt-decode";

const tokenKey = 'so-token';

function isTokenValid(token) {
    //Check if the user is already logged in
    if (token) {
        let decode = jwtDecode(token);
        let currDate = new Date();
        
        if (decode.exp * 1000 < currDate.getTime()) {
            console.log('Token Expired');
            return false;
        } else {
            console.log('Valid Token');
            return true;
        }
    } else return false;

}

export function checkLogin() {
    let token = getLocalStorage('so-token');
    let valid = isTokenValid(token.accessToken);
    
    if (!valid) {
        localStorage.removeItem('so-token');
        let path = window.location;
        window.location = `/login/index.html?redirect=${path.pathname}`;

    } else return token;
}

export async function login(creds, redirect = '/orders/index.html') {
    //Responsible for sending the credentials to the authentication server
    try {
        const token = await loginRequest(creds);
        setLocalStorage(tokenKey, token);
        checkLogin();
        window.location = redirect;
    } catch (err) {
        console.log(err);
    }
    
}