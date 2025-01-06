import { navlink } from "../../constant";
import { IoLogOutOutline } from "react-icons/io5";
import { useLogoutUserMutation } from "../../pages/(auth)/AuthApi/user.api";
import { useDispatch, useSelector } from "react-redux";
import {  isLogged, logout } from "../../pages/(auth)/AuthSlice/Auth.slice";
import {Oval } from 'react-loader-spinner'
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const [logoutUser,{isLoading}] = useLogoutUserMutation();
  const dispatch= useDispatch();
  const navigate = useNavigate();
const isLoggedIn = useSelector(isLogged)
console.log('isLogged==>', isLoggedIn)

  const handleLogout = async() => {
    try {
      const res = await logoutUser();
      if(res){
        dispatch(logout())
        navigate('/login')
        
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    {isLoading && 
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-screen h-screen">
      <Oval visible={true}
  height="80"
  width="80"
  color="white"
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass=""/>
    </div>
    }
      <aside className="  w-1/6 h-screen flex flex-col justify-between  dark:bg-gray-800 border-r border-gray-200 bg-gray-200 pb-20">
      <div>

        {navlink.map((item, index) => (
            <div key={index} className="hover:text-lg hover:transition duration-300">
                <a href={item.link} className="flex items-center p-4 dark:text-gray-200">
                    <item.icon className="text-2xl"/>
                    <span className="ml-2 ">{item.name}</span>
                </a>

            </div>
        ))}
        </div>
        <div>
          {
            isLoggedIn && (

            <div className="flex items-center p-4 dark:text-gray-50 cursor-pointer" onClick={handleLogout}>
                <span> <IoLogOutOutline className="text-2xl"/></span>
                <span className="ml-2">Logout</span>
            </div>
            )
          }
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
