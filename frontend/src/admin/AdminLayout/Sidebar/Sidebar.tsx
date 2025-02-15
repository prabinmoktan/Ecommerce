import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../Pages/(auth)/AuthApi/user.api";
import { isLogged, logout } from "../../Pages/(auth)/AuthSlice/Auth.slice";
import { navlink } from "../../../constant";

const Sidebar = () => {
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(isLogged);

  const handleLogout = async () => {
    const response = await logoutUser();

    if (response.data?.success === true) {
      dispatch(logout());
      navigate("/auth/login");
      console.log(dispatch(logout()),  'navigate("/auth/login")')
    }
  };
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-screen h-screen">
          <Oval
            visible={true}
            height="80"
            width="80"
            color="white"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      <aside className="  w-1/6 h-screen flex flex-col justify-between  dark:bg-gray-800 border-r border-gray-200 bg-gray-200 pb-20">
        <div>
          {navlink.map((item, index) => (
            <div
              key={index}
              className="hover:text-lg hover:transition duration-300"
            >
              <a
                href={item.link}
                className="flex items-center p-4 dark:text-gray-200"
              >
                <item.icon className="text-2xl" />
                <span className="ml-2 ">{item.name}</span>
              </a>
            </div>
          ))}
        </div>
        <div>
          {isLoggedIn && (
            <div
              className="flex items-center p-4 dark:text-gray-50 cursor-pointer"
              onClick={handleLogout}
            >
              <span>
                <IoLogOutOutline className="text-2xl" />
              </span>
              <span className="ml-2">Logout</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
