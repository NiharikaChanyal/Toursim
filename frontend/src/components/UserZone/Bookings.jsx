import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Bookings.css';

const Bookings = () => {
    const navigate = useNavigate();
    const [myBookings, setMyBookings] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(user){
            axios.get(`https://city-tourism-booking-guide.onrender.com/api/bookings/user/${user.id}`)
            .then(res => { setMyBookings(res.data); })
            .catch(err => console.log("Booking Details Fetch Error : ",err));
        }
        else{
            navigate('/login');
        }
    },[navigate]);

    const handleCancel = async(id) => {
        const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
        if (confirmCancel) {
            try {
                // for delete or status update call
                await axios.delete(`https://city-tourism-booking-guide.onrender.com/api/bookings/delete/${id}`);
                
                // Removing from UI
                setMyBookings(myBookings.filter(booking => booking.id !== id));
                toast.success("Booking Cancelled Successfully!");
            } catch (err) {
                toast.error("Cancellation failed! Try again.");
            }
        }
    };

    return (
        <div className="bookings-page">
            <div className="container">
                    <h2 className="bookings-title text-center">My Booking History</h2>
             <div className='row justify-content-center'>
                {myBookings.length > 0 ? (
                    <div className="table-responsive col-md-10 card shadow-sm">
                        <table className="table custom-table mb-0">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Booking ID</th>
                                    <th>Package Name</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myBookings.map((booking) => (
                                    <tr key={booking.id}>
                                        <td><strong>#TRV-{booking.id}</strong></td>
                                        <td>{booking.packName}</td>
                                        <td>{booking.bookingDate}</td>
                                        <td>₹{booking.totalPrice}</td>
                                        <td>
                                            <span className={`status-badge ${booking.status.toLowerCase()}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td>
                                            {/* Smart Logic:  only pending bookings cann be canceled */}
                                            {booking.status === "Pending" ? (
                                                <button className="btn-cancel-action"  onClick={() => handleCancel(booking.id)}>
                                                    <i className="fa fa-times"></i> Cancel
                                                </button>
                                            ) : (  <span className="text-muted small">No Actions</span>  )
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (   // if no bookings
                    <div className="empty-bookings text-center py-5">
                        <i className="fa fa-calendar-times-o fa-5x mb-3" style={{color: '#ddd'}}></i>
                        <h3>No Bookings Found!</h3>
                        <p className="text-muted">Explore our amazing Lucknow tour packages now.</p>
                        <button className="btn btn-empty-book btn-outline-primary btn-lg mt-3" onClick={() => navigate('/packages')}>Book Your First Tour</button>
                    </div>
                )}
            </div>
           <div><button onClick={() => navigate('/userdash')} className="btn back-to-dash"><i className="fa fa-chevron-left">
                </i> Dashboard</button> </div>
                </div>
            </div>
            
        
    );
};

export default Bookings;