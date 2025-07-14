import React from 'react'
import { useState } from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { GiAutoRepair } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdOutlineHandshake } from "react-icons/md";
const NavBar = ({ setSelectedType ,  setSelectedBrand}) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const [isOpen2, setIsOpen2] = useState(false);
  const navigate = useNavigate();
  const handlehome = (e) => { 
    setSelectedType(null);
    setSelectedBrand(null);
    navigate('/');
    
  };
  const handleAdmin = (e) => { 
    setSelectedType(null);
    navigate('/admin');
    
  };
  return (
    <>
  
  <div className="bg-gray-700 text-white text-sm">
        <div className="container mx-auto flex justify-between items-center p-2">         
          <div className="flex space-x-4">
            <div>
              <label className="font-bold">Currency:</label>
              <select className="bg-gray-600 text-white ml-2 p-1 rounded" >
                <option value="EGP">Egyptian Pound (EGP)</option>
              </select>
            </div>
            <div>
              <label className="font-bold">Language:</label>
              <select className="bg-gray-600 text-white ml-2 p-1 rounded">
                <option value="en">English</option>
                <option value="ar">Arabic</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-4">
            <a href="https://wa.me/your-number" className="hover:text-green-400">
            <FaWhatsapp className="h-5 w-5" />
            </a>
            <a href="https://t.me/your-username" className="hover:text-blue-400">
            <FaTelegram className="h-5 w-5" />
            </a>
          
            <button onClick={(e)=>{navigate('/userProfile')}} className="hover:text-blue-400">
            <CgProfile className="h-5 w-5" />
            </button>
            
          </div>
        </div>
      </div>
    <nav className="bg-gray-800 text-white">
    <div className="container mx-auto flex justify-between items-center  items-stretch p-4">
    <div onClick={handlehome} className=" text-lg font-bold">VENOM</div>
                <ul className="hidden md:flex space-x-6">
                {user?.role === 'admin' && (<li><button onClick={handleAdmin} className="hover:text-gray-400">Admin</button></li>)}
                  <li><button onClick={handlehome} className="hover:text-gray-400">For Rent</button></li>
                  <li><button   onClick={() => {setIsOpen2(!isOpen2)
                 
                  }} className="flex items-center gap-1 hover:text-gray-300">Services
                  <IoIosArrowDown className="text-sm mt-1" />
                    </button>
                    
                    {isOpen2 && (
        <ul className="absolute mt-2 bg-white text-black shadow-lg rounded-md overflow-hidden z-10 w-55">
        <li onClick={(e)=>{navigate('/maintance')
          setIsOpen2(false)
        }} className="flex items-center justify-between px-4 py-2 hover:bg-gray-200 cursor-pointer">
          <span>Maintenance</span> <GiAutoRepair className="text-blue-500" />
        </li>
        
        <li onClick={(e)=>{navigate('/terms')
          setIsOpen2(false)
        }} className="flex items-center justify-between px-4 py-2 hover:bg-gray-200 cursor-pointer">
          <span>Terms&Conditions</span> <MdOutlineHandshake className="text-blue-500" />
        </li>
        
        
        </ul>)}

                    </li>
    
                  <li><button  onClick={(e)=>{navigate('/contactUS');
                 
                      setIsOpen2(false);
                  }} className="hover:text-gray-400">Contact Us</button></li>
                  <li><button  onClick={(e)=>{navigate('/aboutUs')
              
                    setIsOpen2(false);
                  }} className="hover:text-gray-400">About Us</button></li>
               </ul>
        <button className="md:hidden text-gray-400 hover:text-white focus:outline-none"> </button>
      </div>
    </nav>  
  
    </>
    
  )
}

export default NavBar