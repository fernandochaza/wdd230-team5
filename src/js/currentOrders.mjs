import { getLocalStorage } from "./utils.mjs";
import { getOrder } from "./externalServices.mjs";

export async function orderDisplay() {
    const token = getLocalStorage('so-token');
    const orders = await getOrder(token.accessToken);

    const orderContainer = document.querySelector('.orders-list');
    orderContainer.innerHTML = orders.map(item => displayOrder(item)).join("");
    
}
    

function displayOrder(item) {
    const customer = `<li class="customer-container>
            <p>${item.fname}</p>
            <p>${item.lname}</p>
            <p>${item.orderDate}</p>
            <p><span>${item.street}</span><span>${item.city}</span><span> ${item.state}</span><span> ${item.zip}</<span></p>
            <p>${item.shipping}</p>
            <p>${item.tax}</p>
            <p>${item.orderTotal}</p>
    </li>`;

    return customer;
}
