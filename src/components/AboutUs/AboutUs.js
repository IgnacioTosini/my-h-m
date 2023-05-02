import React, { useContext } from 'react';
import { DarkModeContext } from '../../context/DarkModeContext';
import Card from '../Card/Card';

const AboutUs = () => {
    const { darkMode } = useContext(DarkModeContext);

    return (
        <>
            <div className={`containerAbout ${darkMode ? "modo-oscuro" : ''}`}>
                <Card />
                <div className="about-us">
                    <h2 className="title">Sobre Nosotros</h2>
                    <p className="text">Somos una empresa innovadora dedicada a proporcionar soluciones creativas y eficaces para nuestros clientes.</p>
                    <p className="text">Nuestro equipo está formado por profesionales experimentados en diseño gráfico, desarrollo web, marketing digital y consultoría empresarial.</p>
                    <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, minima maiores aspernatur fugit mollitia commodi?</p>
                </div>
            </div>
        </>
    );
}

export default AboutUs;
