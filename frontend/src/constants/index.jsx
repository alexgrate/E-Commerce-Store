import { Search, ShoppingBag } from 'lucide-react'

import imageBg01 from '../assets/20250927_HIGHFASHION_TJSAW_DAY031415_1.webp'
import imageBg02 from '../assets/20250927_HIGHFASHION_TJSAW_DAY031305_1.webp'
import imageBg03 from '../assets/oct8_1.webp'
import imageBg04 from '../assets/IMG_7528.jpg'
import imageBg05 from '../assets/IMG_7232.webp'

import image011 from '../assets/productImages/7_1.webp'
import image012 from '../assets/productImages/8_2.webp'
import image013 from '../assets/productImages/10_2.webp'
import image014 from '../assets/productImages/11.webp'
import image015 from '../assets/productImages/12.webp'
import image016 from '../assets/productImages/14.webp'
import image017 from '../assets/productImages/HF_NOV_4.webp'
import image018 from '../assets/productImages/HFNOV3.webp'

import image021 from '../assets/productImages/hf_sept_21.webp'
import image022 from '../assets/productImages/hf_sept_22.webp'
import image023 from '../assets/productImages/hf_sept_51.webp'
import image024 from '../assets/productImages/HF_SEPT32.webp'
import image025 from '../assets/productImages/HF_SEPT37.webp'

import image031 from '../assets/productImages/HFSEPT46_2320b46a-74a0-49bd-aab5-f3da490a1c0b.webp'
import image032 from '../assets/productImages/HFSEPT67.webp'
import image033 from '../assets/productImages/hfsept26.webp'
import image034 from '../assets/productImages/hfsept27.webp'
import image035 from '../assets/productImages/hf_sept_193.webp'

import image041 from '../assets/productImages/hf_sept_4.webp'
import image042 from '../assets/productImages/HF_SEPT68.webp'
import image043 from '../assets/productImages/hfsept147.webp'
import image044 from '../assets/productImages/HF_SEPT42.webp'
import image045 from '../assets/productImages/hfsept130.webp'

import image051 from '../assets/productImages/HFSEPT16.webp'
import image052 from '../assets/productImages/hf_sept_168.webp'
import image053 from '../assets/productImages/hf_sept_187.webp'
import image054 from '../assets/productImages/hf_sept_165.webp'
import image055 from '../assets/productImages/HFSEPT17.webp'


import image061 from '../assets/productImages/CCC305CA-DCF8-444F-AC30-5CCB68B77FFF.webp'
import image062 from '../assets/productImages/B0BFFBF0-33BE-42DD-BA1C-7C3AB61E76E6.webp'
import image063 from '../assets/productImages/64FC5A21-5816-4E7F-9E5E-8D750FCB5D5F.webp'

import image071 from '../assets/productImages/HF_SEPT3.jpg'
import image072 from '../assets/productImages/hfsept176.jpg'
import image073 from '../assets/productImages/hfsept173.webp'
import image074 from '../assets/productImages/hfsept175.webp'
import image075 from '../assets/productImages/hfsept171.webp'

import image081 from '../assets/productImages/HF_SEPT1.webp'
import image082 from '../assets/productImages/hfsept177_1.webp'
import image083 from '../assets/productImages/hf_sept_180_1.webp'
import image084 from '../assets/productImages/hfsept172.webp'
import image085 from '../assets/productImages/HF_SEPT2.webp'




export const navItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href:"/Shop" },
    { label: "About", href:"/About" },
    { label: "Faq", href:"/faq" },
    { label: "Contact", href:"/Contact" },
]



export const heroSlides = [
    {
        bgImage: imageBg01,
    },

    {
        bgImage: imageBg02,
    },

    {
        bgImage : imageBg03,
    },

    {
        bgImage : imageBg04,
    },

    {
        bgImage : imageBg05,
    },
]

export const products = [
    {
        id: 1,
        name: "HF EMBROSSED LEATHER JACKET",
        price: "#1,600,000.00",
        oldPrice: "#2,000,000.00",
        inStock: true,
        colors: 2,
        img01: image011, 
        img02: image012, 
        img03: image013,
        img04: image014, 
        img05: image015, 
        img06: image016,
        img07: image017,
        img08: image018, 
        link: "/"
    },

    {
        id: 2,
        name: "HF REFLECTIVE TEE",
        price: "#320,000.00",
        oldPrice: "#350,000.00",
        inStock: true,
        colors: 3,
        img01: image021, 
        img02: image022, 
        img03: image023,
        img04: image024, 
        img05: image025, 
        link: "/"
    },

    {
        id: 3,
        name: "HF MESH LONGSLEEVE HOODIE",
        price: "#400,000.00",
        oldPrice: "#450,000.00",
        inStock: true,
        colors: 2,
        img01: image031, 
        img02: image032, 
        img03: image033,
        img04: image034, 
        img05: image035, 
        link: "/"
    },

    {
        id: 4,
        name: "HF SHORTSLEEVE POLO",
        price: "#480,000.00",
        oldPrice: "#500,000.00",
        inStock: true,
        colors: 3,
        img01: image041, 
        img02: image042, 
        img03: image043,
        img04: image044, 
        img05: image045, 
        link: "/"
    },

    {
        id: 5,
        name: "HF MESH LONGSLEEVE",
        price: "#320,000.00",
        oldPrice: "#350,000.00",
        inStock: true,
        colors: 2,
        img01: image051, 
        img02: image052, 
        img03: image053,
        img04: image054, 
        img05: image055, 
        link: "/"
    },

    {
        id: 6,
        name: "HF RECYCLED CAMO HAT",
        price: "#368,000.00",
        oldPrice: "#370,000.00",
        inStock: true,
        colors: 3,
        img01: image061, 
        img02: image062, 
        img03: image063,
        link: "/"
    },

    {
        id: 7,
        name: "HF CROC LEATHER TOP",
        price: "#1,200,000.00",
        colors: 3,
        img01: image071, 
        img02: image072, 
        img03: image073,
        img04: image074, 
        img05: image075,
        link: "/"
    },

    {
        id: 8,
        name: "HF CROC LEATHER PANTS",
        price: "#1,200,000.00",
        colors: 3,
        img01: image081, 
        img02: image082, 
        img03: image083,
        img04: image084, 
        img05: image085,
        link: "/"
    },

]