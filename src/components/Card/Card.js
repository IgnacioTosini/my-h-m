import React, { useContext } from 'react';
import { DarkModeContext } from '../../context/DarkModeContext';

function Card() {
    const { darkMode } = useContext(DarkModeContext);
    return (
        <div className={`card ${darkMode ? "modo-oscuro" : ''}`}>
            <div className="content">
                <span></span>
                <div className="imagenPresentacion">
                    <img src="../img/perfil.png" alt="Imagen de perfil" />
                </div>
                <h4>Ignacio Tosini</h4>
                <h6>Front-end Developer</h6>
                <p>
                    Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Dolor quae accusamus deserunt
                </p>
            </div>
            <div className="links">
                <a target="_blank" rel='noreferrer' href="https://www.facebook.com">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a target="_blank" rel='noreferrer' href="https://www.linkedin.com/in/ignacio-tosini/">
                    <i className="fab fa-linkedin"></i>
                </a>
                <a target="_blank" rel='noreferrer' href="https://github.com/IgnacioTosini?tab=repositories">
                    <i className="fab fa-github"></i>
                </a>
                <a target="_blank" rel='noreferrer' href="https://www.whatsapp.com/?lang=es">
                    <i className="fab fa-whatsapp"></i>
                </a>
            </div>
        </div>
    );
}

export default Card;
