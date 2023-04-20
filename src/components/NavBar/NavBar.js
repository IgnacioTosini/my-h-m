import React, { useState } from 'react';
import CartWidget from '../CartWidget/CartWidget';
import DarkMode from '../DarkMode/DarkMode';
import { Link } from 'react-router-dom';

function NavBar({ modoOscuro, setModoOscuro }) {
  const [menu, setMenu] = useState(false);
  const [abierto, setAbierto] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  }

  function handleClick() {
    setAbierto(!abierto);
  }

  return (
    <header className={`Cabecera ${menu ? 'Active' : ''} ${modoOscuro ? "modo-oscuro" : ""}`}>
      <div className='containerBuscador'>
        <DarkMode modoOscuro={modoOscuro} setModoOscuro={setModoOscuro} />
        <form className='buscador'>
          <input type="text" placeholder="Buscar productos..." />
          <button className='submit' type="submit">Buscar</button>
        </form>
        <Link to={'/cart'}><CartWidget /></Link>
      </div>
      <button onClick={() => { toggleMenu(); handleClick(); }} className={`Cabecera-button ${abierto ? "menuAbierto" : ''}`}>
        <i className={`fa ${menu ? 'fa-times' : 'fa-bars'}`}></i>
      </button>
      <nav className={`Cabecera-nav ${menu ? 'isActive' : ''}`}>
        <ul className="Cabecera-ul">
          <li className="Cabecera-li"><Link to={'/'}>Inicio</Link></li>
          <li className="Cabecera-li"><Link to='/productsSection'>Productos</Link></li>
          <li className="Cabecera-li"><a href="#a">Categoría</a></li>
          <li className="Cabecera-li"><a href="#a">Categoría</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default NavBar;
