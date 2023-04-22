import { useContext } from 'react';
import { DarkModeContext } from '../../context/DarkModeContext';

const ItemListContainer = ({greeting}) => {
    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className={`container ${darkMode ? "modo-oscuro" : ""}`}>
            <h1>{greeting}</h1>
        </div>
    )
}

export default ItemListContainer;