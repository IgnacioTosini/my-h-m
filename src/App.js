import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Importar componentes
import AboutUs from './components/AboutUs/AboutUs';
import AddProductForm from './components/AddProductForm/AddProductForm';
import Banner from './components/Banner/Banner';
import Cart from './components/Cart/Cart';
import CheckOut from './components/CheckOut/CheckOut';
import EditProductForm from './components/EditProductForm/EditProductForm';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import NavBar from './components/NavBar/NavBar';
import ProductDetailViewLink from './components/ProductDetailViewLink/ProductDetailViewLink';
import ProductManagementPage from './components/ProductManagementPage/ProductManagementPage';
import ProductsSection from "./components/ProductsSection/ProductsSection";
import SearchProductForm from './components/SearchProductForm/SearchProductForm';
import ViewProduct from './components/ViewProduct/ViewProduct';

// Importar proveedores de contexto
import { CartProvider } from './context/CartContext';
import { DarkModeProvider } from './context/DarkModeContext';
import { DarkModeContext } from './context/DarkModeContext';

// Importar hojas de estilo
import '../src/css/style.css';

function App() {
  // Definir estado para la pantalla de carga
  const [isLoading, setIsLoading] = useState(true);

  // Obtener y aplicar el estado del "modo oscuro" desde el proveedor de contexto
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    // Establecer un temporizador para ocultar la pantalla de carga después de 1.5 segundos
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <DarkModeProvider>
      {/* Aplicar el modo oscuro globalmente */}
      <div className={`App ${darkMode ? "dark-mode" : ''}`}>
        {/* Mostrar pantalla de carga si isLoading es verdadero */}
        {isLoading ? (
          <div className="loading-screen">
            {/* Mostrar un spinner para indicar que la aplicación está cargando */}
            <img src="../img/logoE-commerce_.png" alt="Loading" />
          </div>
        ) : (
          <BrowserRouter>
            {/* Proporcionar contexto compartido para el carrito de compras */}
            <CartProvider>
              <NavBar />
              <Banner />
              <ItemListContainer />
              <Routes>
                {/* Establecer rutas para diferentes componentes */}
                <Route exact path='/' element={<Home />}></Route>
                <Route exact path='/aboutUs' element={<AboutUs />}></Route>
                <Route exact path='/addproductform' element={<AddProductForm />}></Route>
                <Route exact path='/cart' element={<Cart />}></Route>
                <Route exact path='/checkout' element={<CheckOut />}></Route>
                <Route exact path='/editproductform/:id' element={<EditProductForm />}></Route>
                <Route exact path='/productDetailViewLink/:id' element={<ProductDetailViewLink />}></Route>
                <Route exact path='/productmanagementpage' element={<ProductManagementPage />}></Route>
                <Route exact path='/productsSection' element={<ProductsSection />}></Route>
                <Route exact path='/searchproductform' element={<SearchProductForm />}></Route>
                <Route exact path='/viewproduct' element={<ViewProduct />}></Route>
                {/* Manejar rutas inválidas */}
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
