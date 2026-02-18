import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                {/* 404 */}
                <h1 className="text-9xl font-black text-black mb-4">404</h1>
                
                {/* Message */}
                <p className="text-xs font-bold uppercase tracking-[0.4em] text-gray-400 mb-4">
                    Page Not Found
                </p>
                <p className="text-sm text-gray-600 mb-12 leading-relaxed">
                    The page you're looking for doesn't exist or has been moved. 
                    Let's get you back on track.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 bg-black text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
                    >
                        <Home size={16} />
                        Go Home
                    </Link>
                    <Link
                        to="/shop"
                        className="flex items-center justify-center gap-2 border border-black text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                    >
                        <Search size={16} />
                        Shop Now
                    </Link>
                </div>

                {/* Popular Links */}
                <div className="mt-16 pt-8 border-t border-gray-200">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                        Popular Pages
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { to: '/shop', label: 'Shop' },
                            { to: '/about', label: 'About' },
                            { to: '/contact', label: 'Contact' },
                            { to: '/faq', label: 'FAQ' },
                        ].map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="text-sm text-gray-600 hover:text-black underline"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;