import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { DarkModeContext } from '../../context/DarkModeContext';

function Cart() {
    const { cart, clearCart, removeItem, increaseQuantity, decreaseQuantity, getTotalPrice, checkout } = useContext(CartContext);
    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className={`cart-container ${darkMode ? "modo-oscuro" : ''}`}>
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
                                <button onClick={() => removeItem(item.id)}>Eliminar</button>
                                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                                <button onClick={() => increaseQuantity(item.id)}>+</button>
                            </div>
                        </div>
                    )) :
                    <p>No hay productos en el carrito.</p>
                }
            </div>
            <div className="cart-summary">
                <h2>Resumen del Carrito</h2>
                <div className="summary-item">
                    <div>Productos {cart.reduce((total, item) => total + item.quantity, 0)}</div>
                </div>
                <div className="summary-item">
                    <div>Total ${getTotalPrice()}</div>
                </div>
                <button onClick={() => { if (cart.length > 0) { clearCart(); } }}>Vaciar Carrito</button>
                <button onClick={() => { if (cart.length > 0) { checkout(); } }}>Pagar</button>
            </div>
        </div>
    );
}

export default Cart;
