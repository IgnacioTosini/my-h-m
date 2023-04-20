import { createContext, useCallback, useState } from "react";

export const CartContext = createContext({
    cart: []
})

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addItem = (item, quantity) => {
        if (!isInCart(item.id)) {
            setCart(prev => [...prev, { ...item, quantity }]);
        } else {
            console.error('El producto ya fue agregado');
        }
    };

    const removeItem = (itemId) => {
        const cartUpdated = cart.filter(prod => prod.id !== itemId);
        setCart(cartUpdated);
    };

    const clearCart = () => {
        setCart([]);
    };

    const isInCart = (itemId) => {
        return cart.some(prod => prod.id === itemId);
    };

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

    const getTotalPrice = () => {
        const totalPrice = cart.reduce((total, prod) => total + prod.price * prod.quantity, 0);
        return totalPrice.toFixed(2);
    };

    const checkout = useCallback(() => {
        // Se podría implementar aquí la lógica para procesar el pago
        alert('Pago exitoso');
        clearCart();
    }, []);

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, increaseQuantity, decreaseQuantity, getTotalPrice, checkout }}>
            {children}
        </CartContext.Provider>
    )
}
