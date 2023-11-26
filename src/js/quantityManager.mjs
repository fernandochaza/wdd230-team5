import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export function manageQuantity() {
    let qtyDiv = document.querySelectorAll('.cart-card__quantity');

    qtyDiv.forEach(element => element.addEventListener('click', (e) => {
        let id = element.getAttribute('id');
        let cartItems = getLocalStorage('so-cart');

        //find the item from the so-cart array using the id
        cartItems.forEach((i, index) => {
            let cartItemId = i.Id;
            if (id === cartItemId) {
                //If the id is found, get the whole object which is the i
                console.log(i);

                //Determine whether it's the increment or decrement btn that's triggering the event
                let qtyBtn = e.target.innerHTML;

                console.log('old count ' + i.Count);

                //If the increment btn is triggered
                if (qtyBtn === 'add') {
                    //Add one to count else, deduct one
                    i.Count++;
                    console.log('new count ' + i.Count);
                    
                } else if (qtyBtn === 'remove') {
                    i.Count--;
                    console.log('new count ' + i.Count);
                    //If the Count is 0, remove it from the array
                    if (i.Count === 0) cartItems.splice(index, 1);
                }
                
            }
        });
        setLocalStorage('so-cart', cartItems);
        window.location.reload();
        
    }))

    console.log(getLocalStorage('so-cart'));
    
    
}


