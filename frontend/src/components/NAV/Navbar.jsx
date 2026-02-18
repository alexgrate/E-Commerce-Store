// components/NavBar.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import logo from '../../assets/Header-Logo-White_d109eaee-14e4-40a0-94e3-1fc856375f6a.svg';
import roundBag from '../../assets/HF-2IN1-ROUND-BAG-6.avif';
import messengerBag from '../../assets/Uzii-36861_1089cbf8-4bbb-4953-ae9a-a08e5208b1c5.avif';
import { navItems } from '../../constants'; // Assuming spareNavItems isn't needed for core nav anymore
import { Menu, X, ShoppingBag, Search, User, LogOut } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { clearTokens, getAccessToken } from '../../utils/auth';

const NavBar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const location = useLocation();
    const { cartItems } = useCart()
    const navigate = useNavigate()
    
    // Change to true to see the "My Account" view.
    const [isLoggedIn, setIsLoggedIn] = useState(!!getAccessToken); 
    useEffect(() => {
        setIsLoggedIn(!!getAccessToken())
    }, [location])
    
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

    const { scrollY } = useScroll();

    // Hide navbar on scroll down, show on scroll up
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    // Close mobile menu if route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);


    // Search Content Component (Kept internally for simplicity here)
    const SearchModalContent = ({ setIsSearchOpen }) => {
        const [query, setQuery] = useState('');
        const inputRef = useRef(null);

        useEffect(() => {
            if (inputRef.current) inputRef.current.focus();
            document.body.style.overflow = 'hidden';
            return () => document.body.style.overflow = 'unset';
        }, []);

        const products = query ? [
            { name: 'HF MESSENGER BAG WHITE', price: '₦240,000.00', image: messengerBag },
            { name: 'HF ROUND BAG BLACK', price: '₦240,000.00', image: roundBag },
        ].filter(p => p.name.toLowerCase().includes(query.toLowerCase())) : [];

        return (
            <div className='flex flex-col h-full bg-white text-black'>
                <div className='flex items-center justify-between p-8 border-b border-gray-100'>
                    <h2 className="text-2xl font-serif italic">Search</h2>
                    <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>
                <div className='p-8'>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="What are you looking for?"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full text-xl bg-transparent border-b border-gray-200 pb-4 focus:outline-none focus:border-black transition-colors placeholder:text-gray-300"
                    />
                </div>
                <div className='flex-1 overflow-y-auto px-8 pb-8'>
                    {products.length > 0 && (
                        <div className="space-y-6">
                            {products.map((prod, idx) => (
                                <Link key={idx} to={`/product/${prod.name}`} onClick={() => setIsSearchOpen(false)} className="flex items-center gap-6 group">
                                    <div className="w-20 h-20 bg-gray-50 flex shrink-0">
                                        <img src={prod.image} alt={prod.name} className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold uppercase tracking-tight group-hover:underline">{prod.name}</p>
                                        <p className="text-sm text-gray-500">{prod.price}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )
    }

    const handleLogout = () => {
        clearTokens()
        setIsLoggedIn(false)
        navigate('/login')
    }

    return (
        <>
            <motion.nav
                variants={{ visible: { y: 0 }, hidden: { y: "-120%" } }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: [0.32, 0.725, 0, 1] }}
                className='fixed top-0 md:top-6 z-40 flex w-full flex-col items-center justify-center font-display'
            >
                <div className='flex w-full items-center justify-between p-4 md:px-8 md:py-5 backdrop-blur-xl bg-black/80 md:bg-black/40 md:border md:border-white/10 md:w-[95%] lg:w-[85%] max-w-7xl md:rounded-full shadow-2xl relative'>
                    
                    {/* Desktop Links Left */}
                    <div className='hidden lg:flex items-center space-x-8'>
                        {navItems.map((item, index) => (
                            <Link key={index} to={item.href} className="text-xs font-bold text-white tracking-widest uppercase hover:text-white/70 transition-colors relative group"> 
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Trigger */}
                    <div className='lg:hidden'>
                        <button onClick={() => setIsMobileMenuOpen(true)} className="text-white p-1">
                            <Menu size={24} />
                        </button>
                    </div>

                    {/* Logo Center */}
                    <Link to="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-105 transition-transform">
                        <img src={logo} alt="logo" className="w-24 md:w-28" />
                    </Link>

                    {/* Desktop Right Icons & Login */}
                    <div className='hidden lg:flex items-center space-x-8'>
                        <button onClick={() => setIsSearchOpen(true)} className="text-white hover:scale-110 transition-transform">
                            <Search size={20} />
                        </button>

                        <Link to="/Cart" className="relative text-white hover:scale-110 transition-transform">
                            <ShoppingBag size={20} />
                            {cartCount > 0 && (
                                <span className='absolute -top-2 -right-2 bg-white text-black text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center'>
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* THIS IS THE FIX FOR THE LOGIN BUTTON VISIBILITY */}
                        {isLoggedIn ? (
                            <div className='flex items-center gap-4'>
                                <Link to="/account" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all">
                                    <User size={16} />
                                    <span>Account</span>
                                </Link>
                                <button onClick={handleLogout} className='text-white/70 hover:text-white transition-colors' title='Logout' >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="text-xs font-bold uppercase tracking-widest border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Right Icon */}
                    <div className='lg:hidden'>
                        <Link to="/Cart" className="relative text-white">
                            <ShoppingBag size={24} />
                            {cartCount > 0 && (<span className='absolute -top-1 -right-1 bg-red-600 h-2 w-2 rounded-full'></span>)}
                        </Link>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl h-screen w-screen flex flex-col p-8"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <img src={logo} alt="logo" className="w-24" />
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex flex-col space-y-8">
                            {navItems.map((item, index) => (
                                <Link key={index} to={item.href} className="text-3xl font-light text-white uppercase tracking-widest hover:pl-2 transition-all">
                                    {item.label}
                                </Link>
                            ))}
                            <button onClick={() => setIsSearchOpen(true)} className="text-3xl font-light text-white uppercase tracking-widest text-left hover:pl-2 transition-all flex items-center gap-4">
                                <Search size={28} /> Search
                            </button>
                            <div className="h-px w-full bg-white/10 my-4"></div>
                            {isLoggedIn ? (
                                <div className='flex flex-col space-y-6'>
                                    <Link to="/account" className="text-xl font-medium text-white uppercase tracking-widest flex items-center gap-3">
                                        <LogOut size={24} /> My Account 
                                    </Link>
                                    <button onClick={handleLogout} className='text-xl font-medium text-red-500 uppercase tracking-widest flex items-center gap-3 text-left'>
                                        <LogOut size={24} /> Logout
                                    </button>
                                </div>
                                
                            ) : (
                                <Link to="/login" className="text-xl font-medium text-white uppercase tracking-widest">
                                    Login / Register
                                </Link>
                            )}
                        </div>
                        <div className="mt-auto text-white/40 text-xs tracking-widest uppercase">
                            &copy; 2025 Highfashion
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Drawer */}
            <AnimatePresence>
                {isSearchOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50' 
                            onClick={() => setIsSearchOpen(false)} 
                        />
                        <motion.div 
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className='fixed right-0 top-0 h-full w-full sm:w-125 bg-white z-60 shadow-2xl'
                        >
                            <SearchModalContent setIsSearchOpen={setIsSearchOpen} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default NavBar;