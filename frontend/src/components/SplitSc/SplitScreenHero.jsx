import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; 

import imageBG from '../../assets/20250927_HIGHFASHION_TJSAW_DAY031361_1.webp'

import Video from '../../assets/videos/video01.mp4'; 

const SplitScreenHero = () => {
    const [hoveredSide, setHoveredSide] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMouse = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', updateMouse);
        return () => window.removeEventListener('mousemove', updateMouse);
    }, []);

    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (custom) => ({
            opacity: 1,
            y: 0,
            transition: { delay: custom * 0.2, duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
        })
    };

    return (
        <div className="relative flex flex-col md:flex-row h-screen w-full bg-black overflow-hidden cursor-none">

            <motion.div
                className='fixed top-0 left-0 h-8 w-8 bg-white rounded-full mix-blend-difference z-50 pointer-events-none hidden md:block'
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: hoveredSide ? 2.5 : 1
                }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            />

            <motion.a
                href='/shop'
                className='relative w-full h-1/2 md:w-1/2 md:h-full block overflow-hidden'
                onMouseEnter={() => setHoveredSide('left')}
                onMouseLeave={() => setHoveredSide(null)}
            >
                <div
                    className={`absolute inset-0 z-20 bg-black transition-opacity duration-700 pointer-events-none
                    ${hoveredSide === 'right' ? 'opacity-60' : 'opacity-0'}`}
                />

                <motion.div
                    className='w-full h-full'
                    animate={{ scale: hoveredSide === 'left' ? 1.05 : 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    
                    <video 
                        className='w-full h-full object-cover' 
                        autoPlay 
                        muted 
                        loop 
                        playsInline 
                        src={Video} 
                    /> 
                </motion.div>

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10" />

                <motion.div
                    className="absolute bottom-8 left-6 md:bottom-16 md:left-12 z-30 text-white"
                    initial="hidden"
                    animate="visible"
                >
                    <div className="overflow-hidden">
                        <motion.h3
                            custom={1}
                            variants={textVariants}
                            className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-2 opacity-90"
                        >
                            New Releases
                        </motion.h3>
                    </div>

                    <div className="overflow-hidden">
                        <motion.div
                            custom={2}
                            variants={textVariants}
                            className="flex items-center gap-4" 
                        >
                            <span className="text-xl md:text-3xl font-serif italic tracking-wide">
                                Summer Drop
                            </span>

                            <motion.span
                                animate={{ x: hoveredSide === 'left' ? 10 : 0 }}
                                className="text-xl"
                            >
                                →
                            </motion.span>
                        </motion.div>
                    </div>
                </motion.div>


            </motion.a>

            <motion.a
                href='/shop'
                className='relative w-full h-1/2 md:w-1/2 md:h-full block overflow-hidden'
                onMouseEnter={() => setHoveredSide('right')}
                onMouseLeave={() => setHoveredSide(null)}
            >
                {/* Dimming Layer */}
                <div
                    className={`absolute inset-0 z-20 bg-black transition-opacity duration-700 pointer-events-none
                    ${hoveredSide === 'left' ? 'opacity-60' : 'opacity-0'}`}
                />

                <motion.div
                    className="w-full h-full"
                    animate={{ scale: hoveredSide === 'right' ? 1.05 : 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <img
                        src={imageBG}
                        alt="Collection"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10" />

                <motion.div
                    className="absolute bottom-8 left-6 md:bottom-16 md:left-12 z-30 text-white"
                    initial="hidden"
                    animate="visible"
                >

                    <div className="overflow-hidden">
                        <motion.h3
                            custom={1}
                            variants={textVariants}
                            className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-2 opacity-90"
                        >

                        </motion.h3>
                    </div>

                    <div className="overflow-hidden">
                        <motion.div
                            custom={2}
                            variants={textVariants}
                            className="flex items-center gap-4"
                        >
                            <span className="text-xl md:text-3xl font-serif italic tracking-wide">
                                Street & Utility
                            </span>

                            <motion.span
                                animate={{ x: hoveredSide === 'right' ? 10 : 0 }}
                                className="text-xl"
                            >
                                →
                            </motion.span>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.a>


        </div>
    );
};

export default SplitScreenHero;