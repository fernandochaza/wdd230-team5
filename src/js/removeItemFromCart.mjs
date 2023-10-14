import { getLocalStorage, setLocalStorage } from "./utils.mjs";


export function removeCartItem() {
  // Selecting all the x-buttons with the same class but different ids
  let cartCards = document.querySelectorAll('.x-button');

    // Looping through the x buttons and adding event listener on each
    cartCards.forEach((cartCard) => {
        cartCard.addEventListener('click', () => {
        
            // Getting the id of the x button that got clicked
            let productId = cartCard.getAttribute('id');
            let cartItems = getLocalStorage("so-cart");

            // Looping through the so cart array to find the matching ids and getting the index
            // If the ids match, get the index and remove the data with that index
            cartItems.forEach((item, index) => {
                if (item.Id === productId) {
                    cartItems.splice(index, 1);
                    setLocalStorage("so-cart", cartItems);
                    window.location.reload();
                }   
            });
        });
        
    });
}