import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const ReplyEnquiry = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Data fetch from enquiry list
    const { id, email, name, message } = location.state || {}; 

    const [reply, setReply] = useState("");

    const sendReply = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://city-tourism-booking-guide.onrender.com/api/enquiries/reply/${id}`, 
                { reply : reply }, { headers : {'Content-Type' : 'application/json' }}
            
            );
            toast.success("Reply sent successfully!");
            navigate("/admin/enquiries"); 
        } catch (err) {
            toast.error("Error in sending reply!");
        }
    };

    return (
        <div className="container mt-5" style={{maxWidth: '600px'}}>
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h4>Reply to: {name}</h4>
                </div>
                <div className="card-body">
                    <p><strong>User's Message:</strong> {message}</p>
                    <hr />
                    <form onSubmit={sendReply}>
                        <div className="mb-3">
                            <label className="form-label">To: {email}</label>
                            <textarea className="form-control" rows="5" placeholder="Write your reply here..."
                                value={reply} onChange={(e) => setReply(e.target.value)} required></textarea>
                        </div>
                        <button type="submit" className="btn btn-success w-100">Send Reply</button>
                        <button 
                            type="button" 
                            className="btn btn-secondary w-100 mt-2" 
                            onClick={() => navigate("/admin/enquiries")}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReplyEnquiry;