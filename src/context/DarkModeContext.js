import React, { createContext, useState, useEffect } from 'react'

// Creamos el contexto
const DarkModeContext = createContext({
    darkMode: false,
    setDarkMode: () => { },
    toggleDarkMode: () => { }
});

// Creamos el provider que va a encerrar la App
const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    useEffect(() => {
        const currentHour = new Date().getHours();
    
        if (currentHour >= 19 || currentHour < 8) {
          setDarkMode(true);
        }
      }, []);

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}

export { DarkModeContext, DarkModeProvider };
