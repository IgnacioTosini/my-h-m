import React, { useContext } from 'react';
import { DarkModeContext } from '../../context/DarkModeContext';

const ModoOscuro = () => {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

    return (
        <button
            className={`modo-oscuro-toggle ${darkMode ? "modo-oscuro" : ""}`}
            onClick={toggleDarkMode}
        >
            <span></span>
        </button>
    );
};

export default ModoOscuro;
