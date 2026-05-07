import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import "./User_Dashboard.css";

const UserDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [temp, setTemp] = useState("24°C");

    useEffect(() => {
        if (!storedUser || storedUser.role === "ADMIN") {
            toast.error("Please login as a User to access this dashboard.");
            navigate("/login");
        }
    }, [storedUser, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("userRole");
        navigate("/login");
        window.location.reload();
    };
   

    return (
        <div className="dashboard-container">
            {/* --- SIDEBAR --- */}
            <div className="sidebar">
                <div className="logo-section">
                    <h3 className="text-center">Lucknow Travel</h3>
                </div>
                <hr />
                <nav>
                    <button onClick={() => navigate('/userdash')} className="active"><i className="fa fa-th-large"></i> Dashboard</button>
                    <button onClick={() => navigate('/profile')}><i className="fa fa-user"></i> My Profile</button>
                    <button onClick={() => navigate('/packages')}><i className="fa fa-suitcase"></i> Explore packages</button>
                    <button onClick={() => navigate('/bookings')}><i className="fa fa-calendar-check-o"></i> My Bookings</button>
                    <button onClick={() => navigate('/wishlist')}><i className="fa fa-heart"></i> My Wishlist</button>
                    <button onClick={() => navigate('/carts')}><i className="fa fa-shopping-cart"></i> My Cart</button>
                    <button onClick={() => navigate('/')}><i className="fa fa-home"></i> Home</button>
                    <button onClick={() => navigate('/settings')}><i className="fa fa-key"></i> Settings</button>
                    <hr/>
                </nav>
                {/* Footer of Sidebar */}
               <div className="sidebar-footer">        
                   <p className="small text-center opacity-50">{new Date().toLocaleDateString()}</p><hr/>
                  <button className="logout-btn " onClick={() => navigate('/logout')}> <i className="fa fa-sign-out"></i> Logout</button>
                 </div>
            </div>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="main-content">
                <div className="top-nav">
                    <h2>Welcome , <span>{storedUser ? storedUser.name : "Guest"}</span>!</h2>
                    <div className="user-icon"><i className="fa fa-user-circle fa-2x"></i></div>
                </div>

                <div className="content-body">
                    {/* Quick Stats / Summary Cards */}
                    <div className="stats-grid">
                        <div className="stat-card yellow"><i className="fa fa-sun-o"></i>
                        <div><h4>Lucknow Weather</h4><p>{temp} | Sunny</p></div>
                        </div>
                        <div className="stat-card blue"><i className="fa fa-plane"></i>
                        <div><h4>Next Trip</h4><p>Bara Imambara</p></div>
                        </div>
                        <div className="stat-card green"><i className="fa fa-ticket"></i>
                            <div><h4>Bookings</h4><p>02 Active</p></div>
                        </div>
                        <div className="stat-card orange"><i className="fa fa-star"></i>
                            <div><h4>Points</h4><p>1250 XP</p></div>
                        </div>
                    </div>

                    <div className="welcome-banner">
                        <h3>Discover the City of Nawabs!</h3>
                        <p>Explore exclusive tour packages specially curated for you.</p>
                        <button onClick={() => navigate('/packages')}>View Packages</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;