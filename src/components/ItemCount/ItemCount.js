import useItemCount from './useItemCount';
import { Link } from 'react-router-dom';

const ItemCount = ({ stock, initial, onAdd }) => { // Definimos un componente llamado ItemCount que recibe tres props: stock, initial, onAdd
  const { quantity, increment, decrement } = useItemCount({ stock, initial }); // Utilizamos la función personalizada useItemCount para manejar el estado de cantidad

  return (
    <div className={`ItemCount`}>
      <div className={`ItemCount-controls`}>
        <button className="ItemCount-button" onClick={decrement}>-</button> {/* Botón para decrementar la cantidad seleccionada */}
        <h4 className="ItemCount-quantity">{quantity}</h4> {/* Muestra la cantidad actual seleccionada */}
        <button className="ItemCount-button" onClick={increment}>+</button> {/* Botón para incrementar la cantidad seleccionada */}
      </div>
      <div className="ItemCount-add-to-cart"> {/* Contiene el botón "Agregar al carrito" */}
        <Link to='/cart' > {/* Navega a la página del carrito */}
          <button className="add-to-cart" onClick={() => onAdd(quantity)} disabled={!stock}> {/* Botón "Agregar al carrito" que activa la función onAdd y desactiva si no hay stock disponible */}
            Agregar al carrito
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ItemCount;
