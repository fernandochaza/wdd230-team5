import { getData } from "./productData.mjs";

async function productList(category, selector) {
  const products = await getData();

  function productCardTemplate(product) {
    const productTemplate = `
      <li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
      <img
        src=${product.Image}
        alt=${product.NameWithoutBrand}
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p></a>
      </li>
    `;
    return productTemplate;
  }

  function renderProduct(template) {
    const listContainer = document.querySelector(selector);
    listContainer.innerHTML += template;
  }

  products.forEach((product) => {
    const productTemplate = productCardTemplate(product);
    renderProduct(productTemplate);
  });
}

export default productList;
