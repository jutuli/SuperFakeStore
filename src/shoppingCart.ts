import { Product } from './apiCalls.ts';

// Elemente aus DOM holen
const cartCountElement = document.querySelector('#shopping-cart-count');

export const shoppingCart: Product[] = [];

// Elemente zum Shopping-Cart hinzufügen
export function addToCart(product: Product) {
  if (shoppingCart.includes(product)) return;
  shoppingCart.push(product);
}

// Produktanzahl des Shopping-Carts in DOM anzeigen
export function renderCartCount() {
  const cartCount = shoppingCart.length;
  if (cartCount === 0) return;
  if (cartCountElement) {
    cartCountElement.textContent = `${cartCount}`;
  }
}
