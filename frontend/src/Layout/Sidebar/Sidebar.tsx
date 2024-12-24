import { navlink } from "../../constant";
import { IoLogOutOutline } from "react-icons/io5";


const Sidebar = () => {
  return (
    <>
      <aside className="  w-1/6 h-screen flex flex-col justify-between py-10 dark:bg-gray-800 border-r border-gray-200">
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
            <div className="flex items-center p-4 ">
                <span> <IoLogOutOutline className="text-2xl"/></span>
                <span className="ml-2">Logout</span>
            </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
