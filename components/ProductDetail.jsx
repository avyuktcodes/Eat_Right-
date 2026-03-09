import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductByBarcode } from '../services/Api';
import { ArrowLeft, Leaf, WheatOff, CheckCircle2 } from 'lucide-react';

const ProductDetail = () => {
    const { barcode } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                const data = await fetchProductByBarcode(barcode);
                setProduct(data);
                setError('');
            } catch (err) {
                setError(err.message || "Failed to load product details.");
            } finally {
                setLoading(false);
            }
        };

        if (barcode) {
            loadProduct();
        }
    }, [barcode]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-slate-500 font-medium">Loading details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
                <div className="text-red-500 text-xl font-bold bg-red-100 px-6 py-4 rounded-xl shadow-md">
                    {error}
                </div>
                <button onClick={() => navigate(-1)} className="mt-6 px-6 py-2 bg-slate-200 hover:bg-slate-300 rounded-full font-medium transition-colors">
                    Go Back
                </button>
            </div>
        );
    }

    if (!product) return null;

    const grade = product.grade ? product.grade.toUpperCase() : "?";
    const gradeColors = {
        'A': 'bg-green-600', 'B': 'bg-green-400', 'C': 'bg-yellow-400',
        'D': 'bg-orange-500', 'E': 'bg-red-600', '?': 'bg-gray-400'
    };
    const gradeColor = gradeColors[grade] || gradeColors['?'];

    // Safely check labels
    const labelsStr = (product.labels || "").toLowerCase();
    const isVegan = labelsStr.includes('vegan');
    const isGlutenFree = labelsStr.includes('gluten-free') || labelsStr.includes('sans gluten');
    const isOrganic = labelsStr.includes('organic') || labelsStr.includes('bio');


    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header / Nav */}
            <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-50 flex items-center gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors flex items-center justify-center"
                    aria-label="Go back"
                >
                    <ArrowLeft size={24} className="text-slate-700" />
                </button>
                <h1 className="text-xl font-bold text-slate-800 truncate flex-1">{product.name}</h1>
                <div className={`rounded-xl px-4 py-1 text-white font-bold text-lg shadow-sm ${gradeColor}`}>
                    {grade}
                </div>
            </div>

            <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 mt-4">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Left Column: Image & Badges */}
                    <div className="md:w-1/3 flex flex-col gap-6">
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-6 flex items-center justify-center border border-slate-100">
                            {product.image ? (
                                <img src={product.image} alt={product.name} className="max-h-96 object-contain mix-blend-multiply hover:scale-105 transition-transform duration-300" />
                            ) : (
                                <div className="h-64 flex items-center justify-center text-slate-400">No Image Available</div>
                            )}
                        </div>

                        {/* Labels row */}
                        <div className="flex flex-wrap gap-3">
                            {isVegan && (
                                <div className="flex items-center gap-1.5 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold border border-green-200">
                                    <Leaf size={16} /> Vegan
                                </div>
                            )}
                            {isGlutenFree && (
                                <div className="flex items-center gap-1.5 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold border border-amber-200">
                                    <WheatOff size={16} /> Gluten-Free
                                </div>
                            )}
                            {isOrganic && (
                                <div className="flex items-center gap-1.5 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold border border-emerald-200">
                                    <CheckCircle2 size={16} /> Organic
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="md:w-2/3 flex flex-col gap-6">

                        {/* Summary Card */}
                        <div className="bg-white rounded-3xl shadow-md p-6 border border-slate-100">
                            <h2 className="text-slate-500 font-medium text-sm uppercase tracking-wider mb-2">{product.category}</h2>
                            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">{product.name}</h1>

                            <h3 className="text-lg font-bold text-slate-800 mb-3 border-b pb-2">Ingredients</h3>
                            <p className="text-slate-700 leading-relaxed text-sm format-ingredients">
                                {product.ingredients || "No ingredients listed for this product."}
                            </p>
                        </div>

                        {/* Nutrition Card */}
                        <div className="bg-white rounded-3xl shadow-md p-6 border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2 flex items-center justify-between">
                                <span>Nutritional Values</span>
                                <span className="text-sm font-normal text-slate-500">per 100g / 100ml</span>
                            </h3>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <NutritionBox
                                    label="Energy"
                                    value={product.nutriments?.['energy-kcal_100g']}
                                    unit="kcal"
                                    color="bg-orange-50 text-orange-700 border-orange-200"
                                />
                                <NutritionBox
                                    label="Fat"
                                    value={product.nutriments?.fat_100g}
                                    unit="g"
                                    color="bg-red-50 text-red-700 border-red-200"
                                />
                                <NutritionBox
                                    label="Carbs"
                                    value={product.nutriments?.carbohydrates_100g}
                                    unit="g"
                                    color="bg-blue-50 text-blue-700 border-blue-200"
                                />
                                <NutritionBox
                                    label="Sugars"
                                    value={product.nutriments?.sugars_100g}
                                    unit="g"
                                    color="bg-pink-50 text-pink-700 border-pink-200"
                                />
                                <NutritionBox
                                    label="Proteins"
                                    value={product.nutriments?.proteins_100g}
                                    unit="g"
                                    color="bg-emerald-50 text-emerald-700 border-emerald-200"
                                />
                                <NutritionBox
                                    label="Salt"
                                    value={product.nutriments?.salt_100g}
                                    unit="g"
                                    color="bg-slate-50 text-slate-700 border-slate-200"
                                />
                                <NutritionBox
                                    label="Fiber"
                                    value={product.nutriments?.fiber_100g}
                                    unit="g"
                                    color="bg-teal-50 text-teal-700 border-teal-200"
                                />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

// Small helper component for nutrition stats
const NutritionBox = ({ label, value, unit, color }) => {
    // Treat undefined, null, or missing as 0 or '-'
    const displayValue = value !== undefined && value !== null ? Number(value).toFixed(1) : '-';

    return (
        <div className={`flex flex-col items-center justify-center p-4 rounded-2xl border ${color}`}>
            <span className="text-xs uppercase tracking-wider font-semibold opacity-70 mb-1">{label}</span>
            <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black">{displayValue}</span>
                <span className="text-sm font-bold opacity-70">{unit}</span>
            </div>
        </div>
    );
};

export default ProductDetail;
