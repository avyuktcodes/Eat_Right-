import { FilterIcon } from "lucide-react"

const SortBar = ({ category, setCategory, sortBy, setSortBy }) => {

    // Helper function to manage active styling
    const getBtnClass = (btnCategory) => {
        const isActive = category === btnCategory || (btnCategory === '' && category === '');
        return `px-5 py-2 rounded-2xl font-medium transition-colors duration-200 ${isActive ? 'bg-green-800 text-white' : 'bg-green-400 text-black hover:bg-green-800 hover:text-white'
            }`;
    };

    const getSortClass = (btnSort) => {
        const isActive = sortBy === btnSort;
        return `px-3 py-1 rounded-2xl text-xs transition-colors duration-200 cursor-pointer ${isActive ? 'bg-green-300 font-bold' : 'bg-green-50 font-medium hover:bg-green-200'
            }`;
    }

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 gap-4 w-full max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-2">
                <div className="px-3 py-2">
                    <FilterIcon size={24} color='DarkGreen' />
                </div>
                <button onClick={() => setCategory('')} className={getBtnClass('')}>All</button>
                <button onClick={() => setCategory('snacks')} className={getBtnClass('snacks')}>Snacks</button>
                <button onClick={() => setCategory('beverages')} className={getBtnClass('beverages')}>Beverages</button>
                <button onClick={() => setCategory('dairies')} className={getBtnClass('dairies')}>Dairy</button>

                {/* Dropdown for other categories */}
                <select
                    className="ml-2 px-3 py-2 rounded-xl bg-white border border-green-200 text-sm outline-none cursor-pointer"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="" disabled>More Categories...</option>
                    <option value="chocolates">Chocolates</option>
                    <option value="biscuits">Biscuits</option>
                    <option value="sauces">Sauces</option>
                    <option value="cereals">Cereals</option>
                </select>
            </div>

            <div className="flex flex-row items-center px-3 py-2 gap-2 border-2 shadow-sm border-slate-100 rounded-2xl bg-white">
                <p className="text-stone-500 font-light text-sm px-2">Sort:</p>
                <button onClick={() => setSortBy('product_name')} className={getSortClass('product_name')}>A-Z</button>
                <button onClick={() => setSortBy('nutriscore_score')} className={getSortClass('nutriscore_score')}>Score</button>
            </div>
        </div>
    )
}

export default SortBar