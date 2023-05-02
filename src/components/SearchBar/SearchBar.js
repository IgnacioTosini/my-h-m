import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/DarkModeContext';
import { db } from '../FireBaseEcommerce/database';

function SearchBar() {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const { darkMode } = useContext(DarkModeContext);
    const searchContainerRef = useRef(null);

    function handleInputChange(event) {
        const { value } = event.target;
        setSearchInput(value);

        // Consulta productos que coincidan con la cadena de búsqueda en Firebase
        db.collection('products')
            .where('title', '>=', value)
            .where('title', '<=', value+'\uf8ff')
            .get()
            .then(snapshot => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Filtra los productos según la entrada actual del usuario:
                const regex = new RegExp(value, 'i');
                const filteredData = data.filter(product => regex.test(product.title));

                if (filteredData.length === 0) {
                    setNoResults(true);
                } else {
                    setNoResults(false);
                }
                setSearchResults(filteredData);
            });
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setSearchInput('');
                setSearchResults([]);
                setNoResults(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchContainerRef]);

    return (
        <div className='buscador buscador-container' ref={searchContainerRef}>
            <input
                type='text'
                placeholder='Buscar productos...'
                value={searchInput.length > 0 ? searchInput : ''}
                onChange={handleInputChange}
            />
            {searchInput.length > 0 &&
                <ul className={`${darkMode ? "modo-oscuro" : ""}`}>
                    {searchResults.map(product => (
                        <Link to={`/productDetailViewLink/${product.id}`} key={product.id}>
                            <li className='product-item'>
                                <img src={product.image} alt={`${product.title}`} className='product-image' />
                                <div className='product-info'>
                                    <h3>{product.title}</h3>
                                </div>
                            </li>
                        </Link>
                    ))}
                    {noResults && (
                        <li className='no-results'>Producto no encontrado</li>
                    )}
                </ul>
            }
        </div>
    );
}

export default SearchBar;
