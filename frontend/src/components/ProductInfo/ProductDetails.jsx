import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Plus, Minus, Share2, Facebook, Instagram, Twitter } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const ProductDetails = () => {
    const { id } = useParams()
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeImage, setActiveImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(true)
    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedSize, setSelectedSize] = useState(null)
    const { addToCart } = useCart()

    useEffect(() => {
        fetch(`${BASEURL}/api/products/${id}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch product details")
            }
            return response.json()
        })
        .then((data) => {
            setProduct(data)
            // Set default selections
            if (data.colors && data.colors.length > 0) {
                setSelectedColor(data.colors[0])
            }
            if (data.sizes && data.sizes.length > 0) {
                setSelectedSize(data.sizes[0])
            }
            setLoading(false)
        })
        .catch((error) => {
            setError(error.message)
            setLoading(false)
        })
    }, [id, BASEURL])

    const handleQuantity = (action) => {
        if (action === 'inc') {
            setQuantity(prev => prev + 1)
        } else if (action === 'dec' && quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }

    const handleAddToCart = () => {
        if (!localStorage.getItem('access_token')) {
            window.location.href = '/login'
            return
        }

        // Validate selections
        if (product.colors && product.colors.length > 0 && !selectedColor) {
            alert('Please select a color')
            return
        }

        if (product.sizes && product.sizes.length > 0 && !selectedSize) {
            alert('Please select a size')
            return
        }

        addToCart(product.id, quantity, selectedSize, selectedColor?.name)
        alert('Product added to cart!')
    }

    if (loading) { 
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Loading...</div>
            </div>
        )
    }
    
    if (error) { 
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-red-600">Error: {error}</div>
            </div>
        )
    }
    
    if (!product) { 
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">No product found</div>
            </div>
        )
    }

    const images = product.images && product.images.length > 0 
        ? product.images 
        : product.image 
            ? [{ image: product.image, order: 0 }] 
            : []

    return (
        <div className="bg-white pt-32 pb-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">

                    {/* Images Section */}
                    <div className="flex flex-col-reverse lg:flex-row gap-4">
                        {images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2 lg:flex-col lg:pb-0 lg:overflow-hidden scrollbar-hide">
                                {images.map((img, index) => (
                                    <button 
                                        key={index} 
                                        onClick={() => setActiveImage(index)}
                                        className={`relative flex shrink-0 h-20 w-16 lg:h-24 lg:w-20 overflow-hidden rounded-md border transition-all duration-300 
                                        ${activeImage === index ? 'border-black ring-1 ring-black' : 'border-transparent hover:border-gray-300'}`}
                                    >
                                        <img 
                                            src={img.image} 
                                            alt={`${product.name} - ${index + 1}`} 
                                            className="h-full w-full object-cover object-center" 
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="relative w-full aspect-3/4 overflow-hidden rounded-lg bg-gray-100 group">
                            {images.length > 0 ? (
                                <img 
                                    src={images[activeImage]?.image || images[0]?.image} 
                                    alt={product.name}
                                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full w-full text-gray-400">
                                    No image available
                                </div>
                            )}

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

                            {!product.in_stock && (
                                <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
                                    <span className="border border-black bg-white px-3 py-1 font-display text-sm font-bold uppercase tracking-widest text-black">
                                        Sold Out
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
                        <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-gray-900 sm:text-4xl">
                            {product.name}
                        </h1>
                        
                        <div className="mt-4 flex items-baseline space-x-3">
                            {product.has_discount && product.old_price ? (
                                <>
                                    <p className="text-2xl font-bold tracking-wide text-red-600">
                                        ₦{product.price}
                                    </p>
                                    <p className="text-xl font-medium text-gray-400 line-through">
                                        ₦{product.old_price}
                                    </p>
                                    <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
                                        {Math.round(((product.old_price - product.price) / product.old_price) * 100)}% OFF
                                    </span>
                                </>
                            ) : (
                                <p className="text-2xl font-medium tracking-wide text-gray-900">
                                    ₦{product.price}
                                </p>
                            )}
                        </div>

                        {/* Stock Status */}
                        <div className="mt-4">
                            {product.in_stock ? (
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                                    </span>
                                    <span className="text-sm font-medium text-green-700">In Stock</span>
                                </div>
                            ) : (
                                <span className="text-sm font-medium text-red-600">Out of Stock</span>
                            )}
                        </div>

                        <div className="my-8 border-t border-gray-200"></div>

                        {/* Colors */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">
                                    Color: <span className="text-gray-500 font-normal">{selectedColor?.name}</span>
                                </h3>
                                <div className="mt-3 flex items-center space-x-3">
                                    {product.colors.map((color, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedColor(color)}
                                            className={`relative h-8 w-8 rounded-full border border-gray-200 focus:outline-none transition-transform hover:scale-110 ${
                                                selectedColor?.name === color.name ? 'ring-2 ring-black ring-offset-2' : ''
                                            }`}
                                            style={{ backgroundColor: color.hex }}
                                            title={color.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Sizes */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="mt-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">
                                        Size: <span className="text-gray-500 font-normal">{selectedSize}</span>
                                    </h3>
                                </div>
                                <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6">
                                    {product.sizes.map((size, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedSize(size)}
                                            className={`flex items-center justify-center border py-3 text-xs font-bold uppercase sm:flex-1 transition-all duration-200
                                            ${selectedSize === size
                                                ? 'border-black bg-black text-white' 
                                                : 'border-gray-200 bg-white text-gray-900 hover:border-gray-900'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity Selector */}
                        <div className="mt-8">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-3">Quantity</h3>
                            <div className="flex items-center w-32 border border-black">
                                <button 
                                    onClick={() => handleQuantity('dec')}
                                    className="p-3 hover:bg-gray-100 transition-colors disabled:opacity-50"
                                    disabled={quantity <= 1}
                                >
                                    <Minus size={16} />
                                </button>
                                <input 
                                    type="text" 
                                    value={quantity}
                                    readOnly 
                                    className="w-full text-center text-sm font-medium focus:outline-none" 
                                />
                                <button 
                                    onClick={() => handleQuantity('inc')} 
                                    className="p-3 hover:bg-gray-100 transition-colors"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <div className="mt-10 flex flex-col gap-4">
                            <button 
                                onClick={handleAddToCart}
                                disabled={!product.in_stock}
                                className={`flex w-full items-center justify-center border border-black px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all ${
                                    !product.in_stock
                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                        : 'bg-white text-black hover:bg-black hover:text-white'
                                }`}
                            >
                                {product.in_stock ? 'Add to cart' : 'Out of Stock'}
                            </button>
                        </div>

                        {/* Product Details */}
                        <div className="mt-12 space-y-6">
                            <div className="border-t border-gray-200 pt-6">
                                <button 
                                    onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                                    className="flex w-full items-center justify-between text-left"
                                >
                                    <span className="text-sm font-bold uppercase tracking-widest text-gray-900">Product Details</span>
                                    <span className="ml-6 flex items-center">
                                        {isDescriptionOpen ? <Minus size={16}/> : <Plus size={16}/>}
                                    </span>
                                </button>
                                <div className={`mt-4 prose prose-sm text-gray-500 transition-all duration-300 overflow-hidden ${isDescriptionOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p>{product.description || 'No description available.'}</p>
                                    
                                    <div className="mt-4 space-y-2">
                                        <p><strong>Category:</strong> {product.category?.name}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Share */}
                            <div className="flex gap-6 pt-6 text-gray-500">
                                <Facebook size={20} className="hover:text-black cursor-pointer transition-colors" />
                                <Instagram size={20} className="hover:text-black cursor-pointer transition-colors" />
                                <Twitter size={20} className="hover:text-black cursor-pointer transition-colors" />
                                <Share2 size={20} className="hover:text-black cursor-pointer transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails