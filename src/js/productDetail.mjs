import {
  getLocalStorage,
  setLocalStorage,
} from "./utils.mjs";
import { findProductById } from "./externalServices.mjs";
import { resolveDuplicate } from "./resolveDuplicateItemsInCart.mjs";

//responsible for all of the functionality needed to lookup data for a specific product and display it in HTML.
// the entrypoint into our module and will make sure that everything happens in the right order. This function should be the default export.
async function productDetails(productId) {
  const product = await findProductById(productId);
  renderProductDetails(product);
}

function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];

  //Push the cart items to the so-cart list first
  cartItems.push(product);

  //Then merge the duplicates into unique items and count the number of duplicates
  const uniqueList = resolveDuplicate(cartItems);

  //Once all the items are unique, store it in local storage
  setLocalStorage("so-cart", uniqueList);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
  window.location.reload();
}

// Add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

// Fill in the details for the current product in the HTML.
function renderProductDetails(product) {

  // Create a new instance of Intl.NumberFormat to format the price of the product.
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const retailPrice = product.SuggestedRetailPrice;
  const finalPrice = product.FinalPrice;

  let title = document.querySelector("#productName");
  let h2 = document.querySelector("#productNameWithoutBrand");
  let img = document.querySelector("#productImage");

  if (finalPrice < retailPrice) {
    const retailPriceContainer = document.querySelector("#productPrice");

    // Use the format method to format the retail price and add it to the DOM.
    retailPriceContainer.textContent = `${USDollar.format(retailPrice)}`;

    retailPriceContainer.classList.add("product-price--discounted");
  }

  let price = document.querySelector("#productFinalPrice");
  let color = document.querySelector("#productColorName");
  let prodDetails = document.querySelector("#productDescriptionHtmlSimple");
  let prodId = document.querySelector("#addToCart");

  title.textContent = product.Brand.Name;
  h2.textContent = product.NameWithoutBrand;
  img.setAttribute("src", product.Images.PrimaryLarge);
  img.setAttribute("alt", product.Name);
  price.textContent = `${USDollar.format(product.FinalPrice)}`;
  color.textContent = product.Colors[0].ColorName;
  prodDetails.innerHTML = product.DescriptionHtmlSimple;
  prodId.setAttribute("data-id", product.Id);
}

export default productDetails;
