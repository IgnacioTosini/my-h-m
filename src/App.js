import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Banner from './components/Banner/Banner';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ProductsSection from "./components/ProductsSection/ProductsSection";
import ProductDetailViewLink from './components/ProductDetailViewLink/ProductDetailViewLink';
import Footer from './components/Footer/Footer';
import Cart from './components/Cart/Cart';
import { CartProvider } from './context/CartContext';
import { DarkModeProvider } from './context/DarkModeContext';
import { DarkModeContext } from './context/DarkModeContext';
import '../src/css/style.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <DarkModeProvider>
      <div className={`App ${darkMode ? "dark-mode" : ''}`}>
        {isLoading ? (
          <div className="loading-screen">
            <img src="my-app\public\img\logoE-commerce.png" alt="Loading" />
          </div>
        ) : (
          <BrowserRouter>
            <CartProvider>
              <NavBar />
              <Banner />
              <ItemListContainer />
              <Routes>
                <Route exact path='/' element={<Home />}></Route>
                <Route exact path='/productsSection' element={<ProductsSection />}></Route>
                <Route exact path='/productDetailViewLink/:id' element={<ProductDetailViewLink />}></Route>
                <Route exact path='/cart' element={<Cart />}></Route>
                <Route path='*' element={<h1>404-NOT-FOUND</h1>}></Route>
              </Routes>
              <Footer />
            </CartProvider>
          </BrowserRouter>
        )}
      </div>
    </DarkModeProvider>
  );
}

export default App;
