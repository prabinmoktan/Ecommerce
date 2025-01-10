// Layout/SidebarLayout.tsx
import React from 'react';
import Sidebar from './Sidebar/Sidebar'; // Sidebar component
import Navbar from './Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const SidebarLayout: React.FC = () => {
  return (
    <div className="flex flex-col ">
        <Navbar/>
        <div className='flex gap-2'>

      <Sidebar />
      <main className="flex-grow">
       <Outlet/>
      </main>
        </div>
    </div>
  );
};

export default SidebarLayout;
