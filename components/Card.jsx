import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ product }) => {
    if (!product) return null;

    const barcode = product.code || product.id;
    const name = product.product_name || "Unknown Product";
    const image = product.image_front_url || product.image_url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1kKTXfptyHt2VxVVqO5iHxBb9qyKP2cQ9uQ&s";
    const category = product.categories ? product.categories.split(',')[0] : (product.brands || "Food");

    const grade = product.nutriscore_grade ? product.nutriscore_grade.toUpperCase() : "?";
    const gradeColors = {
        'A': 'bg-green-600',
        'B': 'bg-green-400',
        'C': 'bg-yellow-400',
        'D': 'bg-orange-500',
        'E': 'bg-red-600',
        '?': 'bg-gray-400'
    };
    const gradeColor = gradeColors[grade] || gradeColors['?'];

    return (
        <Link to={`/product/${barcode}`} className='h-40 w-90 flex flex-row rounded-4xl shadow-md bg-white hover:shadow-2xl hover:scale-105 transition-all duration-200 cursor-pointer overflow-hidden border border-slate-100'>
            <div className='h-40 w-40 shrink-0 bg-slate-100 flex items-center justify-center p-2'>
                <img src={image} alt={name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
            </div>
            <div className='flex-1 flex flex-col justify-between py-4 px-3 overflow-hidden'>
                <div className='flex flex-col gap-1'>
                    <h4 className='text-stone-500 font-medium text-[10px] uppercase tracking-wider truncate'>{category}</h4>
                    <h3 className='font-bold text-md text-slate-800 line-clamp-2 leading-tight' title={name}>{name}</h3>
                </div>
                <div className='flex flex-row items-center justify-between mt-2'>
                    <p className='text-xs text-stone-500 truncate max-w-[120px]'>Nutri-Score</p>
                    <div className={`rounded-xl px-3 py-1 text-white font-bold text-sm ${gradeColor}`}>
                        {grade}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card