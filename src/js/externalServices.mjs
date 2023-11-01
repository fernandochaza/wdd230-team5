const baseURL = import.meta.env.VITE_SERVER_URL;

export async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw { name: 'servicesError', message: res.json().body };
  }
}

export async function getProductsByCategory(category) {
  const URL = baseURL + `products/search/${category}`;
  const response = await fetch(URL);
  const data = await convertToJson(response);

  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);

  return product.Result;
}
