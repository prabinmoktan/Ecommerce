import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/index";
import Products from "./pages/Products/Products";
import AddProducts from "./pages/AddProducts/AddProducts";
import EditProducts from "./pages/EditProducts/EditProducts";
import Login from "./pages/(auth)/login/Login";
import Register from "./pages/(auth)/Register/Register";
import { useSelector } from "react-redux";
import { isLogged } from "./pages/(auth)/AuthSlice/Auth.slice";
import NotFound from "./pages/NotFound/NotFound";
import Users from "./pages/Users/Users";
import SidebarLayout from "./Layout/Sidebarlayout";

function App() {

  const isAuthenticated = useSelector(isLogged);

  return (
    <>
      <Routes>
        <Route path="/admin">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<SidebarLayout />}>
          <Route path="" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="products" element={isAuthenticated ? <Products /> : <Navigate to="/admin/login" />} />
          <Route path="products/addProducts" element={isAuthenticated ? <AddProducts /> : <Navigate to="/admin/login" />} />
          <Route path="products/editProducts/:id" element={isAuthenticated ? <EditProducts /> : <Navigate to="/login" />} />
          <Route path="Users" element={isAuthenticated ? <Users /> : <Navigate to="/login" />} />

          </Route>
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
