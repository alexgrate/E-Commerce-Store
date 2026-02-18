import React from 'react';
import { Instagram, Facebook } from 'lucide-react';

import logo from '../../assets/Header-Logo-White_d109eaee-14e4-40a0-94e3-1fc856375f6a.svg'


const Footer = () => {
    return (
        <footer className="bg-black text-white py-12 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="col-span-1">
            <a href="/" >
                <img src={logo} alt="logo" width={100} height={22} />
            </a>
            
            <p className="text-gray-400 text-sm my-4">
                At High Fashion By J.O.I., we believe that fashion is an expression of individuality and artistry.
            </p>
            
            <div className="mb-8 flex space-x-2">
                <a href="#" aria-label="Instagram">

                <span className="text-white hover:text-pink-500 transition duration-300">
                    <Instagram size={18} />
                </span>

                </a>

                <a href="#" aria-label="Instagram">

                <span className="text-white hover:text-pink-500 transition duration-300">
                    <Facebook size={18} />
                </span>
                
                </a>

            </div>

            <p className="text-white font-semibold mb-2">
                Operating hours: Monday - Saturday (<span className="text-yellow-400">10am - 8pm</span>) Sunday (<span className="text-yellow-400">12pm - 6pm</span>)
            </p>
            <p className="text-gray-400 text-sm mb-4">
                SHOP 38/39, AARON'S LEXKI MALL, ADMIRALTY WAY, LAGOS, NIGERIA
            </p>
            <a href="#" className="text-sm border-b border-white pb-1 hover:text-gray-400 transition duration-300">
                GET DIRECTIONS
            </a>
            </div>
            
            <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4 tracking-wider font-display">
                QUICK LINK
            </h3>
            <ul className="space-y-2">
                {['HOME', 'ABOUT', 'CONTACT', 'FAQ'].map((link) => (
                <li key={link}>
                    <a href={`/${link.toLowerCase()}`} className="text-gray-400 text-sm hover:text-white transition duration-300">
                    {link}
                    </a>
                </li>
                ))}
            </ul>
            </div>

            <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4 tracking-wider font-display">
                SHOP
            </h3>
            <ul className="space-y-2">
                <li>
                <a href="/shop" className="text-gray-400 text-sm hover:text-white transition duration-300">
                    SHOP ALL
                </a>
                </li>
            </ul>
            </div>
            
            <div className="col-span-1 md:col-span-4 lg:col-span-1 mt-6 md:mt-0">
            <h3 className="text-white font-semibold mb-4 tracking-wider font-display">
                GET 10% OFF YOUR NEXT ORDER
            </h3>
            <p className="text-gray-400 text-xs mb-4 italic">
                *BY SIGNING UP, YOU AGREE TO RECEIVE EMAILS ABOUT HIGHFASHION AND OUR OTHER <a href="#" className="underline hover:text-white">TERMS</a>.
            </p>
            

            <form className="relative">
                <input 
                type="email"
                placeholder="Email"
                aria-label="Email subscription"
                className="w-full bg-black border-b border-white text-white py-2 focus:outline-none focus:border-yellow-400 transition duration-300"
                />
                <button 
                type="submit" 
                aria-label="Subscribe"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white hover:text-yellow-400 transition duration-300"
                >
                <span className="text-xl">→</span>
                </button>
            </form>
            </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6 text-center">
            <p className="text-gray-500 text-xs">
            © 2025 High Fashion by J.O.I., All Rights Reserved
            </p>
        </div>
        </footer>
    );
};

export default Footer;