import React from 'react';
import { PiSpeedometerBold } from "react-icons/pi";
import { LiaHorseHeadSolid } from "react-icons/lia";
import { PiGasCanDuotone } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
const ProductTemplate = ({ name, image, price,acs,hors,tank }) => {
  const navigate = useNavigate();
  return (
    <button className="bg-white rounded-2xl shadow-md p-4 w-full max-w-sm transform transition duration-300 hover:scale-105">
      <h2 className="text-lg font-semibold mb-4 mb-2 h-10 text-center">{name}</h2>
      <img
        src={image}
        alt={name}
        className="w-full h-60 object-cover rounded-xl mb-4"
      />
      <div className='grid grid-cols-3 gap-3 mb-4'>
      <p className='text-black flex items-center'>
        <PiSpeedometerBold className="mr-2 text-xl" /> {acs} sec
      </p>
      <p className='text-black flex items-center'>
        <LiaHorseHeadSolid className="mr-2 text-xl" /> {hors} HP
        </p>
        <p className='text-black flex items-center'>
        <PiGasCanDuotone className="mr-2 text-xl" /> {tank} L 
        </p>
      </div>
      <button onClick={(e)=>{navigate('payment')}} className="w-full bg-white text-black font-medium border border-black py-2 px-4 hover:bg-black hover:text-white transition duration-300 rounded-lg">
        Rent This Car - ${price}/day
      </button>
    </button>
  );
};

export default ProductTemplate;
