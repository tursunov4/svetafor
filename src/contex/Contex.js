import { createContext, useEffect, useState } from "react";


export const Rigister = createContext();


export const SignProvider = ({ children }) => {


  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem("token")));




  useEffect(() => {
    if (token) {
        sessionStorage.setItem("token", JSON.stringify(token));
    }
  }, [token]);
  return (
    <Rigister.Provider value={{ token,setToken }}>
      {children}
    </Rigister.Provider>
  );
};
