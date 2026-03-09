import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import Card from './Card.jsx';
import { fetchProducts } from '../services/Api';

const Homepage = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);

    const loadProducts = async (isLoadMore = false) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchProducts({
                page: isLoadMore ? page + 1 : 1,
                pageSize: 20,
                searchTerm,
                category,
                sortBy
            });

            if (isLoadMore) {
                setProducts(prev => [...prev, ...data.products]);
                setPage(prev => prev + 1);
            } else {
                setProducts(data.products);
                setPage(1);
            }

            // Simple heuristic to check if more products exist4
            setHasMore(data.products.length === 20);

        } catch (err) {
            console.error("LOAD PRODUCTS ERROR:", err);
            let errorMessage = err.message || "Failed to fetch products";
            if (errorMessage === "Failed to fetch" && searchTerm) {
                errorMessage = "The OpenFoodFacts server timed out on your search. Try a more specific product name to speed up the query!";
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Initial load and whenever filters change
    useEffect(() => {
        console.log("loadProducts called!"); loadProducts(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, category, sortBy]);


    return (
        <div className="bg-slate-50 min-h-screen pb-10">
            <Header
                searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                category={category} setCategory={setCategory}
                sortBy={sortBy} setSortBy={setSortBy}
            />

            <div className="p-6">
                {error && <div className="text-red-500 text-center py-4">{error}</div>}

                <div className="flex flex-wrap gap-6 justify-center">
                    {products.map(product => (
                        <Card key={product.id || product.code} product={product} />
                    ))}
                </div>

                {products.length === 0 && !loading && !error && (
                    <div className="text-center py-10 text-slate-500">No products found.</div>
                )}

                {hasMore && products.length > 0 && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => loadProducts(true)}
                            disabled={loading}
                            className="px-6 py-2 bg-green-500 text-white font-medium rounded-full shadow-md hover:bg-green-600 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Loading...' : 'Load More'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Homepage;