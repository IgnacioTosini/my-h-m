/* import React, { useState, useEffect, useContext } from 'react';
import { DarkModeContext } from '../../context/DarkModeContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../FireBaseEcommerce/database';

const ImageGallery = () => {
    const [products, setProducts] = useState([]);
      // Se utiliza el hook useContext para acceder al valor de "darkMode" dentro del contexto "DarkModeContext"
    const { darkMode } = useContext(DarkModeContext);

    useEffect(() => {
        const getProducts = async () => {
            const productsCollection = collection(db, "products");
            const productsDocsRef = await getDocs(productsCollection);
            const productDocs = productsDocsRef.docs;
            const products = productDocs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setProducts(products);
        }
        getProducts();
    }, []);

    return (
        <div className={`containerCarousel3d ${darkMode ? "modo-oscuro" : ""}`}>
            <h2 className="carousel__title">Ultimos Productos</h2>
            <div className="carousel3d">
                {products.map((product, index) => (
                    <div key={index} className="containerImg" style={{ '--i': index, '--img': `url(${product.imageURL})` }}></div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery; */

import React, { useState, useEffect, useContext } from 'react';
import { DarkModeContext } from '../../context/DarkModeContext';
import productsData from '../FireBaseEcommerce/productos.json';

const ImageGallery = () => {
    const [products, setProducts] = useState([]);

    // Se utiliza el hook useContext para acceder al valor de "darkMode" dentro del contexto "DarkModeContext"
    const { darkMode } = useContext(DarkModeContext);

    useEffect(() => {
        setProducts(productsData.products);
    }, []);

    return (
        <div className={`containerCarousel3d ${darkMode ? "modo-oscuro" : ""}`}>
            <h2 className="carousel__title">Ultimos Productos</h2>
            <div className="carousel3d">
                {products.map((product, index) => (
                    <div key={index} className="containerImg" style={{ '--i': index, '--img': `url(${product.imageURL})` }}></div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;