import { allProducts } from './apiCalls.ts';

allProducts;

// Suchfunktion um den Titel der Produkte zu durchsuchen
export function searchProducts(input: string) {
  if (!allProducts) return;
  input = input.toLowerCase();
  const matchingProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(input)
  );
  return matchingProducts;
}

// Filterfunktion um Produkte nach Kategorie zu filtern
export function filterByCategory(category: string) {
  if (!allProducts) return;
  const matchingProducts = allProducts.filter(
    (product) => product.category === category
  );
  return matchingProducts;
}
