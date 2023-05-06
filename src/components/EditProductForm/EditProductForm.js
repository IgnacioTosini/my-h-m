import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../FireBaseEcommerce/database';

const EditProductForm = () => {
    const [product, setProduct] = useState(null);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [stock, setStock] = useState();
    const [imageURL, setImageURL] = useState();
    const { id } = useParams();

    useEffect(() => {
        const docRef = doc(db, 'products', id)
        console.log(docRef)
        getDoc(docRef)
            .then(response => {
                const data = response.data()
                console.log(data)
                const productAdapted = {...data, id: response.id }
                console.log(productAdapted)
                setProduct(productAdapted)
                setTitle(product.title)
                setDescription(product.description)
                setPrice(product.price)
                setStock(product.stock)
                setImageURL(product.imageURL)
            })
            .catch(error => {
                console.log(error)
            })
    })
    async function handleUpdate(event) {
        event.preventDefault();

        // Actualiza el documento del producto con los nuevos valores ingresados por el usuario
        const productRef = doc(db, "products", id);
        await setDoc(productRef, {
            title,
            description,
            price,
            stock,
            imageURL
        });

        alert("Producto actualizado.");
    }

    return (
        <form className="edit-product-form" onSubmit={handleUpdate}>
            <label>
                Título:
                <input type="text" value={title} placeholder={product?.title} onChange={(event) => setTitle(event.target.value)} />
            </label>
            <label>
                Descripción:
                <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} />
            </label>
            <label>
                Precio:
                <input type="number" value={price} onChange={(event) => setPrice(parseFloat(event.target.value))} />
            </label>
            <label>
                Stock:
                <input type="number" value={stock} onChange={(event) => setStock(parseInt(event.target.value))} />
            </label>
            <label>
                URL de la imagen:
                <input type="text" value={imageURL} onChange={(event) => setImageURL(event.target.value)} />
            </label>
            <button type="submit">Actualizar</button>
        </form>
    );
}

export default EditProductForm;