import React from 'react'
import ProductTemplate from './ProductTemplate';
import CarCategory from './CarCategory';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SiLamborghini } from "react-icons/si";
import { SiBmw } from "react-icons/si";
import { SiPorsche } from "react-icons/si";
import { SiMercedes } from "react-icons/si";
import { SiTesla } from "react-icons/si";
import { IoIosArrowDown } from "react-icons/io";
const Home = ({ selectedType, setSelectedType,selectedBrand,setSelectedBrand }) => {
  const [isOpen, setIsOpen] = useState(false);
      const categories = [
        { label: 'Luxury', icon: './181936-512.png' },
        { label: 'Sports', icon: './4721-512.png' },
        { label: 'SUV', icon: 'https://img.icons8.com/ios-filled/50/suv.png' },
        { label: 'Classic', icon: './luxe.png' },
        { label: 'Business', icon: './11613-512.png' },
        { label: 'Electric (EV)', icon: './electric-car_15536990.png' },
        { label: 'VAN', icon: 'https://img.icons8.com/ios-filled/50/van.png' },
    ];
   
    const [page, setPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1); 
      const [cars, setCars] = useState([]);
      useEffect(() => {
        const fetchCars = async () => {
          try {
            let url = `http://localhost:3000/api/cars?page=${page}&limit=8`;
      
            if (selectedType) {
              url = `http://localhost:3000/api/cars/type/${selectedType}?page=${page}&limit=8`;
            } else if (selectedBrand) {
              url = `http://localhost:3000/api/cars/brand/${selectedBrand}?page=${page}&limit=8`;
            }
      
            const res = await axios.get(url);
            setCars(res.data.cars);
            setTotalPages(res.data.totalPages);
          } catch (err) {
            console.error('Error fetching cars:', err);
          }
        };
      
        fetchCars();
      }, [page, selectedType, selectedBrand]);
    
    const handleSelectCar = (car) => {
      localStorage.setItem('selectedCar', JSON.stringify(car));
      navigate('/payment');
    };
    const handleNext = () => {
      if (page < totalPages) setPage(page + 1);
    };
  
    const handlePrev = () => {
      if (page > 1) setPage(page - 1);
    };

  return (
    <>
     <div className="relative bg-[url('./porchepage.jpg')] bg-cover bg-center h-[700px] flex items-end pl-10 pb-10">
      
      <button className="absolute top-10 left-1/2 transform -translate-x-1/2 text-white text-[12rem] font-bold opacity-90 w-[80%] text-center hover:text-gray-700 hover:opacity-70 transition duration-300">
        VENOM
      </button>
      <div className="grid grid-rows-2 max-w-4xl">
        <p className="text-white text-3xl md:text-4xl font-bold mb-4 opacity-70">
          CLASSIC, PREMIUM AND ELECTRIC CAR RENTAL
        </p>
        <p className="text-white text-3xl md:text-4xl font-bold mb-4 opacity-70">
          Simply choose the model you like and WE will do the rest.
        </p>
      </div>
    </div>

          <div className="relative h-10">
    <button className="absolute left-1/2 -top-6 -translate-x-1/2 bg-gray-100 mt-6 px-6 py-2 rounded-b-[2rem] text-sm font-semibold tracking-wide shadow-md hover:bg-black hover:text-white transition duration-300">
      LET’S GO
    </button>
    </div>
          <p className="text-center text-3xl font-bold mt-10">CHOOSE YOUR CAR</p>
          <div className="flex flex-wrap gap-10 justify-center p-4 h-30 relative">

{categories.map((cat, index) => (
  <div key={index} onClick={() => { setSelectedType(cat.label); setPage(1); }}>
    <CarCategory icon={cat.icon} label={cat.label} />
  </div>
))}


<div className="relative">
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="flex items-center gap-1 hover:text-gray-300 text-white font-semibold px-4 py-4 h-full bg-gray-800 rounded shadow"
  >
    Brands
    <IoIosArrowDown className="text-sm mt-1" />
  </button>

  {isOpen && (
    <ul className="absolute top-full mt-2 bg-white text-black shadow-lg rounded-md overflow-hidden z-10 w-48">
      <li onClick={() => {
  setSelectedBrand('BMW');
  setSelectedType(null);  
  setPage(1);
  setIsOpen(false);
}}
 className="flex items-center justify-between px-4 py-2 hover:bg-gray-200 cursor-pointer">
        <span>BMW</span> <SiBmw className="text-blue-500" />
      </li>
      <li onClick={() => {
  setSelectedBrand('Mercedes');
  setSelectedType(null);  
  setPage(1);
  setIsOpen(false);
}} className="flex items-center justify-between px-4 py-2 hover:bg-gray-200 cursor-pointer">
        <span>Mercedes</span> <SiMercedes className="text-gray-700" />
      </li>
      <li onClick={() => {
  setSelectedBrand('Tesla');
  setSelectedType(null);  
  setPage(1);
  setIsOpen(false);
}} className="flex items-center justify-between px-4 py-2 hover:bg-gray-200 cursor-pointer">
        <span>Tesla</span> <SiTesla className="text-red-500" />
      </li>
      <li onClick={() => {
  setSelectedBrand('Porsche');
  setSelectedType(null);  
  setPage(1);
  setIsOpen(false);
}} className="flex items-center justify-between px-4 py-2 hover:bg-gray-200 cursor-pointer">
        <span>Porsche</span> <SiPorsche className="text-yellow-600" />
      </li>
      <li onClick={() => {
  setSelectedBrand('lamborghini');
  setSelectedType(null);  
  setPage(1);
  setIsOpen(false);
}} className="flex items-center justify-between px-4 py-2 hover:bg-gray-200 cursor-pointer">
        <span>Lamborghini</span> <SiLamborghini className="text-green-600" />
      </li>
    </ul>
  )}
</div>
</div>
    
          <div className="grid grid-cols-4 gap-4 p-10 bg-gray-100 rounded-lg shadow-lg mt-10 mb-10 mx-10  ">  
            {cars.length === 0 && (
              <div className="col-span-4 text-center text-gray-500 font-semibold">
        This type of car is currently not available.
              </div>
            )}
            {cars.map((cars) => (
              <div key={cars._id} className="cursor-pointer" onClick={() => handleSelectCar(cars)}>
              <ProductTemplate
                name={cars.brand+'-'+cars.model}
                image={cars.imageUrl}
                price={cars.price}
                acs={cars.acceleration}
                hors={cars.hp}
                tank={cars.tank}
              />
            </div>
            ))}

          </div>
          
  <div className="flex justify-center mb-10 gap-6">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-black hover:text-white"
        >
          Previous
        </button>
        <span className="text-xl font-semibold">Page {page} of {totalPages}</span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-black hover:text-white"
        >
          Next
        </button>
      </div>

    </>
  )
}
export default Home