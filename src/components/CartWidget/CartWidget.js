import Cart from './assets/cart.svg';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const CartWidget = () => {
    const { cart } = useContext(CartContext);
    return (
        <div className='containerCart'>
            <img src={Cart} alt="cart-widget" className='cart'></img>
            <div className='totalProduct'>{cart.reduce((total, item) => total + item.quantity, 0)}</div>
        </div>
    )
}

export default CartWidget;