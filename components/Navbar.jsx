import { Barcode, Search } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ searchTerm, setSearchTerm }) => {
    const [inputValue, setInputValue] = useState(searchTerm || '');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            // Check if it's a numeric barcode (e.g. 8+ digits)
            if (/^\d{8,14}$/.test(inputValue.trim())) {
                navigate(`/product/${inputValue.trim()}`);
            } else {
                setSearchTerm(inputValue.trim());
            }
        }
    };

    return (
        <div className='bg-stone-50/80 rounded-xl flex flex-row items-center shadow-xl text-sm px-4 w-[40%]'>

            <div className='flex items-center justify-center px-2 shrink-0 cursor-pointer' onClick={handleSearch}>
                <Search size={20} className='sm:w-6 sm:h-15' color='black' />
            </div>

            <div className='flex-1 flex items-start justify-start px-2'>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleSearch}
                    placeholder='Search for a product by name or barcode'
                    className='bg-transparent border-none outline-none text-black text-sm sm:text-base w-full p-2'
                />
            </div>

            <div className='flex items-center justify-center px-2 sm:px-3 shrink-0 cursor-pointer' onClick={() => {
                const code = prompt("Enter product barcode:")
                if (code && /^\d+$/.test(code.trim())) {
                    navigate(`/product/${code.trim()}`);
                }
            }}>
                <Barcode size={20} className='sm:w-6 sm:h-6' color='green' />
            </div>

        </div>
    )
}

export default Navbar