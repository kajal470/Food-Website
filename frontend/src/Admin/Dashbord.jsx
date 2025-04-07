import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Products from '../Pages/Products';
import Orders from '../Pages/Orders';
import DashbordPage from '../Pages/DashbordPage';
import Booking from '../Pages/Booking';
import AddProduct from '../Pages/AddProduct';

function Dashbord() {
  return (
    <>
      <Navbar />
      <div style={{display:'flex'}}>
        <Sidebar />
        <main className="flex-1   min-h-screen">
          {/* Nested Routes */}
          <Routes>
            <Route index element={<DashbordPage />} /> {/* Default dashboard page */}
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/bookings" element={<Booking />} />

          </Routes>
        </main>
      </div>
    </>
  );
}

export default Dashbord;
