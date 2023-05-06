import React, { useContext } from "react";
import { DarkModeContext } from '../../context/DarkModeContext';
import { Link } from "react-router-dom";


const Banner = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`banner ${darkMode ? "modo-oscuro" : ""}`}>
      <p className="banner-text">¡Envío gratuito en todos los pedidos</p>
      <Link to={'/productmanagementpage'}><p className="link">!</p></Link>
    </div>
  );
};

export default Banner;
