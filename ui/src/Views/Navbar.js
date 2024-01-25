import React from 'react'
import { Link } from 'react-router-dom'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  return (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/cart" className=''><ShoppingCartOutlinedIcon /></Link>
    </nav>

)
}

export default Navbar