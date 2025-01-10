import {  MdOutlineDashboard } from "react-icons/md";
import { GiClothJar } from "react-icons/gi";
import {  CiShoppingCart } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";




export const navlink = [
    {
        name: 'Dashboard',
        link: '/admin/',
        icon: MdOutlineDashboard,
    },
    {
        name: 'Products',
        link: '/admin/products',
        icon: GiClothJar,
    },
    {
        name: 'Orders',
        link: '/admin/orders',
        icon: CiShoppingCart,
    },
    {
        name: 'Users',
        link: '/admin/users',
        icon: FaUserFriends,
    },
    {
        name: 'Settings',
        link: '/admin   /settings',
        icon: CiSettings,
    }, 
]

export const productsTable = [
    {name: 'Product Name'},
    {name: 'category'},
    {name: "Price"},
    {name: 'Stock'},    
    {name: 'Actions'}
]

export const userTable = [
    {name: 'Full Name'},
    {name: 'Email'},
    {name: "Role"}, 
    
    {name: 'Actions'},    
    
]