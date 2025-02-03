import { allCategories } from "./apiCalls.ts";

// DOM-Elemente holen
const categoriesContainer = document.querySelector("#category-list");

// jede Kategorie soll den Anfangsbuchstaben von jedem Wort großgeschrieben haben
const capitalizedCategories = allCategories?.map((category) =>
  category
    // Category unterteilen in einzelne Wörter, erstes Zeichen großschreiben und wieder zusammenfügen
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "),
);

// Kategorien in DOM schreiben
export async function renderCategories() {
  if (!capitalizedCategories || !categoriesContainer) return;
  capitalizedCategories.forEach((category) => {
    categoriesContainer.innerHTML += `
    <li class="flex-1">
        <button id="${category.toLowerCase()}"
            class="filter-btn cursor-pointer w-full rounded-md border border-white bg-transparent px-10 py-2 font-semibold hover:bg-white hover:text-cyan-900"
            >
              ${category}
            </button>
          </li>
    `;
  });
}
