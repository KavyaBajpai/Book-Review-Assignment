import React from 'react'
import logo from '../assets/logocat.svg'; 
import {PanelRightOpen, PanelRightClose} from 'lucide-react'
import { MainContext } from '../contexts/context.jsx'
import Navbar from './Navbar.jsx';
import { Link } from 'react-router-dom';
function Header() {
  const {isOpen, setIsOpen, user,  userId} = React.useContext(MainContext)
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className='w-full flex justify-between items-center px-1 py-3 overflow-x-hidden'>
    <div className='flex items-center gap-3 justify-center cursor-pointer
     rounded-lg px-3' >
      
      {
        !isOpen && <PanelRightClose className='text-white opacity-60' onClick={()=>{toggleSidebar()}}/>
      }
      {
        isOpen && <PanelRightOpen className='text-white opacity-60'  onClick={()=>{toggleSidebar()}}/>
      }
      <Link to='/' > 
      <h2 className='text-white font-bold text-2xl 
          transition duration-700 ease-in-out 
     hover:-translate-z-1 hover:scale-105'>Verse&Voice</h2>
     </Link>
      </div>

      <Link to='/profile' className='text-white h-12 w-12 mr-2 font-bold text-xl rounded-full 
       flex items-center justify-center
        bg-gray-600 cursor-pointer 
        transition duration-700 ease-in-out 
        hover:-translate-z-1 hover:scale-110 hover:bg-gray-400 '>
        {user?.charAt(0).toUpperCase()} 
      </Link>
      </div>
  )
}

export default Header
