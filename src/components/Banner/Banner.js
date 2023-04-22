import React, { useContext } from "react";
import { DarkModeContext } from '../../context/DarkModeContext';


const Banner = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`banner ${darkMode ? "modo-oscuro" : ""}`}>
      <p className="banner-text">¡Envío gratuito en todos los pedidos!</p>
    </div>
  );
};

export default Banner;
