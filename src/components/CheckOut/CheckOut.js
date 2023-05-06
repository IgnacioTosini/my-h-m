import { useState, useContext } from "react";
import { db } from "../FireBaseEcommerce/database";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { CartContext } from "../../context/CartContext";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { DarkModeContext } from '../../context/DarkModeContext';

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState("");
    const { darkMode } = useContext(DarkModeContext);
    const { cart, getTotalPrice, clearCart } = useContext(CartContext);
    const createOrder = async ({ name, phone, email }) => {
        setLoading(true);

        try {
            // Creamos la orden
            const order = {
                buyer: { name, phone, email },
                items: cart,
                total: getTotalPrice(),
                date: new Date(),
            };
            const orderCollection = collection(db, "orders");
            const docRef = await addDoc(orderCollection, order);
            setOrderId(docRef.id);

            for (const item of cart) {
                const productId = item.id;
                if (productId) {
                    const productRef = doc(db, "products", productId);
                    try {
                        // Espera a que se recupere la información del producto
                        const response = await getDoc(productRef);
                        const data = response.data();
                        const productAdapted = { ...data, id: response.id };
                        // Actualiza el stock del producto adaptado
                        await updateDoc(productRef, {
                            stock: productAdapted.stock - item.quantity,
                        });
                    } catch (error) {
                        console.error("Error actualizando stock:", error);
                    }
                }
            }

            clearCart();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h1 className={`loading ${darkMode ? "modo-oscuro" : ''}`}>Se está generando su orden...</h1>;
    }

    if (orderId) {
        return <h1 className={`success ${darkMode ? "modo-oscuro" : ''}`}>El id de su orden es: {orderId}</h1>;
    }

    return <CheckoutForm onConfirm={createOrder} />;
};

export default Checkout;
