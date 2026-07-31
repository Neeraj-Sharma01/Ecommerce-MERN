import {BrowserRouter,Routes,Route} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import MyOrders from "./pages/MyOrders";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/cart" element={
          <PrivateRoute>
          <Cart/>
          </PrivateRoute>
          } />

        <Route path="/checkout" element={<PrivateRoute>
          <Checkout/>
          </PrivateRoute>} />

        <Route path="/orders" element={<PrivateRoute>
          <MyOrders/>
          </PrivateRoute>} />

        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
