import { getLocalStorage } from "./utils.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;

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
    ).textContent = this.itemTotal;

    let itemsNumber = this.list.length;
    document.querySelector(this.outputSelector + " #items-number").textContent =
      itemsNumber;
  },

  calculateOrderTotal() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.tax = this.itemTotal * 0.06;
    document.querySelector(this.outputSelector + " #tax-amount").textContent =
      this.tax;

    let additional = 0;
    if (this.list.length > 1) {
      additional = (this.list.length - 1) * 2;
    }

    this.shipping = 10 + additional;
    document.querySelector(
      this.outputSelector + " #shipping-estimate"
    ).textContent = this.shipping;

    this.orderTotal = this.itemTotal + this.shipping + this.tax;

    // display the totals.
    this.displayOrderTotals();
  },

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    document.querySelector(this.outputSelector + " #total-amount").textContent =
      this.orderTotal;
  },

  prepareData(form) {
    const formData = new FormData(form);

    const {
      fname,
      lname,
      street,
      city,
      state,
      zip,
      cardNumber,
      expiration,
      code,
    } = Object.fromEntries(formData.entries());

    const data = {
      orderDate: new Date().toISOString(),
      fname,
      lname,
      street,
      city,
      state,
      zip,
      cardNumber,
      expiration,
      code,
      items: packageItems(this.list),
      orderTotal: this.orderTotal,
      shipping: this.shipping,
      tax: this.tax.toString(),
    };

    return data;
  },

  checkout: async (data) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(baseURL + "checkout", options);
    const order = await response.json();
  },
};

export default checkoutProcess;
