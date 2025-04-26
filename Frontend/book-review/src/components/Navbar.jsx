import React, { useContext } from 'react'
import { MainContext } from '../contexts/context.jsx'
import { Link } from 'react-router-dom';
import { X } from 'lucide-react'; // Assuming you're using lucide-react icons
import { useLocation } from 'react-router-dom';

function SideNav() {
    const {isOpen, setIsOpen} = useContext(MainContext)
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
      };
    const location = useLocation(); // Get current route path

    // Menu items
    const menuList = [
        { id: 0, name: 'Home', path: '/' },
        { id: 1, name: 'Browse', path: '/browse' },
        { id: 2, name: 'Write a Review', path: '/write-review' },
        { id: 3, name: 'Profile', path: '/profile' },
        { id: 4, name: 'About Us', path: '/about' },
    ];

    // Toggle sidebar visibility
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            // className={`fixed w-64 flex flex-col gap-3 h-screen shadow-md p-2 bg-white transition-all duration-500 transform ease-in-out ${
            //     isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-50'
            // }`}
        >
            {isOpen && (
                <div className="flex p-5 justify-end mb-2">
                    <X onClick={handleToggle} className="text-gray-50 cursor-pointer hover:text-gray-600" />
                </div>
            )}
            {menuList.map((menu) => (
                <Link key={menu.id} to={menu.path} className="no-underline">
                    <h2
                        className={`flex gap-2 items-center text-gray-50 font-medium p-3 ml-2 cursor-pointer rounded-md hover:text-primary hover:bg-gray-800
                                    ${location.pathname === menu.path ? 'text-primary bg-gray-600' : ''}`}
                    >
                        {menu.name}
                    </h2>
                </Link>
            ))}
        </div>
    );
}

export default SideNav;
