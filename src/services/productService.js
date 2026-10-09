const API_URL = "https://dummyjson.com/products";

// READ
export async function getProducts() {
  const response = await fetch(`${API_URL}?limit=10`);

  if (!response.ok) {
    throw new Error("Nu s-au putut încărca produsele");
  }

  const data = await response.json();
  return data.products;
}

// CREATE
export async function createProduct(product) {
  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Nu s-a putut crea produsul");
  }

  return response.json();
}

// UPDATE
export async function updateProduct(id, product) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Nu s-a putut actualiza produsul");
  }

  return response.json();
}

// DELETE
export async function deleteProduct(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Nu s-a putut șterge produsul");
  }

  return response.json();
}