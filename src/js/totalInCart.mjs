import { getLocalStorage } from "./utils.mjs";

export function displayCartTotal () {
    window.addEventListener('load', () => {
        const cartItems = getLocalStorage("so-cart");

        if (cartItems.length != 0) {
            let price;
            let total = 0;
 
            cartItems.forEach(item => {
                price = item.ListPrice;
                total += price;
            });

            document.querySelector('.hide').style.display = "inline-block";
            
            let span = document.createElement('span');
            span.textContent = `$${total.toFixed(2)}`;
            document.querySelector('.cart-total').append(span);
        }

    }, false);
}