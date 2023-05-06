import React, { useState, useEffect, useContext } from 'react';
import { addDoc, collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { DarkModeContext } from '../../context/DarkModeContext';
import { db } from '../FireBaseEcommerce/database';

function AddProductForm() {
    const { darkMode } = useContext(DarkModeContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [id, setId] = useState(0);
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [imageURL, setImageURL] = useState('');
    const [productId, setProductId] = useState('');

    function handleCategoryIdChange(event) {
        setCategoryId(event.target.value);
    }

    function handleIdChange(event) {
        setId(parseInt(event.target.value));
    }
    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function handleStockChange(event) {
        setStock(parseInt(event.target.value));
    }

    function handlePriceChange(event) {
        setPrice(parseFloat(event.target.value));
    }

    function handleImageURLChange(event) {
        setImageURL(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        // Verifica primero si el producto ya existe en la base de datos
        const productCollection = collection(db, "products");
        const duplicateQuery = query(productCollection,
            where('categoryId', '==', categoryId),
            where('id', '==', id),
        );

        const duplicateDocs = await getDocs(duplicateQuery);
        if (!duplicateDocs.empty) {
            alert('Este producto ya existe!');
            return;
        }

        // Agrupa todos los campos del formulario en un objeto 'product'
        const product = {
            categoryId,
            id,
            title,
            description,
            price,
            stock,
            imageURL
        };

        // Agrega el objeto 'product' como un nuevo documento en la colección 'products'
        addDoc(productCollection, product)
            .then(() => {
                console.log('Producto agregado correctamente.');
                // Reinicia el estado local para limpiar el formulario
                setTitle('');
                setDescription('');
                setPrice(0);
                setStock(0);
                setId(0);
                setCategoryId('');
                setImageURL('');
            })
            .catch((error) => {
                console.error('Error al agregar el producto: ', error);
            });
    }

    useEffect(() => {
        async function loadProductDetails() {
            const productRef = doc(db, "products", productId);
            const productSnapshot = await getDoc(productRef);
            const productData = productSnapshot.data();
            setTitle(productData.title);
            setDescription(productData.description);
            setPrice(productData.price);
            setStock(productData.stock);
            setId(productData.id);
            setCategoryId(productData.categoryId);
            setImageURL(productData.imageURL);
        }

        if (productId) {
            loadProductDetails();
        }
    }, [productId]);

    return (
        <div className={`add-product-form-container ${darkMode ? "modo-oscuro" : ''}`}>
            <form className="add-product-form" onSubmit={handleSubmit}>
                <label>
                    CategoryId:
                    <input type="text" placeholder='CategoryId' value={categoryId} onChange={handleCategoryIdChange} required />
                </label>
                <label>
                    Id:
                    <input type="number" min="0" value={id} onChange={handleIdChange} required />
                </label>
                <label>
                    Título:
                    <input type="text" placeholder='Title' value={title} onChange={handleTitleChange} required />
                </label>
                <label>
                    Descripción:
                    <textarea placeholder='Description' value={description} onChange={handleDescriptionChange} required />
                </label>
                <label>
                    Precio:
                    <input type="number" step="0.01" min="0" value={price} onChange={handlePriceChange} required />
                </label>
                <label>
                    Stock:
                    <input type="number" min="0" value={stock} onChange={handleStockChange} required />
                </label>
                <label>
                    URL de la imagen:
                    <input type="url" value={imageURL} onChange={handleImageURLChange} required />
                </label>
                <button type="submit">Agregar producto</button>
            </form>
        </div>
    );
}

export default AddProductForm;
