import React, { useContext, useEffect, useState } from 'react';
import Item from '../Components/Item/Item';
import axios from 'axios';
import CustomLoader from './CustomLoader';
import useSession from '../Hooks/useSession';
import { AuthContext } from '../Context/AuthContext';

const Home = () => {
  const sessionId = useSession();
  const { accessToken, updateTokenData } = useContext(AuthContext);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      login();
      setShowLoader(false);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []); 

  const login = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_BASE_URL + '/api/token/', {});
      const newToken = response.data;
      console.log("New Token: ", newToken);
      updateTokenData(newToken);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      {showLoader ? (
        <CustomLoader />
      ) : (
        <Item />
      )}
    </div>
  );
};

export default Home;
