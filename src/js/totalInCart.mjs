import { getLocalStorage } from "./utils.mjs";

export function displayCartTotal () {
    window.addEventListener('load', () => {
        const cartItems = getLocalStorage("so-cart");

        if (cartItems.length != 0) {
            let subtotal;
            let total = 0;
 
            cartItems.forEach(item => {
                subtotal = item.ListPrice * item.Count;
                total += subtotal;
            });

            const cartFooter = document.querySelector('#cart-footer');
            cartFooter.classList.replace('hide', 'show');
            
            let span = document.createElement('span');
            span.textContent = `$${total.toFixed(2)}`;
            document.querySelector('.cart-total').append(span);
        }

    }, false);
}