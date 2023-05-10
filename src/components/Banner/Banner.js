import React, { useContext } from "react";
import { DarkModeContext } from '../../context/DarkModeContext';
import { Link } from "react-router-dom";

const Banner = () => {
  const { darkMode } = useContext(DarkModeContext);
  const handleLinkClick = (event) => {
    if (!event.ctrlKey || !event.shiftKey) {
      // Si no se mantienen presionadas ambas teclas, no navegamos a /productmanagementpage
      event.preventDefault();
    }
  };
  return (
    <div className={`banner ${darkMode ? "modo-oscuro" : ""}`}>
      <p className="banner-text">¡Envío gratuito en todos los pedidos</p>
      <Link to={'/productmanagementpage'} onClick={handleLinkClick}><p className="link">!</p></Link>
    </div>
  );
};

export default Banner;
