import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from '../HOME/ProductCard';
import { ArrowDown } from 'lucide-react';

const CollectionPage = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [visibleCount, setVisibleCount] = useState(8);

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL

    useEffect(() => {
        fetch(`${BASEURL}/api/products/`)  // ← Fetch ALL products
        .then(res => {
            if (!res.ok) throw new Error("Failed to fetch products")
            return res.json()
        })
        .then(data => {
            setProducts(data)
            setLoading(false)
        })
        .catch(err => {
            console.error(err)
            setLoading(false)
        })
    }, [])

    // Extract unique categories from fetched products
    const categories = useMemo(() => {
        const allCats = products.map(p => p.category?.name || 'Uncategorized')
        return ['All', ...new Set(allCats)]
    }, [products])

    // Filter products by category
    const filteredProducts = products.filter(item => {
        if (selectedCategory === 'All') return true;
        return (item.category?.name || 'Uncategorized') === selectedCategory;
    });

    const visibleProducts = filteredProducts.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 4);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen pt-36">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
            </div>
        )
    }

    return (
        <section className="bg-white px-4 pt-36 pb-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                
                {/* Header */}
                <div className="mb-12 flex flex-col space-y-6 border-b border-black pb-6 sm:flex-row sm:items-end sm:justify-between sm:space-y-0">
                    <div>
                        <h2 className="font-display text-3xl font-bold uppercase tracking-tighter sm:text-4xl">
                            Ready to Wear
                        </h2>
                        <p className="mt-2 text-xs font-medium uppercase tracking-widest text-gray-500">
                            Autumn / Winter 2025
                        </p>
                    </div>

                    {/* Filter UI */}
                    <div className="flex flex-col items-start gap-4 sm:items-end">
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setVisibleCount(8);
                                    }}
                                    className={`text-xs font-bold uppercase tracking-widest transition-colors 
                                        ${selectedCategory === cat 
                                            ? 'bg-black text-white px-3 py-1' 
                                            : 'text-gray-400 hover:text-black px-1'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <span className="hidden text-xs font-bold uppercase tracking-widest text-gray-400 sm:block">
                            {filteredProducts.length} Products
                        </span>
                    </div>
                </div>

                {/* The Grid */}
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {visibleProducts.length > 0 ? (
                        visibleProducts.map((item) => (
                            <ProductCard key={item.id} product={item} />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-gray-400">
                            <p className="text-sm uppercase tracking-widest">No products found in this category.</p>
                        </div>
                    )}
                </div>

                {/* LOAD MORE BUTTON */}
                {visibleCount < filteredProducts.length && (
                    <div className="mt-16 flex justify-center">
                        <button 
                            onClick={handleLoadMore}
                            className="group flex items-center gap-2 border-b border-black pb-1 text-xs font-bold uppercase tracking-widest hover:text-gray-600 hover:border-gray-600 transition-all"
                        >
                            Load More
                            <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform duration-300" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CollectionPage;