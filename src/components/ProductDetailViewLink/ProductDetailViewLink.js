import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';
import { CartContext } from '../../context/CartContext';
/* import RatingBar from '../RatingBar/RatingBar'; */
import { DarkModeContext } from '../../context/DarkModeContext';
import ShareButton from '../ShareButton/ShareButton';
import { db } from '../FireBaseEcommerce/database'; // importamos db
import { getDoc, doc } from "firebase/firestore";

const ProductDetailViewLink = () => {
  // Se importan los contextos
  const { darkMode } = useContext(DarkModeContext);
  const { id } = useParams();

  // Definición de estados del componente
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1);
  /* const [rating, setRating] = useState(0); */

  // Funciones del contexto CartContext
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
        {/* Mostrar un spinner para indicar que la aplicación está cargando */}
        <img src="../img/logoE-commerce_.png" alt="Loading" />
      </div>
    )
  }
  const handleOnAdd = (quantity) => {
    // Agrega artículos al carrito utilizando el contexto CartContext
    setQuantity(quantity);

    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.imageURL
    }

    addItem(item, quantity)
  }

  /*   const handleRatingChange = (newRating) => {
      // Actualiza el estado "rating" según la puntuación seleccionada
      setRating(newRating);
    }; */
  console.log(product.id)

  return (
    // Renderiza la información del producto, incluyendo la imagen, título, descripción, precio,
    // contador de artículos y barra de puntuación. También enlaza para compartir el producto.
    <div className={`product-details ${darkMode ? "modo-oscuro" : ''}`}>
      <img
        className="product-details__image"
        src={product.imageURL}
        alt={product.title} />
      <div className="product-details__info">
        <h1 className="product-details__title">{product.title}</h1>
        <div className="product-details__description">
          {product.description}
          {/* <div className='containerRating'>
          <RatingBar rating={rating} onRatingChange={handleRatingChange} />
          <p className='rate'>({product.rating.rate})</p>
          </div> */}
        </div>
        <div className="product-details__price-container">
          <p className="product-details__price">Precio: </p>
          <span className="product-details__value"> ${product.price}</span>
        </div>
        <div>
          {
            quantity > 0 ? (
              <ItemCount
                initial={1}
                stock={product.stock}
                onAdd={handleOnAdd} />
            ) : null
          }
        </div>
        {/* <ShareButton url={`https://hym.netlify.app/productDetailViewLink/${product.id}`} /> */}
      </div>
    </div>
  );
};

export default ProductDetailViewLink;
