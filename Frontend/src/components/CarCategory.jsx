import React from 'react'

const CarCategory = ({ icon, label }) => {
  return (
    <>
    <button className="flex flex-col items-center gap-2 bg-gray-100 rounded-md p-4 w-35 hover:bg-gray-200 cursor-pointer transition">
      <img src={icon} alt={label} className="w-10 h-10 object-contain" />
      <span className="text-sm font-medium text-black text-center">{label}</span>
    </button>
    </>
  )
}

export default CarCategory