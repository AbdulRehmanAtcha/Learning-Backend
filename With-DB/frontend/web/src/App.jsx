// import "./App.css";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./components/Home";
import View from "./components/View";
import Add from "./components/Admin/Add";
import AdminView from "./components/Admin/AdminView";
import MyCart from "./components/User/Cart";
import Details from "./components/User/Details";
import Edit from "./components/Admin/Edit";
import Register from "./components/User/Register";
import { useEffect, useState } from "react";

function App() {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    const cookie = document.cookie.split("=")[1];
    if (cookie) {
      setLogin(true);
    }
  }, []);
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/all-products"}>Uesr All Products</NavLink>
          </li>
          {login ? (
            <>
              <li>
                <Link to={"/add"}>Add Product</Link>
              </li>
              <li>
                <Link to={"/admin-products"}>Admin All Products</Link>
              </li>
            </>
          ) : null}
          <li>
            <NavLink to={"/cart"}>Cart</NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to={"/register"}>Login</NavLink>
          </li>
        </ul>
      </nav>
      <br />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<Add />} />
        <Route path="/all-products" element={<View />} />
        <Route path="/admin-products" element={<AdminView />} />
        <Route path="/edit-product/:id" element={<Edit />} />
        <Route path="/cart" element={<MyCart />} />
        <Route path="/product-details/:id" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
