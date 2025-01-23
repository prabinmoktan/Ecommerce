import  { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";

import './MobileNavbar.css'


const MobileNavbar = () => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open)
    }
  return (
    <>
    <div className='smallNav pt-3 absolute z-50 top-0'>
   {open ? '': <RxHamburgerMenu onClick={handleClick}/> } 
    </div>
    {/* {open && ( */}
                <nav className={`mobile-menu ${open ? 'open' : ''}`}>
                <IoCloseOutline onClick={()=>setOpen(false)} className='float-end text-3xl text-white'/> 
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/blog">Blog</a></li>
                        <li><a href="/projects">Projects</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
            {/* )} */}
    </>
  )
}

export default MobileNavbar