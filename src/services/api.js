export async function getCategories() {
  // Implemente aqui
  const fetchCategories = await fetch('https://api.mercadolibre.com/sites/MLB/categories').then((response) => response.json());
  return fetchCategories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const fetchByCategoryAndQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`).then((data) => data.json());
  return fetchByCategoryAndQuery;
}

export async function getProductsFromQuery(query) {
  const fetchByQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`).then((data) => data.json());
  return fetchByQuery;
}

export async function getProductsFromCategory(CATEGORY_ID) {
  const fetchByCategory = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}`).then((data) => data.json());
  return fetchByCategory;
}

export async function getProductById(productId) {
  const fetchById = await fetch(`https://api.mercadolibre.com/items/${productId}`).then((data) => data.json());
  return fetchById;
}
