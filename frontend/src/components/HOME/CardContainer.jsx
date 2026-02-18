import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import HomeCard from './ProductCard'


const CardContainer = ({products}) => {
    return (
        <section className="w-full max-w-7xl mx-auto px-6 py-24 font-sans">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 space-y-4 md:space-y-0">
                <div>
                    <h2 className="text-xs font-bold tracking-widest text-black mb-2 font-display">NEW IN</h2>
                    <p className="text-sm font-medium text-gray-700 tracking-wide font-display">
                        EXPLORE OUR NEW COLLECTION
                    </p>
                </div>
                
                <Link 
                    to="/Shop" 
                    className="text-sm border-b border-gray-300 hover:border-black pb-0.5 text-black transition-colors font-display"
                >
                    Shop New In
                </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
                {products.map(product => (
                    <HomeCard key={product.id} product={product} />
                ))}
            </div>

            {/* VIEW MORE BUTTON */}
            <div className="mt-16 flex justify-center">
                <Link 
                    to="/Shop" 
                    className="group flex items-center gap-2 bg-black text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all"
                >
                    View All Results
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
            </div>
        </section>
    )
}

export default CardContainer