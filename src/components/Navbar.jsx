import React, { useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { BsFillPersonFill } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const handleBackdropClick = (e) => {
        // Close the sidebar if the backdrop (outside the sidebar) is clicked
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            closeSidebar();
        }
    };
    return (
        <nav className='flex justify-between items-center p-2'>
            <motion.div 

            initial={{ opacity: 0, x:-100 }}
            animate={{ opacity: 1, x:0 }}
            transition={{ duration: 1 }}
            className='flex justify-center items-center'>
                <img src="/fanden.jpeg" alt="logo" className='h-20 rounded-full' />
                <p className='px-3 text-gray-700 text-xl'>Experience sport like never before</p>
            </motion.div>

            {/* Desktop Navbar */}
            <motion.div
            initial={{ opacity: 0, x:100 }}
            animate={{ opacity: 1, x:0 }}
            transition={{ duration: 1 }}
            className='md:flex justify-center items-center hidden '>
                <div className='navbar-items relative group'>
                    Home
                    <div className="absolute left-0 bottom-0 w-full h-0.5 bg-[#5c9735] transform scale-x-0 origin-left transition-transform transition-delay-200 group-hover:scale-x-100"></div>
                </div>
                <div className='navbar-items group relative'>
                    About
                    <div className="absolute left-0 bottom-0 w-full h-0.5 bg-[#5c9735] transform scale-x-0 origin-left transition-transform transition-delay-200 group-hover:scale-x-100"></div>
                </div>
                <div className='navbar-items group relative'>
                    Shop
                    <div className="absolute left-0 bottom-0 w-full h-0.5 bg-[#5c9735] transform scale-x-0 origin-left transition-transform transition-delay-200 group-hover:scale-x-100"></div>
                </div>
                <div className='navbar-items group relative'>
                    Contact
                    <div className="absolute left-0 bottom-0 w-full h-0.5 bg-[#5c9735] transform scale-x-0 origin-left transition-transform transition-delay-200 group-hover:scale-x-100"></div>
                </div>
                <div className='navbar-items'><BsSearch /></div>
                <div className='navbar-items'>Rs. 0.00</div>
                <div className='navbar-items'><BsFillPersonFill /></div>
            </motion.div>

            {/* Mobile Navbar */}
            <div className='md:hidden'>
                {!isSidebarOpen &&
                    <AiOutlineMenu className='text-2xl cursor-pointer' onClick={toggleSidebar} />
                }
            </div>


            {/* Mobile Sidebar */}
            {isSidebarOpen && (
                <>
                    <div
                        ref={sidebarRef}
                        className="fixed z-10 top-0 right-0 h-full w-3/4 bg-green-900 transition-transform duration-300 transform translate-x-0 rounded-lg backdrop-blur-lg bg-opacity-50 p-5"
                    >
                        <div className='top-3 absolute right-3 cursor-pointer' onClick={closeSidebar}>
                            <RxCross2 className='text-2xl' />
                        </div>
                        <div className='flex flex-col h-full text-white space-y-5 text-lg'>
                            {/* Add your sidebar links and other content here */}
                            <div className='sidebar-items'>Home</div>
                            <div className='sidebar-items'>About</div>
                            <div className='sidebar-items'>Shop</div>
                            <div className='sidebar-items'>Content</div>
                            <div className='sidebar-items'><BsSearch /> Search</div>
                            {/* Add any other sidebar items you need */}
                        </div>
                    </div>
                    <div
                        className="fixed top-0 left-0 h-full w-full bg-black opacity-30"
                        onClick={handleBackdropClick}
                    ></div>
                </>
            )}
        </nav>
    );
};

export default Navbar;
