import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { getParam } from "./utils.mjs";
import { doc } from "prettier";
//responsible for all of the functionality needed to lookup data for a specific product and display it in HTML.

// the entrypoint into our module and will make sure that everything happens in the right order. This function should be the default export.
async function productDetails(productId) {
  const product = await findProductById(productId);

  renderProductDetails(product);
}

function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);

  addProductToCart(product);
  const productId = getParam();
  window.location.reload();
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

//fill in the details for the current product in the HTML.
function renderProductDetails(product) {
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
    retailPriceContainer.textContent = `${USDollar.format(retailPrice)}`;
    retailPriceContainer.style.textDecoration = "line-through";
  }

  let price = document.querySelector("#productFinalPrice");
  let color = document.querySelector("#productColorName");
  let prodDetails = document.querySelector("#productDescriptionHtmlSimple");
  let prodId = document.querySelector("#addToCart");

  title.textContent = product.Name;
  h2.textContent = product.NameWithoutBrand;
  img.setAttribute("src", product.Images.PrimaryLarge);
  img.setAttribute("alt", product.Name);
  price.textContent = `${USDollar.format(product.FinalPrice)}`;
  color.textContent = product.Colors[0].ColorName;
  prodDetails.innerHTML = product.DescriptionHtmlSimple;
  prodId.setAttribute("data-id", product.Id);
}

export default productDetails;
