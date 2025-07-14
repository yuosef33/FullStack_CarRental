import { useState } from "react";
import axios from 'axios';

function ServiceForm() {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [phone, setPhone] = useState("");
  const [problem, setProblem] = useState("");
  const [day, setDay] = useState("monday");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!model.trim()) newErrors.model = "Car model is required.";
    if (!phone.match(/^\d{10,15}$/)) newErrors.phone = "Enter a valid phone number.";
    if (!problem.trim()) newErrors.problem = "Please describe your problem.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const res = await axios.post('http://localhost:3000/api/service-booking', {
          name,
          carModel: model,
          phoneNumber: phone,
          problemDescription: problem,
          day
        });
  
        alert('Form submitted! We will text you soon.');

        setName('');
        setModel('');
        setPhone('');
        setProblem('');
        setDay('monday');
        setErrors({});
      } catch (error) {
        console.error('Submission error:', error);
        alert('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="bg-white border border-gray-800 p-8 rounded-xl shadow-md max-w-lg mx-auto mt-8 mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Book a Service</h3>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        
   
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Enter your name:</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Model of the car:</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Car Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
        </div>

      
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone number:</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

      
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">What is your problem:</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Explain your problem"
            rows="4"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          ></textarea>
          {errors.problem && <p className="text-red-500 text-sm mt-1">{errors.problem}</p>}
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Enter the day:</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white font-bold py-2 rounded-lg hover:bg-gray-400 hover:text-gray-800 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ServiceForm;
