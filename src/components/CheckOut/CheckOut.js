import { useState, useContext } from "react";
import { db } from "../FireBaseEcommerce/database";
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { CartContext } from '../../context/CartContext';
import { collection, addDoc, Timestamp, doc, updateDoc } from 'firebase/firestore';

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState('');
    const { cart, getTotalPrice, clearCart } = useContext(CartContext);

    const createOrder = async ({ name, phone, email }) => {
        setLoading(true)
        try {
            // Creamos la orden
            const order = {
                buyer: { name, phone, email },
                items: cart,
                total: getTotalPrice(),
                date: new Date()
            }
            const orderCollection = collection(db, "orders");
            const docRef = await addDoc(orderCollection, order);
            setOrderId(docRef.id);
            // Actualizamos la cantidad de stock en Firebase
            const productsRef = doc(db, "products", cart);
            for (const item of cart) {
                updateDoc(productsRef, {
                    stock: item.product.stock - item.quantity // Restamos la cantidad comprada al stock actual
                });
            }
            clearCart();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <h1 className="loading">Se está generando su orden...</h1>
    }

    if (orderId) {
        return <h1 className="success">El id de su orden es: {orderId}</h1>
    }

    return (
        <CheckoutForm onConfirm={createOrder} />
    );
}

export default Checkout;
