import ky from 'ky';
import { z } from 'zod';

const ProductSchema = z.object({
  id: z.number(),
  category: z.string(),
  image: z.string(),
  price: z.number(),
  rating: z.object({
    count: z.number(),
    rate: z.number(),
  }),
  title: z.string(),
});

// type Product wird aus dem ProductSchema abgeleitet
export type Product = z.infer<typeof ProductSchema>;

//- PRODUCTS API CALLS
// Alle Produkte von der API holen
async function getProducts() {
  try {
    const productData = await ky
      .get('https://fakestoreapi.com/products')
      .json();
    const parsedProductData = ProductSchema.array().parse(productData);
    return parsedProductData;
  } catch (error) {
    console.log('There has been an error: ', error);
  }
}

// getProducts() ausführen und in Array speichern
export const allProducts = await getProducts();

//- CATEGORIES API CALLS
// Alle Kategorien von der API holen
async function getCategories() {
  try {
    const categoryData: string[] = await ky
      .get('https://fakestoreapi.com/products/categories')
      .json();
    return categoryData;
  } catch (error) {
    console.log('There has been an error: ', error);
  }
}

// getCategories() ausführen und in Array speichern
export const allCategories = await getCategories();
