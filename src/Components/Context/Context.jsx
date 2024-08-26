// AuthContext.js
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [cart,setCart] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      if (authToken) {
        // Decodificar el token para obtener el rol
        try {
          const decodedToken = jwtDecode(authToken);
          const role = decodedToken.role;

          if (role) {
            // Guardar el rol en el localStorage
            localStorage.setItem('role', role);

          } else {
          }
        } catch (error) {
        }

        // Hacer la solicitud para obtener los datos del usuario
        const response = await fetch('https://gaiavet-back.onrender.com/me', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = await response.json();
        setUser(data);
      }
    };

    fetchUser();
  }, [authToken]);


  return (
    <AuthContext.Provider value={{ authToken, user, setAuthToken,cart,setCart }}>
      {children}
    </AuthContext.Provider>
  );
};
