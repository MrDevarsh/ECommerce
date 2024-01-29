import React from 'react'
import QRCode from 'react-qr-code';

const QrCode = ({amount}) => {

  const value = 'upi://pay?pa=7016525736%40paytm&cu=INR&am=' + amount;

  return (
    <QRCode value={value} size={128} />
  )
}

export default QrCode