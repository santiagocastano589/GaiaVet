// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (authToken) {
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
    <AuthContext.Provider value={{ authToken, user, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};
