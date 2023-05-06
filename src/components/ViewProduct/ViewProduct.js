import React, { useContext } from 'react';
import { DarkModeContext } from '../../context/DarkModeContext';

const ViewProduct = ({ product }) => {
    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className={`view-product ${darkMode ? "modo-oscuro" : ""}`}>
            <div className="view-product__image-container">
                <img className="view-product__image" src={product.imageURL} alt={product.title} />
            </div>
            <div className="view-product__info-container">
                <h2 className="view-product__title">{product.title}</h2>
                <p className="view-product__id">ID: {product.id}</p>
                <p className="view-product__description">{product.description}</p>
                <div className="view-product__details-container">
                    <p className={`view-product__stock ${product.stock <= 10 ? 'view-product__stock--low' : ''}`}>Stock: {product.stock}</p>
                    <p className="view-product__price">${product.price}</p>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;
