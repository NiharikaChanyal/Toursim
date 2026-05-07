import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './Navbar';
import Home from './Home'; 
import Login from './Login'; 
import Logout from './Logout';
import Gallery from './Gallery';
import About from './About';
import Registration from './Registration';
import Contact from './Contact';
import Profile from './components/UserZone/Profile';

import User_Dashboard from './components/UserZone/User_Dashboard';
import Packages from './components/UserZone/Packages';
import Carts from './components/UserZone/Carts';
import Wishlist from './components/UserZone/Wishlist';
import Bookings from './components/UserZone/Bookings';
import BookingSuccess from './components/UserZone/BookingSuccess';
import Settings from './components/UserZone/Settings';
import Admin_Dashboard from './components/AdminZone/Admin_Dashboard';
import ManageUsers from './components/AdminZone/ManageUsers';
import ManageBookings from './components/AdminZone/ManageBookings';
import ManagePackages from './components/AdminZone/ManagePackages';
import ManageEnquiries from './components/AdminZone/ManageEnquiries';
import ReplyEnquiries from './components/AdminZone/ReplyEnquiries'
import EditUser from './components/AdminZone/EditUser';
import AdminProfile from './components/AdminZone/AdminProfile'
import Footer from './Footer';




// --- SMART LOGIC FUNCTION ---
function AppContent() {
  const location = useLocation();

  const hideLayout = 
    location.pathname.startsWith('/admin') || 
    location.pathname.startsWith('/userdash') ||
    location.pathname.startsWith('/profile')||
    location.pathname.startsWith('/packages') ||
    location.pathname.startsWith('/carts') ||
    location.pathname.startsWith('/wishlist') ||
    location.pathname.startsWith('/bookings')||
    location.pathname.startsWith('/settings');  

  return (
    <div className="App">
      {!hideLayout && <Navbar />}      
      <div style={{ marginTop: hideLayout ? '0px' : '7px' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />          
          <Route path="/login" element={<Login />} />  
          <Route path="/gallery" element ={<Gallery />} />    
          <Route path="/registration" element ={<Registration />} />
          <Route path="/about" element={<About />} />  
          <Route path="/contact" element={<Contact />} />
          <Route path="/logout" element={<Logout />} />

          {/* User Routes */}
          <Route path="/userdash" element={<User_Dashboard />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/carts" element={<Carts />} />
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/confirm-booking" element={<BookingSuccess />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />         
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<Admin_Dashboard />} />
          <Route path="/admin/packages" element={<ManagePackages />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/bookings" element={<ManageBookings />} />
          <Route path="/admin/edit/:id" element={<EditUser />} />
          <Route path="/admin/reply" element={<ReplyEnquiries />} />
          <Route path="/admin/enquiries" element={<ManageEnquiries />} />
          <Route path="/admin/adprofile" element={<AdminProfile />} />
        </Routes>
      </div>

      {!hideLayout && <Footer />}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}

// --- MAIN APP COMPONENT ---
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;