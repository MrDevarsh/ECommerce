import React, { useEffect, useState } from 'react'
import Item from '../Components/Item/Item'
import Cart from '../Components/Cart/Cart'
import Payment from './Payment'
import CustomLoader from './CustomLoader'
import useSession from '../Hooks/useSession'

const Home = () => {

  // session check
  const sessionId = useSession();

  // const redirectToHome = () => {
  //   window.location.href = '/';
  // };

  // useEffect(() => {
  //   if (!sessionId) {
  //     redirectToHome();
  //   }
  // }, [sessionId]);

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowLoader(false);
    }, 2000); // 2 seconds loader

    return () => {
      clearTimeout(timeoutId);
    };
  }, []); 

  return (
    <div>
      {showLoader ? (
        <CustomLoader />
      ) : (
        <Item/>
      )}
    </div>
  )
}

export default Home