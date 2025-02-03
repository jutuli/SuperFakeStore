import { allProducts } from './apiCalls.ts';
import { Product } from './types.ts';

export function sortByPriceAsc(): Product[] {
  // falls es all Products nicht gibt, dann empty Array zurückgeben
  if (!allProducts) return [];
  const sortedProducts = [...allProducts].sort(
    (productA: Product, productB: Product): number => {
      return productA.price - productB.price;
    }
  );
  return sortedProducts;
}

export function sortByRatingAsc(): Product[] {
  // falls es all Products nicht gibt, dann empty Array zurückgeben
  if (!allProducts) return [];
  const sortedProducts = [...allProducts].sort(
    (productA: Product, productB: Product): number => {
      return productA.rating.rate - productB.rating.rate;
    }
  );
  return sortedProducts;
}
