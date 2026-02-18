import React from 'react'
import { useCart } from '../../context/CartContext' // ✅ FIXED: CartContext not CardContext
import { Link } from 'react-router-dom'
import { ShoppingBag, ArrowLeft, ArrowRight, Minus, Plus, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const CartPage = () => {
    const { cartItems, total, removeFromCart, updateQuantity } = useCart()
    console.log("Cart Items:", cartItems)
    console.log("Total:", total)

    return (
        <>
            {cartItems.length === 0 ? (
                <div className="min-h-screen bg-[#F8F8F8] pt-24 pb-12 px-4">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
                            <div className="mb-8 relative inline-block">
                                <div className="absolute inset-0 bg-gray-100 rounded-full blur-2xl opacity-50"></div>
                                <div className="relative bg-gray-50 rounded-full p-8">
                                    <ShoppingBag size={80} className="text-gray-300" strokeWidth={1.5} />
                                </div>
                            </div>

                            <h2 className="text-3xl font-bold mb-3 font-display tracking-tight">
                                Your Cart is Empty
                            </h2>
                            <p className="text-gray-500 mb-8 text-lg max-w-md mx-auto">
                                Looks like you haven't added anything to your cart yet. Start shopping and discover amazing products!
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Link 
                                    to="/" 
                                    className="group inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                                    Start Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="min-h-screen bg-[#F8F8F8] pt-24 pb-12 px-4 md:px-8">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-3xl font-bold mb-8 font-display tracking-tight">
                            Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                        </h1>

                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Cart Items */}
                            <div className="flex-1 space-y-4">
                                <AnimatePresence>
                                    {cartItems.map(item => {
                                        const productImage = item.product_image || '/placeholder-image.jpg'
                                        
                                        return (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: -50 }}
                                                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 md:gap-6 items-start"
                                            >
                                                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-xl overflow-hidden flex shrink-0">
                                                    <img 
                                                        src={productImage}
                                                        alt={item.product_name}
                                                        className="w-full h-full object-cover mix-blend-multiply" 
                                                    />
                                                </div>

                                                <div className="flex-1 flex flex-col md:flex-row justify-between">
                                                    <div className="space-y-1">
                                                        <h3 className="font-bold text-sm md:text-base uppercase tracking-wide">
                                                            {item.product_name}
                                                        </h3>

                                                        <div className="md:hidden mt-2 font-bold">
                                                            ₦{item.product_price}
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-row md:flex-col justify-between items-center md:items-end mt-4 md:mt-0">
                                                        <div className="text-right hidden md:block mb-4">
                                                            <span className="text-lg font-bold">
                                                                ₦{item.product_price}
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center gap-6">
                                                            <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                                                                <button 
                                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                    disabled={item.quantity <= 1}
                                                                    className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                                                >
                                                                    <Minus size={14} />
                                                                </button>
                                                                <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                    className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors"
                                                                >
                                                                    <Plus size={14} />
                                                                </button>
                                                            </div>

                                                            <button 
                                                                onClick={() => removeFromCart(item.id)}
                                                                className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                                                title="Remove item"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )
                                    })}
                                </AnimatePresence>

                                <div className="mt-6">
                                    <Link to="/" className="text-sm font-bold flex items-center gap-2 hover:underline">
                                        <ArrowLeft size={16} /> Continue Shopping
                                    </Link>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:w-96 flex shrink-0">
                                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-28 w-full">
                                    <h3 className="text-xl font-bold mb-6 font-display">Order Summary</h3>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal</span>
                                            <span className="font-bold text-black">${total.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Shipping</span>
                                            <span className="text-sm">Calculated at checkout</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Tax</span>
                                            <span className="text-sm">${(total * 0.1).toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {/* Coupon Input */}
                                    <div className="mb-6">
                                        <div className="flex gap-2">
                                            <input 
                                                type="text" 
                                                placeholder="Promo code" 
                                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors text-sm"
                                            />
                                            <button className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-300 transition-colors">
                                                Apply
                                            </button>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-4 mb-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold">Total</span>
                                            <div className="text-right">
                                                <span className="text-2xl font-black block">${(total * 1.1).toFixed(2)}</span>
                                                <span className="text-xs text-gray-500">Including VAT</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Link 
                                        to="/checkout" 
                                        className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-900 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 shadow-lg group"
                                    >
                                        Checkout Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                                    </Link>

                                    <div className="mt-4 flex justify-center gap-4 opacity-50 grayscale">
                                        <div className="h-6 w-10 bg-gray-200 rounded"></div>
                                        <div className="h-6 w-10 bg-gray-200 rounded"></div>
                                        <div className="h-6 w-10 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CartPage