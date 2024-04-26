import React, { createContext, useState } from 'react';

export const ChangeIntoDarkMode =  createContext() 

export const ThemeProviderIntoDarkMode = ({ children }) => {
    const [dark,setDark] = useState(false)
    
const changeIntoDark = ()=>{
    setDark((prev)=>!prev)
}

  return (
        <ChangeIntoDarkMode.Provider value={{dark,changeIntoDark}} >
            {children}
        </ChangeIntoDarkMode.Provider>
  );
}