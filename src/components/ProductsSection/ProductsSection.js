import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from '../../context/DarkModeContext';
import { db } from '../FireBaseEcommerce/database'; // importamos db
import { getDocs, collection } from "firebase/firestore";

const ProductsSection = () => {
  // Obtenemos el valor de darkMode desde el contexto de DarkModeContext
  const { darkMode } = useContext(DarkModeContext);

  // Definimos un estado "products" para almacenar los productos obtenidos desde la API
  const [products, setProducts] = useState([]);

  // Utilizamos useEffect para obtener los productos desde la API y almacenarlos en el estado "products"
  useEffect(() => {
    const getProducts = async () => {
      const productsCollection = collection(db, "products");
      const productsDocsRef = await getDocs(productsCollection);
      const productDocs = productsDocsRef.docs;
      const products = productDocs.map((doc) => ({...doc.data(), id: doc.id }));
      setProducts(products);
    }
    getProducts();
  }, []);

  // Devolvemos una sección que muestra los productos obtenidos
  return (
    <div className={`products-section ${darkMode ? "modo-oscuro" : ""}`}>
      {products.map((product) => (
        <div className="product" key={product.id}>
          <img src={product.imageURL} alt={product.title} />
          <h2>{product.title}</h2>
          <p className="price">${parseFloat(product.price).toFixed(2)}</p>
          <Link to={`/productDetailViewLink/${product.id}`}>
            <button>Mostrar descripción</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductsSection;
