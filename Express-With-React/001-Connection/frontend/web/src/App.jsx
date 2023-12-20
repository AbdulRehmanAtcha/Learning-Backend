// import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Add from "./components/Add";
import View from "./components/View";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/add"}>Add User</Link>
          </li>
          <li>
            <Link to={"/all-users"}>All Users</Link>
          </li>
        </ul>
      </nav>
      <br />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/all-users" element={<View />} />
      </Routes>
    </>
  );
}

export default App;
