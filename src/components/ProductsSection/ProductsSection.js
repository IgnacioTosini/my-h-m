import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from '../../context/DarkModeContext';

const ProductsSection = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className={`products-section ${darkMode ? "modo-oscuro" : ""}`}>
      {products.map((product) => (
        <div className="product" key={product.id}>
          <img src={product.image} alt={product.title} />
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
