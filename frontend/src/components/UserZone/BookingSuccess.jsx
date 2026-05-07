import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingSuccess.css';

const BookingSuccess = () => {
    const navigate = useNavigate();

    // Random Booking ID
    const bookingId = Math.floor(Math.random() * 900000) + 100000;
    const today = new Date().toLocaleDateString();

    const handlePrint = () => {
        window.print(); 
    };

    return (
        <div className="success-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="success-card text-center shadow-lg p-5 border-0">
                            <div className="success-icon-animated mb-4">
                                <i className="fa fa-check-circle text-success" style={{fontSize: '80px'}}></i>
                            </div>
                            <h2 className="thank-you-title fw-bold">Booking Confirmed!</h2>
                            <p className="success-msg text-muted">Aapki booking Lucknow Tourism ke saath confirm ho gayi hai.</p>
                            
                            <div className="booking-details-box my-4 p-4 rounded" style={{background: '#f8f9fa', border: '1px dashed #ccc'}}>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Booking ID:</span> <strong>#{bookingId}</strong>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Date:</span> <strong>{today}</strong>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Status:</span> <span className="badge bg-success">SUCCESS</span>
                                </div>
                                <hr />
                                <p className="small text-muted mb-0">Invoice copy has been sent to your email.</p>
                            </div>

                            <div className="success-actions d-grid gap-2">
                                <button className="btn btn-primary py-2" onClick={() => navigate('/bookings')}>
                                    <i className="fa fa-list"></i> View My Bookings
                                </button>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-outline-dark flex-grow-1" onClick={handlePrint}>
                                        <i className="fa fa-print"></i> Print Ticket
                                    </button>
                                    <button className="btn btn-outline-secondary flex-grow-1" onClick={() => navigate('/')}>
                                        <i className="fa fa-home"></i> Back to Home
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingSuccess;