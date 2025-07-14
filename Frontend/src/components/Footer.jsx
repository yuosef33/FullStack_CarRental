import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
const Footer = () => {
    const navigate = useNavigate();
 
return (
    <>
 <footer className="bg-gray-800 px-4 md:px-10 lg:px-28 py-15">
 <div className='grid grid-cols-1 md:grid-cols-3 gap-4 '>
    <div>
        <h2 className='text-lg font-bold mb-4 text-white -mt-8 mb-12'> About Us</h2>
        <p className='text-gray-300'>We are a car rental company that provides luxury, sports, and electric vehicles for all your needs.</p>
    </div>
    <div>
    <h2 className='text-lg font-bold mb-4 text-white -mt-8 mb-4'> Quick Links</h2>
        <ul className='text-gray-300 space-y-2'>
            <li><button onClick={ (e)=>{navigate('/')}}  className='hover:underline text-gray-300 '>Home</button></li>
            <li><button onClick={ (e)=>{navigate('/maintance')}}    className='hover:underline text-gray-300 '>Services</button></li>
            <li><button  onClick={ (e)=>{navigate('/contactUs')}}   className='hover:underline text-gray-300 '>Contact Us</button></li>
            <li><a href='#'  className='hover:underline text-gray-300 '>About Us</a></li>
        </ul>
    </div>
    <div>
    <h2 className='text-lg font-bold mb-4 text-white -mt-8 mb-12'> Follow Us</h2>
        <ul className='flex space-x-4'>
            <li><FaFacebook className='text-blue-500'/><a href='https://facebook.com'  className='hover:underline text-gray-300'>Facebook</a></li>
            <li><FaTwitter className='text-sky-500'/><a href='https://twitter.com'  className='hover:underline text-gray-300'>Twitter</a></li>
            <li><RiInstagramFill className='text-orange-500'/><a href='https://instagram.com'  className='hover:underline text-gray-300'>Instagram</a></li>

        </ul>
    </div>
 </div>
 <div className='border-t border-gray-600 pt-6 text-center text-gray-300 mt-6'>
    <p className='text-center text-gray-300 mt-6'>© 2025 Venom Car Rental. All rights reserved.</p>
 </div>
    </footer>
</>
)
}

export default Footer