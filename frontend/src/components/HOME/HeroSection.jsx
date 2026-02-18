import { useState, useEffect } from 'react'
import { heroSlides } from '../../constants'

const HeroSection = () => {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(interval)
    }, [])

    return (
        <section className='relative flex h-screen items-center justify-center overflow-hidden bg-black'>
            {heroSlides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === current ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    {/* UPGRADE 1: Subtly zooming image (Ken Burns Effect) */}
                    <img
                        src={slide.bgImage}
                        alt="Hero"
                        className={`w-full h-full object-cover transition-transform duration-6000 ease-linear ${
                            index === current ? 'scale-110' : 'scale-100'
                        }`}
                    />
                </div>
            ))}
            
            {/* Dark Gradient Overlay */}
            <div className='absolute inset-0 z-10 bg-linear-to-b from-transparent via-black/20 to-black'></div>

            <div className='relative z-20 flex h-screen flex-col justify-end items-center pb-20 w-full'>
                
                {/* UPGRADE 2: Floating Text Animation */}
                <div className="text-center mb-8 overflow-hidden">
                    <p className={`text-white text-xs tracking-[0.3em] uppercase mb-2 transition-all duration-1000 delay-300 ${
                        current >= 0 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}>
                        New Arrival
                    </p>
                    <h1 className="text-white font-display text-6xl md:text-8xl uppercase">
                        High Fashion
                    </h1>
                </div>

                <button className="relative overflow-hidden border border-white/30 bg-transparent text-white px-10 py-4 font-semibold text-sm uppercase tracking-widest transition-colors duration-500 hover:text-black before:absolute before:inset-0 before:z-0 before:bg-white before:origin-bottom before:scale-y-0 before:transition-transform before:duration-500 hover:before:scale-y-100 cursor-pointer">
                    <span className="relative z-10">Explore Collection</span>
                </button>

                {/* Pagination with Slide Numbers */}
                <div className="flex items-center space-x-6 z-10 mt-12">
                    <span className="text-white/50 text-xs font-mono">0{current + 1}</span>
                    <div className="flex space-x-3">
                        {heroSlides.map((_, index) => (
                            <div key={index} onClick={() => setCurrent(index)} className="relative flex items-center justify-center w-5 h-5 cursor-pointer">
                                <div className={`w-1 h-1 rounded-full transition-all ${index === current ? "bg-white scale-150" : "bg-white/30"}`} />
                                {index === current && (
                                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="1" strokeDasharray="62.8" strokeDashoffset="62.8" className="animate-slide-timer" />
                                    </svg>
                                )}
                            </div>
                        ))}
                    </div>
                    <span className="text-white/50 text-xs font-mono">0{heroSlides.length}</span>
                </div>
            </div>

            <style>{`
                @keyframes slide-timer {
                    from { stroke-dashoffset: 62.8; }
                    to { stroke-dashoffset: 0; }
                }
                .animate-slide-timer {
                    animation: slide-timer 5000ms linear forwards;
                }
            `}</style>
        </section>
    )
}

export default HeroSection