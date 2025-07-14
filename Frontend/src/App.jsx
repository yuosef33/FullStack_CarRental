import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import  { useState } from 'react';
import Footer from './components/Footer'
import './App.css'
import NavBar from './components/NavBar'
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Payment from './components/Payment';
import Contact from './components/Contact';
import MaintanceService from './components/MaintanceService';
import About from './components/About';
import UserProfile from './components/UserProfile';
import TermsAndConditions from './components/TermsAndConditions';
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './components/Admin';
function App() {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  return (
    <>
    <Router>
      <div className='App'>
        <NavBar  setSelectedType={setSelectedType} setSelectedBrand={setSelectedBrand} />
            <div className='continaer'>
            <Routes>
            <Route path="/" element={<Home selectedType={selectedType} setSelectedType={setSelectedType} selectedBrand={selectedBrand}  setSelectedBrand={setSelectedBrand}/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/payment" element={<ProtectedRoute> <Payment /> </ProtectedRoute>} />
            <Route path="/contactUs" element={<Contact />} />
            <Route path="/maintance" element={<MaintanceService />} />
            <Route path="/aboutUs" element={<About />} />
            <Route path="/userProfile" element={<ProtectedRoute> <UserProfile /> </ProtectedRoute>} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/admin" element={<ProtectedRoute> <Admin /> </ProtectedRoute>} />
          </Routes>
            </div>
        <Footer />
      </div>
    </Router>
    </>
  )
}

export default App
