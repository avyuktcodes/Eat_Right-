import React from 'react'
import Navbar from './Navbar'
import Sortbar from './SortBar'

const Header = ({ searchTerm, setSearchTerm, category, setCategory, sortBy, setSortBy }) => {
    return (
        <div className="relative w-full bg-slate-50 overflow-hidden">

            <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-green-100/50 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-yellow-100/40 blur-[100px] pointer-events-none"></div>
            <div className="absolute top-[20%] right-[-10%] h-[300px] w-[300px] rounded-full bg-emerald-50/60 blur-[80px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-start justify-center pt-20 px-6 ">
                <h1 className="text-4xl font-bold text-slate-900 font-sans py-2">Discover Better Food</h1>
                <p className="text-slate-700 font-light py-">Search by name to uncover the nutrients of your favorite food</p>
                <div className="py-4"></div>
                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <div className="relative z-10 py-6">
                <Sortbar category={category} setCategory={setCategory} sortBy={sortBy} setSortBy={setSortBy} />
            </div>

        </div>
    )
}

export default Header   