// import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import View from "./components/View";
import Add from "./components/Admin/Add";
import AdminView from "./components/Admin/AdminView";
import Cart from "./components/User/cart";
import Details from "./components/User/Details";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/add"}>Add Product</Link>
          </li>
          <li>
            <Link to={"/all-products"}>Uesr All Products</Link>
          </li>
          <li>
            <Link to={"/admin-products"}>Admin All Products</Link>
          </li>
          <li>
            <Link to={"/cart"}>Cart</Link>
          </li>
        </ul>
      </nav>
      <br />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/all-products" element={<View />} />
        <Route path="/admin-products" element={<AdminView />} />
        <Route path="/admin-products" element={<AdminView />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/product-details/:id' element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
