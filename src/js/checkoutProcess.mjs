import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";
import { convertToJson } from "./externalServices.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

//Moved this function up here. This seems to work better than when it's inside PrepareData function
async function checkout (data) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  await fetch(baseURL + "checkout/", options).then(convertToJson);
}


function packageItems(items) {
  const packagedItems = items.map((item) => ({
    id: item.Id,
    price: item.FinalPrice,
    name: item.Name,
    quantity: 1,
  }));
  return packagedItems;
}

const checkoutProcess = {
  key: "",
  outputSelector: "",
  list: [],
  itemTotal: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,

  init(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(key);
    this.calculateItemSummary();
  },

  calculateItemSummary() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    this.itemTotal = this.list.reduce(
      (total, item) => total + item.FinalPrice,
      0
    );

    document.querySelector(
      this.outputSelector + " #items-subtotal"
    ).textContent = `$${this.itemTotal.toFixed(2)}`;

    let itemsNumber = this.list.length;
    document.querySelector(this.outputSelector + " #items-number").textContent =
      itemsNumber;
  },

  calculateOrderTotal() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.tax = this.itemTotal * 0.06;
    document.querySelector(this.outputSelector + " #tax-amount").textContent =
      `$${this.tax.toFixed(2)}`;

    let additional = 0;
    if (this.list.length > 1) {
      additional = (this.list.length - 1) * 2;
    }

    this.shipping = 10 + additional;
    document.querySelector(
      this.outputSelector + " #shipping-estimate"
    ).textContent = `$${this.shipping.toFixed(2)}`;

    this.orderTotal = this.itemTotal + this.shipping + this.tax;

    // display the totals.
    this.displayOrderTotals();
  },

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    document.querySelector(this.outputSelector + " #total-amount").textContent =
      `$${this.orderTotal.toFixed(2)}`;
  },

  prepareData: async function (form) {
    const json = formDataToJSON(form);
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax.toString();
    json.shipping = this.shipping;
    json.items = packageItems(this.list);

//Removed some things here because it duplicates with the json variable data
    try {
      await checkout(json);
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");
    } catch (err) {
      for (let mess in err.message) {
        alertMessage(err.message[mess]);
      }  
    }
  }
};

export default checkoutProcess;
