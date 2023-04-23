import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/DarkModeContext';

function SearchBar() {
    // Define los estados iniciales usando `useState`:
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const { darkMode } = useContext(DarkModeContext);
    // Crea una referencia que se adjunta al elemento raíz del componente:
    const searchContainerRef = useRef(null);

    // Maneja la entrada de texto en la barra de búsqueda y llama a la API Fakestore para obtener productos coincidentes:
    function handleInputChange(event) {
        const { value } = event.target;
        setSearchInput(value);
        // Consulta productos que coincidan con la cadena de búsqueda
        fetch(`https://fakestoreapi.com/products?title_like=${value}`)
            .then(response => response.json())
            .then(data => {
                // Filtra los productos según la entrada actual del usuario:
                const regex = new RegExp(value, 'i');
                const filteredData = data.filter(product => regex.test(product.title));
                // Establece el estado de `noResults` según si hay o no resultados coincidentes:
                if (filteredData.length === 0) {
                    setNoResults(true);
                } else {
                    setNoResults(false);
                }
                // Actualiza el estado de `searchResults` con los productos filtrados:
                setSearchResults(filteredData);
            });
    }

    // Maneja los clics fuera del contenedor de búsqueda:
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                // Borra la entrada de búsqueda y los resultados de búsqueda:
                setSearchInput('');
                setSearchResults([]);
                setNoResults(false);
            }
        }
        // Agrega el controlador de eventos para detectar clics fuera del contenedor de búsqueda:
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Limpia el controlador de eventos al desmontar el componente:
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchContainerRef]);

    // Renderiza el componente:
    return (
        <div className='buscador buscador-container' ref={searchContainerRef}>
            <input
                type='text'
                placeholder='Buscar productos...'
                value={searchInput.length > 0 ? searchInput : ''}
                onChange={handleInputChange}
            />
            {/* Renderiza resultados coincidentes debajo de la barra de búsqueda: */}
            {searchInput.length > 0 &&
                <ul className={`${darkMode ? "modo-oscuro" : ""}`}>
                    {searchResults.map(product => (
                        // Muestra el enlace a la página de detalles del producto:
                        <Link to={`/productDetailViewLink/${product.id}`}>
                            <li key={product.id} className='product-item'>
                                {/* Muestra una imagen y el título del producto: */}
                                <img src={product.image} alt={`${product.title}`} className='product-image' />
                                <div className='product-info'>
                                    <h3>{product.title}</h3>
                                </div>
                            </li>
                        </Link>
                    ))}
                    {/* Si no hay resultados coincidentes, muestra un mensaje de "Producto no encontrado": */}
                    {noResults && (
                        <li className='no-results'>Producto no encontrado</li>
                    )}
                </ul>
            }
        </div>
    );
}

export default SearchBar;
