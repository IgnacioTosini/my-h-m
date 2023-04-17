import Cart from './assets/cart.svg';

const CartWidget = () => {
    return (
        <div className='container'>
            <img src={Cart} alt="cart-widget" className='cart'></img>
            0
        </div>
    )
}

export default CartWidget;