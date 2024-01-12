/* import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';
import ShareButton from '../ShareButton/ShareButton';
import { db } from '../FireBaseEcommerce/database'; // importamos db
import { CartContext } from '../../context/CartContext';
import { DarkModeContext } from '../../context/DarkModeContext';
import { getDoc, doc } from "firebase/firestore";

const ProductDetailViewLink = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useContext(CartContext);

  useEffect(() => {
    setLoading(true)
    const docRef = doc(db, 'products', id)
    getDoc(docRef)
      .then(response => {
        const data = response.data()
        const productAdapted = { ...data, id: response.id }
        setProduct(productAdapted)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  if (product === null && loading === true) {
    return (
      <div className="loading-screen">
        <img src="../img/logoE-commerce_.png" alt="Loading" />
      </div>
    )
  }

  const handleOnAdd = (quantity) => {
    setQuantity(quantity);

    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.imageURL
    }

    addItem(item, quantity)
  }

  const stockAvailable = product.stock > 0;

  return (
    <div className={`product-details ${darkMode ? "modo-oscuro" : ''}`}>
      <img
        className="product-details__image"
        src={product.imageURL}
        alt={product.title} />
      <div className="product-details__info">
        <h1 className="product-details__title">{product.title}</h1>
        <div className="product-details__description">
          {product.description}
        </div>
        <div className="product-details__price-container">
          <p className="product-details__price">Precio: </p>
          <span className="product-details__value"> ${product.price}</span>
        </div>
        <div>
          {
            stockAvailable && quantity > 0 ?
              <ItemCount
                initial={1}
                stock={product.stock}
                onAdd={handleOnAdd} />
              :
              <p>No hay stock disponible</p>
          }
        </div>
        <ShareButton url={`https://hymreact.vercel.app/productDetailViewLink/${product.id}`} />
      </div>
    </div>
  );
};

export default ProductDetailViewLink;
 */

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';
import ShareButton from '../ShareButton/ShareButton';
import productsData from '../FireBaseEcommerce/productos.json';
import { CartContext } from '../../context/CartContext';
import { DarkModeContext } from '../../context/DarkModeContext';

const ProductDetailViewLink = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);

    // Buscar el producto en la matriz de productos
    const foundProduct = productsData.products.find((item) => item.id === parseInt(id, 10));

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      console.log("Producto no encontrado");
    }

    setLoading(false);
  }, [id]);

  if (product === null && loading === true) {
    return (
      <div className="loading-screen">
        <img src="../img/logoE-commerce_.png" alt="Loading" />
      </div>
    );
  }

  const handleOnAdd = (quantity) => {
    setQuantity(quantity);

    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.imageURL
    }

    addItem(item, quantity);
  }

  const stockAvailable = product.stock > 0;

  return (
    <div className={`product-details ${darkMode ? "modo-oscuro" : ''}`}>
      <img
        className="product-details__image"
        src={product.imageURL}
        alt={product.title} />
      <div className="product-details__info">
        <h1 className="product-details__title">{product.title}</h1>
        <div className="product-details__description">
          {product.description}
        </div>
        <div className="product-details__price-container">
          <p className="product-details__price">Precio: </p>
          <span className="product-details__value"> ${product.price}</span>
        </div>
        <div>
          {
            stockAvailable && quantity > 0 ?
              <ItemCount
                initial={1}
                stock={product.stock}
                onAdd={handleOnAdd} />
              :
              <p>No hay stock disponible</p>
          }
        </div>
        <ShareButton url={`https://hymreact.vercel.app/productDetailViewLink/${product.id}`} />
      </div>
    </div>
  );
};

export default ProductDetailViewLink;