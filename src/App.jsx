import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Componentes/Home";
import Navbar from "./Componentes/Navbar/Navbar";
import DetailsPlatos from "./Componentes/DetailsPlatos/DetailsPlatos";
import { CartProvider } from "./Componentes/CartContext/CartContext";
import Cart from "./Componentes/Cart/Cart";


function App() {
  

  return (
    <>
    <CartProvider>
    <Router>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home/> } />
    <Route path="/plato/:id" element={ <DetailsPlatos/>} />
    <Route path="/carrito" element={<Cart/>} />
    </Routes>
    </Router>
    </CartProvider>
    </>
      
      
  )
}

export default App
