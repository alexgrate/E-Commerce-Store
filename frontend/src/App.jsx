import { useState, useEffect } from 'react'
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
import FAQPage from './components/FAQ/FaQPage'
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

  return (
    <BrowserRouter>
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




























// const App = () => {
//   const [products, setProducts] = useState('');

//   useEffect(() => {
//     fetch('http://127.0.0.1:8000/api/products/')
//       .then(response => response.json())
//       .then(data => setProducts(data))
//       .catch(error => console.error(error))
//   }, []);

//   return (
//     <div className='min-h-screen bg-gray-100 text-gray-800'>
//       <h1>Product List</h1>      

//     </div>
//   )
// }

// export default App

