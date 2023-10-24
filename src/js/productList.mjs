import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

export default async function productList(category, selector) {
  const title = document.querySelector(selector);
  const products = await getData(category);

  renderListWithTemplate(productCardTemplate, title, products);
  document.querySelector(".category-title").innerHTML = `: ${
    category.charAt(0).toUpperCase() + category.slice(1)
  }`;

  function productCardTemplate(product) {
    const productTemplate = `
      <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
      <img
        src=${product.Images.PrimaryMedium}
        alt=${product.NameWithoutBrand}
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p></a>
      </li>
    `;
    return productTemplate;
  }
}
