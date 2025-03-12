import { MdOutlineDashboard } from "react-icons/md";
import { GiClothJar } from "react-icons/gi";
import { CiShoppingCart } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
// import { IoIosLogOut } from "react-icons/io";


export const publicNavlink = [
  {
    name: "Home",
    link: "/",
    // icon: MdOutlineDashboard,
  },
  {
    name: "Categories",
    link: "",
  },
  {
    name: "Products",
    link: "/products",
  },
  {
    name: "Contact",
    link: "/contact",
  },
  {
    name: "About ",
    link: "/about",
  },
];

// export const accountLink = [
//   {name: 'Log Out', icon: IoIosLogOut}
// ]

export const navlink = [
  {
    name: "Dashboard",
    link: "/admin/",
    icon: MdOutlineDashboard,
  },
  {
    name: "Products",
    link: "/admin/products",
    icon: GiClothJar,
  },
  {
    name: "Orders",
    link: "/admin/orders",
    icon: CiShoppingCart,
  },
  {
    name: "Users",
    link: "/admin/users",
    icon: FaUserFriends,
  },
  {
    name: "Settings",
    link: "/admin   /settings",
    icon: CiSettings,
  },
];

export const productsTable = [
  { name: "Product Name" },
  { name: "category" },
  { name: "Price" },
  { name: "Stock" },
  { name: "Actions" },
];

export const userTable = [
  { name: "Full Name" },
  { name: "Email" },
  { name: "Role" },

  { name: "Actions" },
];

export const logoImages = [
  "/nike.png",

  "/adidas.png",

  "/puma.png",
  "/reebok.png",

  "/ua.png",
];
