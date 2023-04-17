import React from "react";

const Banner = ({ modoOscuro }) => {
  return (
    <div className={`banner ${modoOscuro ? "modo-oscuro" : ""}`}>
      <p className="banner-text">¡Envío gratuito en todos los pedidos!</p>
    </div>
  );
};

export default Banner;
