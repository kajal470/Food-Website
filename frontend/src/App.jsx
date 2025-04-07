import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Menu from './Pages/Menu';
import Contact from './Pages/Contact';
import Reservation from './Pages/Reservation';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Cart from './Pages/Cart';
import MyBookings from './Pages/MyBookings';
import Dashbord from './Admin/Dashbord';

const App = () => {
  const [authenticUser, setAuthenticUser] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const updateAuth = () => {
      setAuthenticUser(localStorage.getItem("token"));
    };

    window.addEventListener("storage", updateAuth);
    return () => {
      window.removeEventListener("storage", updateAuth);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/*" element={<Dashbord/>} /> {/* Fixed path */}
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reservation" element={authenticUser ? <Reservation /> : <Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
