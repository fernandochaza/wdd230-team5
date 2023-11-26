const baseURL = import.meta.env.VITE_SERVER_URL;
const loginURL = import.meta.env.LOGIN_SERVER_URL;

export async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: 'servicesError', message: data };
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

export async function loginRequest(creds) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  }

  const res = await fetch(baseURL + 'login', options).then(convertToJson);
  return res;
}

export async function getOrder(token) {
  let options = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`
    },
  }
  const res = await fetch(baseURL + 'orders', options).then(convertToJson);
  return res;
}