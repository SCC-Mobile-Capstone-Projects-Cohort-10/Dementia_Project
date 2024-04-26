// SharedStateContext.js
import React, { createContext, useState } from 'react';

const SharedStateContext = createContext();

 export const SharedStateProvider = ({ children }) => {
   const [sharedState, setSharedState] = useState([0,1,2,3]);

  return (
    <SharedStateContext.Provider value={{ sharedState, setSharedState }}>
       {children}
     </SharedStateContext.Provider>
  );
 };

export default SharedStateContext;
