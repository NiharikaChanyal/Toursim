import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Admin_Dashboard.css';

const AdminDashboard = () => {
    const [counts, setCounts] = useState({ packages: 0, bookings: 0, users: 0, enquiries: 0 });
    const [recentBookings, setRecentBookings] = useState([]); 
    const navigate = useNavigate();

    // fetchStats are called under useEffect
useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "ADMIN") {
        navigate("/login");
        return;
    }
    fetchStats(); // Data fetching as dashboard loads
}, []);

const fetchStats = async () => {
    try {
        const [enqRes, userRes, packRes, bookRes] = await Promise.all([
            axios.get("https://city-tourism-booking-guide.onrender.com/api/enquiries/all"),
            axios.get("https://city-tourism-booking-guide.onrender.com/api/users/all-users"),
            axios.get("https://city-tourism-booking-guide.onrender.com/api/packages/all"), 
            axios.get("https://city-tourism-booking-guide.onrender.com/api/bookings/all")  
        ]);

        setCounts({
            enquiries: enqRes.data.length,
            users: userRes.data.length,
            packages: packRes.data.length,
            bookings: bookRes.data.length
        });
        setRecentBookings(bookRes.data.reverse().slice(0, 5));
    } catch (err) {
        console.error("Error fetching ", err);
    }
};
      
const stats = [
        { label: "Total Packages", count: counts.packages, icon: "fa-cubes", color: "#185a9d" },
        { label: "New Bookings", count: counts.bookings, icon: "fa-shopping-cart", color: "#43cea2" },
        { label: "Total Users", count: counts.users, icon: "fa-users", color: "#f39c12" },
        { label: "Enquiries", count: counts.enquiries, icon: "fa-envelope", color: "#e74c3c" }
    ]; 

     return (
        <div className="admin-dashboard">
         <div className="admin-sidebar">
         <div className="logo-section">
        <h3 className="text-center">Lucknow Explore</h3>
        <p className="text-muted text-center small">Admin Portal v1.0</p>
       </div>
    <hr/>
    <nav>
        <button onClick={() => navigate('/admin/dashboard')} className="active"><i className="fa fa-th-large"></i> Dashboard  </button>
        <button onClick={() => navigate('/admin/users')}><i className="fa fa-users"></i>Users</button>
        <button onClick={() => navigate('/admin/bookings')} ><i className="fa fa-calendar"></i>Bookings</button>  
        <button onClick={() => navigate('/admin/packages')}> <i className="fa fa-map"></i> Packages  </button>
        <button onClick={() => navigate('/admin/adprofile')}><i className="fa fa-user"></i>Profile</button>
        <button onClick={()=> navigate('/')}><i className="fa fa-home"></i>Home</button>
        <button onClick={() => navigate('/admin/enquiries')}> <i className="fa fa-comment"></i> Enquiries 
            {counts.enquiries > 0 && <span className="badge bg-danger ms-auto">{counts.enquiries}</span>}
        </button> <hr/>       
    </nav>
    
    {/* Footer of Sidebar */}
    <div className="sidebar-footer">        
        <p className="small text-center opacity-50">{new Date().toLocaleDateString()}</p><hr/>
        <button className="logout-btn " onClick={() => navigate('/logout')}> <i className="fa fa-sign-out"></i> Logout  </button>
    </div>
</div>

            <div className="admin-content">
                <header className="admin-header d-flex justify-content-between align-items-center">
                    <h2 className="">Welcome, Admin!</h2>
                    <div className="admin-profile"><img src="https://ui-avatars.com/api/?name=Admin" alt="admin" /></div>
                </header>
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div className="stat-card" key={index} style={{borderLeft:`5px solid ${stat.color}`}}>
                         <div className="stat-info"><h3>{stat.count}</h3><p>{stat.label}</p></div>
                         <div className="stat-icon" style={{color: stat.color}}><i className={`fa ${stat.icon}`}></i></div>   
                        </div>
                    ))}
                </div>
                <div className="recent-activity">
                    <h3>Recent Bookings</h3>
                    <table className="table card-shadow-lg mt-8">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Packages</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentBookings.map((booking, index) => (
                                <tr key={index}>
                                    <td>{booking.userName}</td>
                                    <td>{booking.packName}</td>
                                    <td>{booking.bookingDate}</td>
                                    <td>
                                      <span className={`badge ${booking.status === 'Confirmed' ? 'bg-success' : 'bg-warning'}`}>
                                      {booking.status}
                                      </span>
                                   </td>
                               </tr>
                            ))}
                       </tbody>                       
                    </table>
                </div>
            </div>
        </div>
     );
};
export default AdminDashboard;