import React, { useState, useEffect } from 'react';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../FireBaseEcommerce/database';

function AddProductForm() {
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
        setId(event.target.value);
    }
    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function handleStockChange(event) {
        setStock(event.target.value);
    }

    function handlePriceChange(event) {
        setPrice(parseFloat(event.target.value));
    }

    function handleImageURLChange(event) {
        setImageURL(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

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
        const productCollection = collection(db, "products");
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

    async function handleModify(event) {
        event.preventDefault();

        // Recupera el objeto 'product' existente para actualizarlo
        const productRef = doc(db, "products", productId);
        const productSnapshot = await getDoc(productRef);
        const existingProduct = productSnapshot.data();

        // Actualiza los campos de los estados que se han modificado
        if (title !== '') {
            existingProduct.title = title;
        }
        if (description !== '') {
            existingProduct.description = description;
        }
        if (categoryId !== '') {
            existingProduct.categoryId = categoryId;
        }
        if (id !== '') {
            existingProduct.id = id;
        }
        if (price !== '') {
            existingProduct.price = price;
        }
        if (stock !== '') {
            existingProduct.stock = stock;
        }
        if (imageURL !== '') {
            existingProduct.imageURL = imageURL;
        }

        // Actualiza el objeto 'product' en la colección 'products'
        await setDoc(productRef, existingProduct);

        console.log('Producto modificado correctamente.');

        // Reinicia el estado local para limpiar el formulario
        setTitle('');
        setDescription('');
        setPrice(0);
        setStock(0);
        setId(0);
        setCategoryId('');
        setImageURL('');
        setProductId('');
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
        <div className="add-product-form-container">
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
            {productId && (
                <form className="modify-product-form" onSubmit={handleModify}>
                    <label>
                        ID del producto a modificar:
                        <input type="text" placeholder='ProductId' value={productId} onChange={(event) => setProductId(event.target.value)} />
                    </label>
                    <button type="submit">Modificar producto</button>
                </form>
            )}
        </div>
    );
}

export default AddProductForm;
