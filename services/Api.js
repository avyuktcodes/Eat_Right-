// Api.js

// --- CONSTANTS ---
const BASE_SEARCH_URL = "https://world.openfoodfacts.org/cgi/search.pl";
const BASE_PRODUCT_URL = "https://world.openfoodfacts.org/api/v2/product";

// This function remains private to this file to handle the messy URL building.
function buildSearchUrl({ page = 1, pageSize = 20, searchTerm = "", category = "", sortBy = "" }) {
    const url = new URL(BASE_SEARCH_URL);

    // Standard required parameters
    url.searchParams.set("json", "1");
    url.searchParams.set("page", String(page));
    url.searchParams.set("page_size", String(pageSize));
    url.searchParams.set("search_simple", "1");
    url.searchParams.set("action", "process");

    // 1. Search Functionality
    if (searchTerm) {
        url.searchParams.set("search_terms", searchTerm);
    }

    // 2. Filtering by Category
    if (category) {
        url.searchParams.set("tagtype_0", "categories");
        url.searchParams.set("tag_contains_0", "contains");
        url.searchParams.set("tag_0", category);
    }

    // 3. Sort Functionality
    if (sortBy) {
        url.searchParams.set("sort_by", sortBy);
    }

    return url.toString();
}


// --- EXPORTED API METHODS ---

/**
 * Fetches a list of products based on search, filter, and sort parameters.
 * Used for your main shop/listing page.
 */
export async function fetchProducts(params = {}) {
    try {
        const url = buildSearchUrl(params);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch products. Status: ${response.status}`);
        }

        const data = await response.json();
        return {
            products: data.products || [],
            count: data.count || 0
        };
    } catch (error) {
        console.error("API Error (fetchProducts):", error);
        throw error; // Re-throw so your frontend can show an error message
    }
}

/**
 * Fetches specific details for a single product using its barcode.
 * Used for your Product Detail Page.
 */
export async function fetchProductByBarcode(barcode) {
    try {
        // Combine the base URL and barcode into one string
        const response = await fetch(`${BASE_PRODUCT_URL}/${barcode}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch product details. Status: ${response.status}`);
        }

        const data = await response.json();

        // The API returns status: 0 if the barcode isn't found
        if (data.status === 0 || !data.product) {
            throw new Error("Product not found");
        }

        const p = data.product;

        // Format and return exactly what your frontend needs
        return {
            name: p.product_name || "Unknown Product",
            image: p.image_url || null,
            grade: p.nutrition_grades || "N/A",
            ingredients: p.ingredients_text || "No ingredients listed.",
            category: p.categories || "Uncategorized",
            nutriments: p.nutriments || {} // This object contains all the raw nutrition facts (carbs, fat, etc.)
        };
    } catch (error) {
        console.error("API Error (fetchProductByBarcode):", error);
        throw error;
    }
}