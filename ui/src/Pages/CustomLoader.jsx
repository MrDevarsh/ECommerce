import React from 'react'
import shoe from '../Components/Assets/shoe.gif';

const CustomLoader = () => {
  return (
    <>
        <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="position-absolute">
        <img
          src={shoe}
          alt="Transparent GIF"
          className="img-fluid"
        />
      </div>
    </div>
    </>
  )
}

export default CustomLoader