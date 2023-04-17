import { useState } from 'react';

const useItemCount = ({ stock, initial }) => {
    const [quantity, setQuantity] = useState(initial);

    // Función para incrementar la cantidad
    const increment = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1);
        }
    };

    // Función para disminuir la cantidad
    const decrement = () => {
        if (quantity > initial) {
            setQuantity(quantity - 1);
        }
    };

    return { quantity, increment, decrement };
};

export default useItemCount;
