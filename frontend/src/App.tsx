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
import Product from './public/pages/Products/Product'
import MainLayout from './public/Layout/MainLayout'

const App = () => {
  const isAuthenticated = useSelector(isLogged);
  const userData = useSelector(user);
  const location = useLocation();
  console.log(userData);
  console.log(isAuthenticated)
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
      const publicRoutes = ['/', '/auth/login', '/auth/register'];
      if (!publicRoutes.includes(location.pathname)) {
        // Redirect unauthenticated users trying to access private routes to the homepage
        navigate('/', { replace: true });
      }
    }
  }, [isAuthenticated, userData, location, navigate]);
  return (
   <Routes>
      <Route path='/' element={<MainLayout/>}>
        <Route path='' element={<Homepage/>}/>
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
      </Route>
   </Routes>
  )
}

export default App