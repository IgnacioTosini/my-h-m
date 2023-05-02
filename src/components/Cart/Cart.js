// Importación de los contextos React necesarios
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { DarkModeContext } from '../../context/DarkModeContext';
import { Link } from 'react-router-dom';

function Cart() {
    // Uso de useContext para obtener datos del contexto del carrito y del modo oscuro
    const { cart, clearCart, removeItem, increaseQuantity, decreaseQuantity, getTotalPrice } = useContext(CartContext);
    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className={`cart-container ${darkMode ? "modo-oscuro" : ''}`}>
            {/* Lista de productos en el carrito */}
            <div className="cart-list">
                {cart.length ?
                    cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <div>
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div>{item.title}</div>
                            <div>{item.quantity}</div>
                            <div>${(item.price * item.quantity).toFixed(2)}</div>
                            <div className='containerButtons'>
                                {/* Tres botones que permiten eliminar un producto del carrito, incrementar o disminuir su cantidad */}
                                <button onClick={() => removeItem(item.id)}>Eliminar</button>
                                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                                <button onClick={() => increaseQuantity(item.id)}>+</button>
                            </div>
                        </div>
                    )) :
                    // Mensaje que se muestra cuando no hay productos en el carrito
                    <p>No hay productos en el carrito.</p>
                }
            </div>

            {/* Resumen del carrito */}
            <div className="cart-summary">
                <h2>Resumen del Carrito</h2>
                <div className="summary-item">
                    {/* Mostrar el total de los productos en el carrito */}
                    <div>Productos {cart.reduce((total, item) => total + item.quantity, 0)}</div>
                </div>
                <div className="summary-item">
                    {/* Mostrar el precio total de los productos en el carrito */}
                    <div>Total ${getTotalPrice()}</div>
                </div>
                {/* Dos botones: uno para vaciar el carrito y otro para pagar */}
                <button onClick={() => { if (cart.length > 0) { clearCart(); } }}>Vaciar Carrito</button>
                <Link to={'/checkout'}>
                    <button onClick={(e) => {
                        if (cart.length > 0) {
                            // no hacer nada y dejar que el enlace navegue a /checkout
                        } else {
                            e.preventDefault();
                        }
                    }}>CheckOut</button>
                </Link>
            </div>
        </div>
    );
}

export default Cart;
