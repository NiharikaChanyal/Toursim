import React from 'react';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem('user'));
  const userRole = localStorage.getItem('userRole') || "guest"; 

  const handleLogout = () => {
    if(window.confirm("Do you want to logout?")) {
        // --- UPDATE: Session clear 
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('user');
        toast.success("Logged out successfully!");
        navigate('/login');
        window.location.reload(); 
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar_custom fixed-top">
      <div className="container-fluid">
        {/* Logo Section */}
        <Link className="navbar-brand" to="/">
          <div className="logo-circle">
            <img src="/assets/img/logo1.png" alt="Logo" />
          </div>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          {/* Main Links - Left Side */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
            </li>

            {/* common links */}
            <li className="nav-item">
              <Link className="nav-link" to="/gallery">Gallery</Link>
            </li>

            {/* User links */}
            {userRole === "user" && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/userdash">Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/carts">Cart</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/bookings">My Bookings</Link></li>
              </>
            )}

            {/* Admin links */}
            {userRole === "admin" && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/admin/dashboard">Admin Panel</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/admin/packages">Packages</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/admin/users">Users</Link></li>
              </>
            )}

            {/* Guest links */}
            {userRole === "guest" && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/registration">Registration</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/contact">Contact Us</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
              </>
            )}
          </ul>

          {/* Right Side Logic */}
          <div className="navbar-right d-flex align-items-center">
            {userRole === "guest" ? (
              <Link to="/login" title="Login">
                <i className="fa fa-sign-in dashboard-icon"></i>
                <span className="ms-2 text-white">Login</span>
              </Link>
            ) : (
              <div className="d-flex align-items-center">
                 <span className="text-white me-3 d-none d-md-block">Welcome!</span>
                 <button onClick={handleLogout} className="logout-icon-btn" title="Logout">
                    <i className="fa fa-power-off"></i>
                 </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;