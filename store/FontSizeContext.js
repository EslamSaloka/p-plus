import React, { createContext, useContext, useState } from 'react';

// Create a context
const FontSizeContext = createContext();

// Create a provider component
export const FontSizeProvider = ({ children }) => {
    const [fontSizeGeneral, setfontSizeGeneral] = useState(0);
    const [fontSize, setFontSize] = useState(16); // Default font size
    const [fontSizeBig, setFontSizeBig] = useState(18); //For big Size
    const [fontSizeSmall, setFontSizeSmall] = useState(14) //For small font size
    const [fontSizeNormal, setFontSizeNormal] = useState(17); //For Normal font size of application
    const increaseFontSize = () => {setFontSize(prev => prev + 1);
                                    setFontSizeBig(prev => prev + 1);
                                    setFontSizeSmall(prev => prev + 1);
                                    setFontSizeNormal(prev => prev + 1); 
                                    setfontSizeGeneral(prev => prev+1);
    }
    const decreaseFontSize = () => {
        setFontSize(prev => prev - 1);
        setFontSizeBig(prev => prev - 1);
        setFontSizeSmall(prev => prev - 1);
        setFontSizeNormal(prev => prev -1);
        setfontSizeGeneral(prev => prev -1 );
    }

    return (
        <FontSizeContext.Provider value={{fontSizeGeneral,  fontSize, increaseFontSize, decreaseFontSize, fontSizeBig, fontSizeSmall, fontSizeNormal }}>
            {children}
        </FontSizeContext.Provider>
    );
};

// Custom hook to use the font size context
export const useFontSize = () => useContext(FontSizeContext);