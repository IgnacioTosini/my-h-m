import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';
import { CartContext } from '../../context/CartContext';

const ProductDetailViewLink = ({ modoOscuro }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => response.json())
      .then(setProduct)
      .catch(console.error);
  }, [id]);

  if (!product) {
    return <div>Cargando...</div>;
  }

  const handleOnAdd = (quantity) => {
    setQuantity(quantity);
    console.log(product)
    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image
    }
    addItem(item, quantity)
  }

  return (
    <div className={`product-details ${modoOscuro ? "modo-oscuro" : ''}`}>
      <img
        className="product-details__image"
        src={product.image}
        alt={product.title}
      />
      <div className="product-details__info">
        <h1 className="product-details__title">{product.title}</h1>
        <p className="product-details__description">{product.description}</p>
        <div className="product-details__price-container">
          <p className="product-details__price">Precio:</p>
          <span className="product-details__currency">$</span>
          <span className="product-details__value">{product.price}</span>
        </div>
        <div>
          {
            quantity > 0 ? (
              <ItemCount
                initial={1}
                stock={10}
                onAdd={handleOnAdd} />
            ) : null
          }
        </div>
      </div>
    </div>
  );
};

export default ProductDetailViewLink;
