import useItemCount from './useItemCount';
import { Link } from 'react-router-dom';

const ItemCount = ({ stock, initial, onAdd }) => {
  const { quantity, increment, decrement } = useItemCount({ stock, initial });

  return (
    <div className={`ItemCount`}>
      <div className={`ItemCount-controls`}>
        <button className="ItemCount-button" onClick={decrement}>-</button>
        <h4 className="ItemCount-quantity">{quantity}</h4>
        <button className="ItemCount-button" onClick={increment}>+</button>
      </div>
      <div className="ItemCount-add-to-cart">
        <Link to='/cart' >
          <button className="add-to-cart" onClick={() => onAdd(quantity)} disabled={!stock}>
            Agregar al carrito
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ItemCount;
