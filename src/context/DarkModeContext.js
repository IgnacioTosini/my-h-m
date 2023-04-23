import React, { createContext, useState, useEffect } from 'react'

// Creamos el contexto
const DarkModeContext = createContext({
    darkMode: false,
    setDarkMode: () => { },
    toggleDarkMode: () => { }
});

// Creamos el provider que va a encerrar la App
const DarkModeProvider = ({ children }) => {
    // Creamos un estado llamado "darkMode" y un método "setDarkMode" para actualizar ese estado
    const [darkMode, setDarkMode] = useState(false);

    // Creamos una función llamada "toggleDarkMode" que cambia el valor de "darkMode" cada vez que es invocada
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    // Utilizamos la función "useEffect" para cambiar el valor de "darkMode" automáticamente si es de noche
    useEffect(() => {
        const currentHour = new Date().getHours(); // Obtenemos la hora actual del día

        if (currentHour >= 19 || currentHour < 8) { // Si es de noche, establecemos el modo oscuro
            setDarkMode(true);
        }
    }, []);

    // Devolvemos el proveedor de contexto con los valores "darkMode", "setDarkMode" y "toggleDarkMode"
    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}

export { DarkModeContext, DarkModeProvider };
