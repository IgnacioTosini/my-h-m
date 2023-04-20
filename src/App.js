import React, { useState, useEffect } from 'react';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Banner from './components/Banner/Banner';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ProductsSection from "./components/ProductsSection/ProductsSection";
import ProductDetailViewLink from './components/ProductDetailViewLink/ProductDetailViewLink';
import Footer from './components/Footer/Footer';
import Cart from './components/Cart/Cart';
import '../src/css/style.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);

  useEffect(() => {
    // obténgo la hora actual del sistema.
    const horaActual = new Date().getHours();

    // si la hora actual es mayor o igual a las 20 (8pm), se activa el modo oscuro.
    if (horaActual >= 19 || horaActual < 8) {
      setModoOscuro(true);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div className={`App ${modoOscuro ? "modo-oscuro" : ''}`}>
      {isLoading ? (
        <div className="pantallaDeCarga">
          <img src="./img/logoE-commerce.png" alt="Cargando" />
        </div>
      ) : (
        <BrowserRouter>
        <CartProvider>
          <NavBar modoOscuro={modoOscuro} setModoOscuro={setModoOscuro} />
          <Banner modoOscuro={modoOscuro} />
          <ItemListContainer />
          <Routes>
            <Route exact path='/' element={<Home modoOscuro={modoOscuro} />}></Route>
            <Route exact path='/productsSection' element={<ProductsSection modoOscuro={modoOscuro} />}></Route>
            <Route exact path='/productDetailViewLink/:id' element={<ProductDetailViewLink modoOscuro={modoOscuro} />}></Route>
            <Route exact path='/cart' element={<Cart modoOscuro={modoOscuro} />}></Route>
            <Route exact path='*' element={<h1>404-NOT-FOUND</h1>}></Route>
          </Routes>
          <Footer />
          </CartProvider>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
