import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ManageBookings.css'; 

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);

    const navigate = useNavigate();
    
    const fetchBookings = () => {
        axios.get("https://city-tourism-booking-guide.onrender.com/api/bookings/all")
            .then(res => setBookings(res.data))
            .catch(err => console.error("Error fetching bookings:", err));
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleRemove = (id) => {
        if (window.confirm("Are you sure you want to delete this booking?")) {
            axios.delete(`https://city-tourism-booking-guide.onrender.com/api/bookings/delete/${id}`)
                .then(() => {
                    setBookings(bookings.filter(b => b.id !== id));
                    toast.success("Booking Deleted Successfully!");
                })
                .catch(err => {
                    console.error(err);
                    toast.error("Error deleting booking!");
                });
        }        
    };

    return (
    <div className="admin-container">

        <h2 className="text-center">Manage All Bookings</h2>

        {/* ✅ TOP RIGHT BADGE */}
        <div className="top-right-badge">
            <span className="badge bg-primary text-light p-2">
                Total Bookings: {bookings.length}
            </span>
        </div>

        <div className="d-flex justify-content-center">
            <div className="admin-card card shadow-sm mt-3">

                <table className="table table-light table-hover table-striped text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>Booking ID</th>
                            <th>Customer Name</th>
                            <th>Package Name</th>
                            <th>Booking Date</th>
                            <th>Persons</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.length > 0 ? (
                            bookings.map(booking => (
                                <tr key={booking.id}>
                                    <td>#TRV-{booking.id}</td>
                                    <td><strong>{booking.userName}</strong></td>
                                    <td>{booking.packName}</td>
                                    <td>{booking.bookingDate}</td>
                                    <td>{booking.persons}</td>
                                    <td>₹{booking.totalPrice}</td>

                                    <td>
                                        <span className={`badge ${booking.status === 'Confirmed' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                            {booking.status}
                                        </span>
                                    </td>

                                    <td>
                                        <button className="btn btn-sm btn-outline-primary me-2">
                                            <i className="fa fa-refresh"></i>
                                        </button>

                                        <button 
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleRemove(booking.id)}
                                        >
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">No bookings found</td>
                            </tr>
                        )}
                    </tbody>

                </table>

            </div>
        </div>

        {/* BUTTON */}
        <div className="text-center mt-4">
            <button className="btn back-to-dash" onClick={() => navigate('/admin/dashboard')}>
            <i className='fa fa-chevron-left'></i> Dashboard
            </button>
        </div>

    </div>
);
};

export default ManageBookings;