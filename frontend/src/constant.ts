import {  MdOutlineDashboard } from "react-icons/md";
import { GiClothJar } from "react-icons/gi";
import {  CiShoppingCart } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";




export const navlink = [
    {
        name: 'Dashboard',
        link: '/',
        icon: MdOutlineDashboard,
    },
    {
        name: 'Products',
        link: '/products',
        icon: GiClothJar,
    },
    {
        name: 'Orders',
        link: '/orders',
        icon: CiShoppingCart,
    },
    {
        name: 'Customers',
        link: '/customers',
        icon: FaUserFriends,
    },
    {
        name: 'Settings',
        link: '/settings',
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