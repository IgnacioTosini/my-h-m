import React, { useState, useContext } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../FireBaseEcommerce/database';
import ViewProduct from '../ViewProduct/ViewProduct';
import { DarkModeContext } from '../../context/DarkModeContext';

const SearchProductForm = () => {
    const [productId, setProductId] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const { darkMode } = useContext(DarkModeContext);
    async function handleSearch(event) {
        event.preventDefault();

        // Borra el estado de products para ocultar la lista de todos los productos
        setProducts([]);

        // Crea una consulta para buscar documentos en la colección de productos donde el valor del campo de ID del producto sea igual al valor ingresado por el usuario
        const productsRef = collection(db, "products");
        console.log(productsRef)
        const q = query(productsRef, where("id", "==", parseInt(productId)));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Si se encuentra un documento que coincida con la consulta, actualiza el estado local con los datos del producto
            const productData = querySnapshot.docs[0].data();
            setSelectedProduct(productData);
        } else {
            alert("El producto no existe.");
            setSelectedProduct(null);
            setProductId('');
        }
    }
    async function handleShowAll(event) {
        event.preventDefault();

        setSelectedProduct(null);

        // Obtiene todos los documentos de la colección de productos
        const productsRef = collection(db, "products");
        const querySnapshot = await getDocs(productsRef);

        // Actualiza el estado local con los datos de todos los productos
        const productsData = querySnapshot.docs.map(doc => doc.data());
        setProducts(productsData);
    }

    return (
        <>
            <form className={`search-product-form ${darkMode ? "modo-oscuro" : ""}`} onSubmit={handleSearch}>
                <label>
                    Id del producto:
                    <input type="text" value={productId} onChange={(event) => setProductId(event.target.value)} />
                </label>
                <button type="submit">Buscar</button>
                <button type="button" onClick={handleShowAll}>Mostrar todos</button>
            </form>
            {selectedProduct && <ViewProduct product={selectedProduct} />}
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <ViewProduct product={product} />
                    </li>
                ))}
            </ul>
        </>
    );
}

export default SearchProductForm;