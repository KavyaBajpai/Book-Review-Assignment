import React from 'react';
import Header from './components/Header';
import bg from './assets/pexels-eberhardgross-1421903.jpg';
import { Outlet } from 'react-router-dom';
import { MainContext } from './contexts/context.jsx';
import Navbar from './components/Navbar.jsx';

function Layout() {
  const { isOpen } = React.useContext(MainContext);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-500"
      style={{ backgroundImage: `url(${bg})` }}
    >  
      
      <div className="flex min-h-screen">
        
      <div
          className={`transition-transform duration-500 ease-in-out   text-white  ${
            isOpen ? 'transform translate-x-0' : 'transform -translate-x-full'
          }`}
          style={{
            transitionDelay: isOpen ? '200ms' : '0ms', 
          }}
        >
         {isOpen && (
          <div className="transition-all duration-500 ease-in-out w-40 text-white">
            <Navbar />
          </div>
        )}
        </div>
        

        
        <div className={`flex-1 transition-all duration-500 `}
          >
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
