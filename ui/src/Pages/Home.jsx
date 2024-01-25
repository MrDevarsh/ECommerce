import React, { useEffect, useState } from 'react'
import Item from '../Components/Item/Item'
import Cart from '../Components/Cart/Cart'
import Payment from './Payment'
import CustomLoader from './CustomLoader'

const Home = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowLoader(false);
    }, 2000); // Set the duration in milliseconds (2 seconds in this example)

    return () => {
      clearTimeout(timeoutId);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

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