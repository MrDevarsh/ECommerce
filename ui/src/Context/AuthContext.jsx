// AuthContext.js

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext({
    accessToken: '',
    updateTokenData: () => {},
  });

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [tokenExpiry, setTokenExpiry] = useState(null);


  const updateTokenData = (token) => {
    setAccessToken(token.access_token);
    setRefreshToken(token.refresh_token);
    setTokenExpiry(token.access_token_expiration);
    
  }

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(process.env.REACT_BASE_URL + '/api/token/refresh/', {
        refresh: refreshToken,
      });

      const newToken = response.data;

      updateTokenData(newToken);
    } catch (error) {
      console.error('Failed to refresh access token', error);
    }
  };

  // Check token expiry on mount and set up periodic checks
  useEffect(() => {
    const checkTokenExpiry = () => {
      if (tokenExpiry && new Date(tokenExpiry * 1000) < new Date()) {
        refreshAccessToken();
      }
    };

    checkTokenExpiry();

    const intervalId = setInterval(checkTokenExpiry, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, updateTokenData }}>
      {children}
    </AuthContext.Provider>
  );
};


export { AuthContext, AuthProvider };
