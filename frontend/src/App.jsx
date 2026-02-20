import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/NAV/Navbar'
import HeroSection from './components/HOME/HeroSection'
import SplitScreenHero from './components/SplitSc/SplitScreenHero'
import ProductList from './components/HOME/ProductList'
import ProductDetails from './components/ProductInfo/ProductDetails'
import CartPage from './components/Cart/CartPage'
import CheckoutPage from './components/Checkout/CheckoutPage'
import PrivateRouter from './components/PrivateRouting/PrivateRouter'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import UserProfilePage from './components/UserProfile/UserProfilePage'
import CollectionPage from './components/Collection/CollectionPage'
import AboutPage from './components/About/AboutPage'
import ContactPage from './components/Contact/ContactPage'
import FAQPage from './components/Faq/FaQPage'
import NotFoundPage from './constants/NotFoundPage'
import ScrollToTop from './constants/ScrollToTop'
import Footer from './components/Footer/Footer'

import PaymentVerifyPage from './components/PaymentVerify/PaymentVerifyPage'


const Home = () => {

  return (
      <>
      <HeroSection />
      <ProductList />
      <SplitScreenHero />
      </>
    )

}

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMouse = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', updateMouse)
    return () => window.removeEventListener('mousemove', updateMouse)
  }, [])


  return (
    <BrowserRouter>

      <motion.div
        className='fixed top-0 left-0 z-9999 pointer-events-none hidden md:block'
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1}}
      >
        <div className='h-8 w-8 rounded-full border border-white opacity-80' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-white' />

      </motion.div>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails/>} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/shop' element={<CollectionPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/faq' element={<FAQPage />} />
        <Route element={<PrivateRouter />}>
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/account' element={<UserProfilePage />} />
          <Route path='/payment/verify' element={<PaymentVerifyPage />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;