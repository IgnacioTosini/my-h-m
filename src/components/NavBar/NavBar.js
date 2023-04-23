import React, { useState, useContext } from 'react';
import CartWidget from '../CartWidget/CartWidget';
import DarkMode from '../DarkMode/DarkMode';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/DarkModeContext';
import SearchBar from '../SearchBar/SearchBar';

function NavBar() {

  const { darkMode } = useContext(DarkModeContext); // Obtenemos el valor actual del modo oscuro desde el contexto
  const [menu, setMenu] = useState(false); // Creamos un estado local para el menú y lo inicializamos en falso
  const [abierto, setAbierto] = useState(false); // Creamos un estado local para la apertura y lo inicializamos en falso

  const toggleMenu = () => {
    setMenu(!menu); // Función para alternar la visibilidad del menú
  }

  function handleClick() {
    setAbierto(!abierto); // Función para alternar si el menú está abierto o cerrado
  }

  return (
    <header className={`Cabecera ${menu ? 'Active' : ''} ${darkMode ? "modo-oscuro" : ""}`}>
      <div className='containerBuscador'>
        <DarkMode />
        <SearchBar />
        <Link to={'/cart'}><CartWidget /></Link>
        {/* Enlace al carrito con el componente CartWidget */}
      </div>
      <button onClick={() => { toggleMenu(); handleClick(); }} className={`Cabecera-button ${abierto ? "menuAbierto" : ''}`}>
        <i className={`fa ${menu ? 'fa-times' : 'fa-bars'}`}></i>
      </button>
      <nav className={`Cabecera-nav ${menu ? 'isActive' : ''}`}>
        {/* Menú de navegación con clases condicionales basadas en el estado */}
        <ul className="Cabecera-ul">
          <li className="Cabecera-li"><Link to={'/'}>Inicio</Link></li>
          <li className="Cabecera-li"><Link to='/productsSection'>Productos</Link></li>
          <li className="Cabecera-li"><Link to={'/aboutUs'}>Nosotros</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default NavBar;