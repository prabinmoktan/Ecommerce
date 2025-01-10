
import ToggleDarkmode from "../../ui/ToggleDarkmode/ToggleDarkmode";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";



const Navbar = () => {
  const { isLogged, user } = useSelector((state: RootState) => state.auth);
 
  
  

  
  return (
    <>
      <nav className="w-screen bg-gray-200 dark:bg-gray-800 flex justify-between px-10 items-center h-16 dark:text-gray-200">
        <div>
          <h1>COMPANY LOGO</h1>
        </div>
        <div>SEARCH BAR</div>
        <div className="flex gap-5">
          <ToggleDarkmode />
          {user && <p>hello ${user.firstName}</p> }
          {isLogged && (
            <div className="flex">
             
              {user?.gender === "Male" ? (
                <img src="/male.PNG" className="rounded-full w-9" />
              ) : (
                <img src="/female.PNG" className="rounded-full w-12" />
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
