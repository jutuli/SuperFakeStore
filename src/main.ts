import { allProducts, Product } from './apiCalls.ts';
import { renderCategories } from './categories.ts';
import { renderProductCards } from './productCards.ts';
import { filterByCategory, searchProducts } from './productFiltering.ts';
import { sortByPriceAsc, sortByRatingAsc } from './productSorting.ts';
import { addToCart, renderCartCount } from './shoppingCart.ts';

// Elemente aus DOM holen für Interaktion mit der Seite
const searchInput = document.querySelector<HTMLInputElement>('#search-product');
const categoriesContainer = document.querySelector('#category-list');
const sortSelect = document.querySelector<HTMLSelectElement>('#sort-product');
const productsContainer = document.querySelector('#products-container');

// Seite initial mit allen Produkten laden
if (allProducts && allProducts.length > 0) {
  renderProductCards(allProducts);
  renderCategories();
}

// Event Listeners für die Suche nach Produktnamen
searchInput?.addEventListener('input', () => {
  const searchInputValue = searchInput?.value || '';
  const filteredProducts = searchProducts(searchInputValue);
  if (filteredProducts) {
    renderProductCards(filteredProducts);
  }
});

// Eventlistener für das Filtern nach Kategorie
// Da Elemente erst später gerendert werden, wird der Eventlistener auf den Container gesetzt
categoriesContainer?.addEventListener('click', (event) => {
  // mit target wird das Element geholt, auf das geklickt wurde (wir wollen nur auf die Buttons reagieren)
  const button = <HTMLButtonElement>event.target;
  // Wenn das Button-Element eine Klasse filter-btn hat, wird die Funktion filterByCategory aufgerufen
  if (button.className.includes('filter-btn')) {
    const filteredProducts = filterByCategory(button.id);
    if (filteredProducts) {
      renderProductCards(filteredProducts);
    }
  }
});

// Eventlistener für das Sortieren nach Preis/Rating
sortSelect?.addEventListener('change', () => {
  let sortedProducts: Product[] = [];
  if (!sortedProducts) return;
  switch (sortSelect.value) {
    case 'price-asc':
      sortedProducts = sortByPriceAsc();
      renderProductCards(sortedProducts);
      break;
    case 'price-desc':
      sortedProducts = sortByPriceAsc().reverse();
      renderProductCards(sortedProducts);
      break;
    case 'rating-asc':
      sortedProducts = sortByRatingAsc();
      renderProductCards(sortedProducts);
      break;
    case 'rating-desc':
      sortedProducts = sortByRatingAsc().reverse();
      renderProductCards(sortedProducts);
      break;
  }
});

// Eventlistener für das Hinzufügen von Produkten zum Warenkorb
productsContainer?.addEventListener('click', (event) => {
  const button = <HTMLButtonElement>event.target;
  // Wenn das Button-Element eine Klasse filter-btn hat, wird die Funktion filterByCategory aufgerufen
  if (button.className.includes('add-to-cart-btn')) {
    // ProductCard holen, um die ID des Produkts zu bekommen
    const productCard = button.closest('li');
    if (productCard && allProducts) {
      // Alle Produkte nach der ProductCard-Id durchsuchen, um das Produkt dann dem Shopping-Cart hinzuzufügen
      const selectedProduct = allProducts.find(
        (product: Product) => product.id.toString() === productCard.id
      );
      if (selectedProduct) {
        addToCart(selectedProduct);
        renderCartCount();
      }
      button.textContent = 'Added to Cart';
      button.classList.remove('bg-green-900', 'text-slate-100');
      button.classList.add('bg-white', 'text-green-900');
    }
  }
});
