import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { authFetch } from "../../utils/auth"
import { useCart } from "../../context/CartContext"



const CheckoutPage = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL
    const navigate = useNavigate()
    const { cartItems, total, clearCart } = useCart()

    const [form, setForm] = useState({
        name: "", 
        address: "",
        apartment: "", 
        city: "",      
        state: "", 
        postalCode: "",
        phone: "",
        country: "Nigeria",
        payment_method: "COD",
        billing_address: "same",
    })

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")
        try {
            const res = await authFetch(`${BASEURL}/api/orders/create/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            })
            const data = await res.json()

            if(res.ok) {
                clearCart()
                if (form.payment_method === 'paystack' && data.payment_url) {
                    window.location.href = data.payment_url
                } else {
                    alert("Order placed successfully!")
                    navigate("/")
                }
            } else {
                alert(data.error || "Order failed")
                setLoading(false)
            }
        } catch (error) {
            console.error("Checkout error:", error)
            setLoading(false)
        }
    }

    const safeTotal = parseFloat(total || 0)

    
    return (
        <div className="min-h-screen bg-white pt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Side - Forms */}
                    <div>
                        {/* Contact Email with Dropdown */}
                        <div className="mb-8 pb-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-700">
                                        A
                                    </div>
                                    <span className="text-sm">alexgrate606@gmail.com</span>
                                </div>
                                
                                {/* Three Dots with Dropdown */}
                                <div className="relative">
                                    <button 
                                        onClick={() => setShowDropdown(!showDropdown)}
                                        className="text-gray-600 hover:text-black p-2 rounded-full hover:bg-gray-100 transition-colors"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                            <circle cx="10" cy="4" r="1.5"/>
                                            <circle cx="10" cy="10" r="1.5"/>
                                            <circle cx="10" cy="16" r="1.5"/>
                                        </svg>
                                    </button>
                                    
                                    {/* Dropdown Menu */}
                                    {showDropdown && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                                                Change Email
                                            </button>
                                            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors">
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Delivery Section */}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-8">
                                <h2 className="text-xl font-bold mb-6 uppercase tracking-tight">Delivery</h2>
                                
                                <div className="space-y-4">
                                    {/* Country */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-2">
                                            Country/Region
                                        </label>
                                        <select 
                                            name="country"
                                            value={form.country}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                                        >
                                            <option>Nigeria</option>
                                        </select>
                                    </div>

                                    {/* Name Fields */}
                                    <div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Full Name"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                                            required
                                        />
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <input
                                            type="text"
                                            name="address"
                                            value={form.address}
                                            onChange={handleChange}
                                            placeholder="Full Address"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                                            required
                                        />
                                    </div>

                                    {/* Apartment */}
                                    <div>
                                        <input
                                            type="text"
                                            name="apartment"
                                            value={form.apartment}
                                            onChange={handleChange}
                                            placeholder="Apartment, suite, etc. (optional)"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                                        />
                                    </div>

                                    {/* City, State, Postal Code */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <input
                                                type="text"
                                                name="city"
                                                value={form.city}
                                                onChange={handleChange}
                                                placeholder="City"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <select 
                                                name="state"
                                                value={form.state}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                                                required
                                            >
                                                <option>Lagos</option>
                                                <option>Abuja</option>
                                                <option>Kano</option>
                                            </select>
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                name="postalCode"
                                                value={form.postalCode}
                                                onChange={handleChange}
                                                placeholder="Postal code (optional)"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            placeholder="Phone Number"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                                            required
                                        />
                                    </div>

                                    {/* Email Checkbox */}
                                    <div className="flex items-center gap-2">
                                        <input 
                                            type="checkbox" 
                                            name="emailOffers"
                                            className="w-4 h-4" 
                                        />
                                        <label className="text-sm text-gray-600">Email me with news and offers</label>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Section */}
                            <div className="mb-8">
                                {/* Shipping Method */}
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold mb-4 uppercase tracking-tight">Shipping method</h2>
                                    <div className="border border-gray-300 rounded-lg p-4 flex justify-between items-center bg-gray-50">
                                        <span className="text-sm font-medium">Standard Shipping</span>
                                        <span className="text-sm font-bold">Free</span>
                                    </div>
                                </div>

                                {/* Payment */}
                                <h2 className="text-xl font-bold mb-2 uppercase tracking-tight">Payment</h2>
                                <p className="text-xs text-gray-500 mb-4">All transactions are secure and encrypted.</p>
                                
                                <div className="border border-gray-300 rounded-lg overflow-hidden">
                                    {/* Flutterwave Option */}
                                    <div className={form.payment_method === "paystack" ? "bg-blue-50" : "bg-white"}>
                                        <div className="p-4 flex items-center justify-between border-b border-gray-300">
                                            <div className="flex items-center gap-3">
                                                <input 
                                                    type="radio" 
                                                    name="payment_method"
                                                    value="paystack"
                                                    checked={form.payment_method === "paystack"}
                                                    onChange={handleChange}
                                                    className="w-5 h-5"
                                                />
                                                <span className="font-medium">Paystack</span>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <div className="w-8 h-5 bg-blue-600 rounded"></div>
                                                <div className="w-8 h-5 bg-red-500 rounded"></div>
                                                <div className="w-8 h-5 bg-yellow-400 rounded"></div>
                                                <span className="text-xs text-gray-500">+5</span>
                                            </div>
                                        </div>
                                        
                                        {form.payment_method === "paystack" && (
                                            <div className="p-6 bg-gray-50 border-t border-gray-300">
                                                <div className="flex flex-col items-center justify-center py-8">
                                                    <div className="w-32 h-24 bg-white rounded-lg border-2 border-gray-300 mb-4 flex items-center justify-center">
                                                        <div className="text-4xl text-gray-400">→</div>
                                                    </div>
                                                    <p className="text-sm text-gray-600 text-center max-w-md">
                                                        After clicking "Pay now", you will be redirected to Flutterwave to complete your purchase securely.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Cash on Delivery Option */}
                                    <div className={form.payment_method === "COD" ? "bg-green-50" : "bg-white"}>
                                        <div className="p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <input 
                                                    type="radio" 
                                                    name="payment_method"
                                                    value="COD"
                                                    checked={form.payment_method === "COD"}
                                                    onChange={handleChange}
                                                    className="w-5 h-5"
                                                />
                                                <span className="font-medium">Cash on Delivery</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                        
                                        {form.payment_method === "COD" && (
                                            <div className="p-6 bg-gray-50 border-t border-gray-300">
                                                <div className="flex items-start gap-3">
                                                    <svg className="w-5 h-5 text-green-600 mt-0.5 flex shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-800 mb-1">Pay with cash upon delivery</p>
                                                        <p className="text-xs text-gray-600">
                                                            Please have the exact amount ready. Our delivery agent will collect payment when your order arrives.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Billing Address */}
                                <div className="mt-8">
                                    <h2 className="text-xl font-bold mb-4 uppercase tracking-tight">Billing address</h2>
                                    
                                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                                        <div className="p-4 bg-blue-50 border-b border-gray-300">
                                            <div className="flex items-center gap-3">
                                                <input 
                                                    type="radio" 
                                                    name="billing_address"
                                                    value="same"
                                                    checked={form.billing_address === 'same'}
                                                    onChange={handleChange}
                                                    className="w-5 h-5"
                                                />
                                                <span className="font-medium">Same as shipping address</span>
                                            </div>
                                        </div>
                                        
                                        <div className="p-4 bg-white">
                                            <div className="flex items-center gap-3">
                                                <input 
                                                    type="radio" 
                                                    name="billing_address"
                                                    value="different"
                                                    checked={form.billing_address === "different"}
                                                    onChange={handleChange}
                                                    className="w-5 h-5"
                                                />
                                                <span className="font-medium">Use a different billing address</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Error/Success Message */}
                                {message && (
                                    <div className={`mt-6 p-4 rounded-lg ${
                                        message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                                    }`}>
                                        {message.text}
                                    </div>
                                )}

                                {/* Pay Now Button */}
                                <button 
                                    type="submit"
                                    disabled={loading}
                                    className="w-full mt-8 bg-black text-white py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Processing...' : 'Pay Now'}
                                </button>

                                {/* Privacy Policy Link */}
                                <div className="mt-6 text-center">
                                    <a href="#" className="text-sm text-gray-600 underline hover:text-black">
                                        Privacy policy
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Right Side - Order Summary */}
                    <div>
                        <div className="bg-gray-50 p-6 rounded-lg sticky top-36">
                            <h2 className="text-base font-bold mb-4 uppercase tracking-tight">ORDER SUMMARY</h2>
                            
                            <div className="mb-6 space-y-4 max-h-96 overflow-y-auto">
                                {cartItems && cartItems.length > 0 ? (
                                    cartItems.map(item => (
                                        <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200">
                                            <div className="relative">
                                                <img 
                                                    src={item.product_image} 
                                                    alt={item.product_name}
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                />
                                                <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                    {item.quantity}
                                                </span>
                                            </div>

                                            <div className="flex-1">
                                                <h3 className="text-sm font-medium text-gray-800">
                                                    {item.product_name}
                                                </h3>
                                                {item.selected_color && (
                                                    <p className="text-xs text-gray-500 mt-1">Color: {item.selected_color}</p>
                                                )}
                                                {item.selected_size && (
                                                    <p className="text-xs text-gray-500">Size: {item.selected_size}</p>
                                                )}
                                                <p className="text-xs text-gray-500">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-sm font-bold">
                                                    ₦{(parseFloat(item.product_price) * item.quantity).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">No items in cart</p>
                                )}                               
                                
                            </div>

                            {/* Totals */}
                            <div className="space-y-3 pt-4 border-t border-gray-300">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">₦{safeTotal.toLocaleString()}</span>
                                </div>
                                
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium">Free</span>
                                </div>

                                <div className="flex justify-between items-center pt-4 border-t border-gray-300">
                                    <span className="text-base font-bold">Total</span>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500 mb-1">NGN</p>
                                        <p className="text-2xl font-black">₦{safeTotal.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage