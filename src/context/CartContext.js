import { createContext, useState } from "react";

// Creamos el contexto
export const CartContext = createContext({
    cart: []
});

// Creamos el proveedor que va a encerrar la App
export const CartProvider = ({ children }) => {
    // Creamos un estado llamado "cart" y un método "setCart"
    const [cart, setCart] = useState([]);

    // Definimos una función llamada "addItem" que agrega un producto al carrito
    const addItem = (item, quantity) => {
        // Verificamos si el producto ya está en el carrito antes de agregarlo
        if (!isInCart(item.id)) {
            // Si no está en el carrito, lo agregamos junto con su cantidad
            setCart(prev => [...prev, { ...item, quantity }]);
        } else {
            console.error('El producto ya fue agregado');
        }
    };

    // Definimos una función llamada "removeItem" que elimina un producto del carrito
    const removeItem = (itemId) => {
        const cartUpdated = cart.filter(prod => prod.id !== itemId);
        setCart(cartUpdated);
    };

    // Definimos una función llamada "clearCart" que vacía todo el carrito
    const clearCart = () => {
        setCart([]);
    };

    // Definimos una función llamada "isInCart" que verifica si un producto ya está en el carrito
    const isInCart = (itemId) => {
        return cart.some(prod => prod.id === itemId);
    };

    // Definimos una función llamada "increaseQuantity" que aumenta la cantidad de un producto en el carrito
    const increaseQuantity = (itemId) => {
        const newCart = cart.map(prod => {
            if (prod.id === itemId) {
                return { ...prod, quantity: prod.quantity + 1 };
            } else {
                return prod;
            }
        });
        setCart(newCart);
    };

    // Definimos una función llamada "decreaseQuantity" que disminuye la cantidad de un producto en el carrito
    const decreaseQuantity = (itemId) => {
        const newCart = cart.map(prod => {
            if (prod.id === itemId) {
                return { ...prod, quantity: prod.quantity - 1 };
            } else {
                return prod;
            }
        }).filter(prod => prod.quantity > 0);
        setCart(newCart);
    };

    // Definimos una función llamada "getTotalPrice" que calcula el precio total del carrito
    const getTotalPrice = () => {
        const totalPrice = cart.reduce((total, prod) => total + prod.price * prod.quantity, 0);
        return totalPrice.toFixed(2);
    };

    // Devolvemos el proveedor de contexto con las funciones necesarias para manejar el carrito
    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, increaseQuantity, decreaseQuantity, getTotalPrice }}>
            {children}
        </CartContext.Provider>
    )
};
