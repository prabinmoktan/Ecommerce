import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/index";
import Products from "./pages/Products/Products";
import Sidebar from "./Layout/Sidebar/Sidebar";
import AddProducts from "./pages/AddProducts/AddProducts";
import EditProducts from "./pages/EditProducts/EditProducts";
import Login from "./pages/(auth)/login/Login";
import Register from "./pages/(auth)/Register/Register";
import Navbar from "./Layout/Navbar/Navbar";

function App() {
  const location = useLocation();
  const noSidebar = ["/login", "/register"];
  const hideSidebar = !noSidebar.includes(location.pathname);
  return (
    <>
      <div className=" flex flex-col h-screen overflow-hidden">
        <div>{hideSidebar && <Navbar />}</div>
        <div className="flex">{hideSidebar && <Sidebar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/addProducts" element={<AddProducts />} />
          <Route path="/products/editProducts/:id" element={<EditProducts />} />
          {/* </Route> */}
        </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
