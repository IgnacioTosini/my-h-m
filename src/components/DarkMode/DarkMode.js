import React from 'react';

const ModoOscuro = ({ modoOscuro, setModoOscuro }) => {
    const toggleModoOscuro = () => {
        setModoOscuro(!modoOscuro);
    };

    return (
        <button
            className={`modo-oscuro-toggle ${modoOscuro ? "modo-oscuro" : ""}`}
            onClick={toggleModoOscuro}
        >
            <span></span>
        </button>
    );
};

export default ModoOscuro;
