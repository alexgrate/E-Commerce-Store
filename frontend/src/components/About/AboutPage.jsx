import React from 'react';
import { Link } from 'react-router-dom';

import about01 from '../../assets/jol_01.avif'
import about02 from '../../assets/jol_02.avif'

import user01 from '../../assets/user01.webp'
import user02 from '../../assets/user02.webp'

import abouthero from '../../assets/20250927_HIGHFASHION_TJSAW_DAY031415_1.webp'

const AboutPage = () => {
    return (
        <div className="bg-white min-h-screen">

            {/* Hero Section */}
            <div className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <img
                    src={abouthero}
                    alt="HF Brand"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="relative z-20 text-center text-white px-4">
                    <p className="text-xs font-bold uppercase tracking-[0.4em] text-gray-400 mb-6">
                        Est. 2020
                    </p>
                    <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-none mb-8">
                        The House<br />of HF
                    </h1>
                    <p className="text-sm font-medium uppercase tracking-widest text-gray-300 max-w-md mx-auto">
                        Crafting bold statements through uncompromising design
                    </p>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
                    <span className="text-xs uppercase tracking-widest text-gray-400">Scroll</span>
                    <div className="w-px h-12 bg-gray-600 animate-pulse"></div>
                </div>
            </div>

            {/* Our Story Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.4em] text-gray-400 mb-6">
                            Our Story
                        </p>
                        <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-tight mb-8">
                            Born From The Streets
                        </h2>
                        <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
                            <p>
                                HF was born from a desire to create clothing that speaks without words. 
                                Founded in Lagos, Nigeria, we set out to redefine what African luxury 
                                streetwear could look like — unapologetic, bold, and deeply rooted in 
                                our culture.
                            </p>
                            <p>
                                Every piece we create is a testament to the energy of our city. The hustle, 
                                the creativity, the resilience — it's all woven into the fabric of everything 
                                we make. We don't follow trends. We set them.
                            </p>
                            <p>
                                From our embossed leather jackets to our signature graphic tees, each 
                                garment is crafted with intention. Quality is not an option — it's the 
                                standard.
                            </p>
                        </div>
                    </div>

                    {/* Image Stack */}
                    <div className="relative h-150">
                        <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gray-100 overflow-hidden">
                            <img
                                src={about01}
                                alt="HF Collection"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gray-200 overflow-hidden border-4 border-white">
                            <img
                                src={about02}
                                alt="HF Craftsmanship"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section - Full Width Dark */}
            <div className="bg-black text-white py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <p className="text-xs font-bold uppercase tracking-[0.4em] text-gray-500 mb-4">
                            What We Stand For
                        </p>
                        <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter">
                            Our Values
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {[
                            {
                                number: '01',
                                title: 'Authenticity',
                                description: 'We never compromise on who we are. Every design is an honest expression of our identity, our culture, and our vision.'
                            },
                            {
                                number: '02',
                                title: 'Craftsmanship',
                                description: 'From the stitching to the sourcing, we obsess over every detail. Premium materials, premium execution — every single time.'
                            },
                            {
                                number: '03',
                                title: 'Community',
                                description: 'HF is more than a brand. It\'s a movement built by and for the people who dare to be different in a world of sameness.'
                            }
                        ].map((value) => (
                            <div key={value.number} className="border-t border-gray-800 pt-8">
                                <p className="text-5xl font-black text-gray-800 mb-6">{value.number}</p>
                                <h3 className="text-lg font-bold uppercase tracking-widest mb-4">{value.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {[
                        { number: '2020', label: 'Year Founded' },
                        { number: '5K+', label: 'Happy Customers' },
                        { number: '100+', label: 'Unique Pieces' },
                        { number: '1', label: 'Vision' },
                    ].map((stat) => (
                        <div key={stat.label} className="border-b-2 border-black pb-8">
                            <p className="text-5xl font-black uppercase tracking-tighter mb-2">{stat.number}</p>
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Team Section */}
            <div className="bg-gray-50 py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <p className="text-xs font-bold uppercase tracking-[0.4em] text-gray-400 mb-4">
                            The People Behind HF
                        </p>
                        <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter">
                            Meet The Team
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: 'Rahman Jago', role: 'Founder & Creative Director', image: user01 },
                            { name: 'Rahman Jago', role: 'Head of Design', image: user02 },
                            { name: 'Rahman Jago', role: 'Brand Director', image: user01 },
                        ].map((member) => (
                            <div key={member.name} className="group">
                                <div className="aspect-square bg-gray-200 overflow-hidden mb-6">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                                <h3 className="font-bold uppercase tracking-widest text-sm">{member.name}</h3>
                                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-black text-white py-32 text-center px-4">
                <p className="text-xs font-bold uppercase tracking-[0.4em] text-gray-500 mb-6">
                    Ready to Wear
                </p>
                <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter mb-8">
                    Wear The Movement
                </h2>
                <p className="text-gray-400 text-sm max-w-md mx-auto mb-12">
                    Explore our latest collection and find your next statement piece.
                </p>
                <Link
                    to="/Shop"
                    className="inline-block bg-white text-black px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                >
                    Shop Now
                </Link>
            </div>
        </div>
    );
};

export default AboutPage;