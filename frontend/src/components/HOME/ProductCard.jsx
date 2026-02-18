import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0)
    
    const imageArray = React.useMemo(() => {
        if (product.images && product.images.length > 0) {
            return product.images.map(img => img.image)
        } else if (product.image) {
            return [product.image]
        }
        return ['/placeholder-image.jpg'] // fallback placeholder
    }, [product])
    
    const handleHover = (index) => {
        setActiveImageIndex(index)
    }
    
    const handleMouseLeave = () => {
        setActiveImageIndex(0)
    }



    return (
        <Link to={`/product/${product.id}`} className="group" onMouseLeave={handleMouseLeave}>
            {/* Image SECTION */}
            <div className="relative aspect-3/4 w-full overflow-hidden bg-gray-100">
                <img
                    src={imageArray[activeImageIndex]}
                    alt={product.name}
                    onError={(e) => {
                        e.target.src = '/placeholder-image.jpg' // fallback on error
                    }}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div
                    className='absolute inset-0 z-20 grid h-full w-full'
                    style={{ gridTemplateColumns: `repeat(${imageArray.length}, 1fr)`}}
                >
                    {imageArray.map((_, index) => (
                        <div
                            key={index}
                            className='h-full w-full cursor-crosshair'
                            onMouseEnter={() => handleHover(index)}
                        />
                    ))}
                </div>

                {/* Badges - only show if applicable */}
                <div className="absolute left-2 top-2 z-30 flex flex-col gap-1">
                    {product.has_discount && (
                        <span className="bg-red-600 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
                            Sale
                        </span>
                    )}
                    
                    {product.is_new && (
                        <span className="bg-black px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
                            New In
                        </span>
                    )}
                </div>

                {/* Sold Out Overlay - only show if out of stock */}
                {!product.in_stock && (
                    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
                        <span className="border border-black bg-white px-3 py-1 font-display text-sm font-bold uppercase tracking-widest text-black">
                            Sold Out
                        </span>
                    </div>
                )}

                {/* Image indicators - only show if multiple images */}
                {imageArray.length > 1 && (
                    <div className="absolute bottom-3 left-0 right-0 z-30 flex justify-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {imageArray.map((_, index) => (
                            <div
                                key={index}
                                className={`h-1 rounded-full transition-all duration-300 ${
                                    index === activeImageIndex ? 'w-4 bg-white' : 'w-1 bg-white/50'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-4 flex flex-col items-start space-y-1">
                <h3 className="font-display text-sm font-bold uppercase leading-none tracking-wide text-black group-hover:underline decoration-1 underline-offset-4">
                    {product.name}
                </h3>

                <div className='flex items-baseline space-x-2 text-xs font-medium'>
                    {product.has_discount && product.old_price ? (
                        <>
                            <span className='text-red-600'>${product.price}</span>
                            <span className='text-gray-400 line-through decoration-gray-400'>${product.old_price}</span>
                        </>
                    ) : (
                        <span className='text-gray-900'>${product.price}</span>
                    )}
                </div>

                <div className='flex w-full items-center justify-between pt-1'>
                    <span className="text-[10px] uppercase tracking-wider text-gray-500">
                        {product.color_count} {product.color_count === 1 ? 'Color' : 'Colors'}
                    </span>

                    {product.in_stock && (
                        <div className="flex items-center gap-1.5">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                            </span>
                            <span className="text-[10px] font-medium text-green-700">In Stock</span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    )
}

export default ProductCard