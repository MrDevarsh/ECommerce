// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Views/Home';
import Products from './Views/Products';
import Cart from './Views/Cart';

function App() {
  return (

    <Routes>
      <Route
        path='/'
        element = {<Home />}
      />

      <Route
        path='/products'
        element= {<Products />}
      />

      <Route
        path='/cart'
        element= {<Cart />}
      />

    </Routes>

  );
}

export default App;
