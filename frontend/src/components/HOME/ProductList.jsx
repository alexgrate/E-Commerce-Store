import React, { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'

const ProductList = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL

    useEffect(() => {
        fetch(`${BASEURL}/api/products/new/`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch products")
            }
            return response.json()
        })
        .then((data) => {
            setProducts(data);
            setLoading(false)
        })
        .catch((error) => {
            setError(error.message)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }



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
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p className='col-span-full text-center text-gray-500'>No products available</p>
                )}
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

export default ProductList