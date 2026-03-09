import React, { useState } from "react";

function ProductFetcher() {
    const [barcode, setBarcode] = useState("");
    const [product, setProduct] = useState(null);
    const [error, setError] = useState("");

    const fetchProduct = async () => {
        if (!barcode) return;

        try {
            const response = await fetch(
                `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
            );
            const data = await response.json();

            if (!data.product) {
                setError("Product not found");
                setProduct(null);
                return;
            }

            setProduct(data.product);
            setError("");
        } catch (err) {
            console.error("Failed to fetch product:", err);
            setError("API Error");
            setProduct(null);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <input
                type="text"
                value={barcode}
                placeholder="Enter barcode"
                onChange={(e) => setBarcode(e.target.value)}
            />
            <button onClick={fetchProduct}>Search</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {product && (
                <div style={{ marginTop: "20px" }}>
                    <h3>{product.product_name}</h3>
                    <p>Brand: {product.brands}</p>
                    {product.image_url && (
                        <img src={product.image_url} alt={product.product_name} width={200} />
                    )}
                </div>
            )}
        </div>
    );
}

export default ProductFetcher;