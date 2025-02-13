import  { useEffect } from 'react'
import {  Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import SidebarLayout from './admin/AdminLayout/Sidebarlayout'
import Home from './admin/Pages/Home'
import Homepage from './public/pages/Homepage/Homepage'
import Login from './admin/Pages/(auth)/login/Login'
import Register from './admin/Pages/(auth)/Register/Register'
import { useSelector } from 'react-redux'
import { isLogged,  user } from './admin/Pages/(auth)/AuthSlice/Auth.slice'
import Products from './admin/Pages/Products/Products'
import Users from './admin/Pages/Users/Users'
import Product from './public/pages/Products/Products'
import MainLayout from './public/Layout/MainLayout'
import ProductsData from './public/pages/ProductsData/ProductsData'
import EditProducts from './admin/Pages/EditProducts/EditProducts'
import AddProducts from './admin/Pages/AddProducts/AddProducts'

const App = () => {
  const isAuthenticated = useSelector(isLogged);
  const userData = useSelector(user);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      if (userData?.role === 'admin' && !location.pathname.startsWith('/admin')) {
        // Redirect admin users to the /admin section if not already there
        navigate('/admin', { replace: true });
      } else if (userData?.role === 'user' && location.pathname !== '/') {
        // Redirect regular users to the homepage if not already there
        navigate('/', { replace: true });
      }
    } else {
      // Allow unauthenticated users to access public routes
      const publicRoutes = ['/', '/auth/login', '/auth/register','/products', '/product/:id'];
      const isPublicRoute = publicRoutes.some((route) => {
        if (route.includes(':id')) {
          return location.pathname.startsWith('/product/');
        }
        return route === location.pathname;
      });
      if (!isPublicRoute  ) {
        // Redirect unauthenticated users trying to access private routes to the homepage
        navigate('/', { replace: true });
      }
    }
  }, [isAuthenticated, userData, location, navigate]);
  return (
   <Routes>
      <Route path='/' element={<MainLayout/>}>
        <Route path='' element={<Homepage/>}/>
        <Route path='product/:id' element={<ProductsData/>}/>
        <Route path='products' element={<Product/>}/>
      </Route>
      <Route path='/auth'>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      </Route>
      <Route path='/admin' element={<SidebarLayout/>} >
          <Route path='dashboard' element={<Home/>}/>
          <Route path='products' element={<Products/>}/>
          <Route path='users' element={<Users/>}/>
          <Route path='products/editProducts/:id' element={<EditProducts/>}/>
          <Route path='products/addProducts' element={<AddProducts/>}/>
      </Route>
   </Routes>
  )
}

export default App