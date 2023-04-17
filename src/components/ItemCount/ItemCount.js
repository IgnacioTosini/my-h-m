import useItemCount from './useItemCount';

const ItemCount = ({ stock, initial, onAdd }) => {
  const { quantity, increment, decrement } = useItemCount({ stock, initial });

    return (
    <div className="ItemCount">
      <div className="ItemCount-controls">
        <button className="ItemCount-button" onClick={decrement}>-</button>
        <h4 className="ItemCount-quantity">{quantity}</h4>
        <button className="ItemCount-button" onClick={increment}>+</button>
      </div>
      <div className="ItemCount-add-to-cart">
        <button className="add-to-cart" onClick={() => onAdd(quantity)} disabled={!stock}>
          Agregar al carrito
        </button>
      </div>
    </div>
  )
}

export default ItemCount;
