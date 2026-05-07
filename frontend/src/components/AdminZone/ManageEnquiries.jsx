import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ManageEnquiries.css'; 

const ManageEnquiries = () => {
    const navigate = useNavigate();
    const [enquiries, setEnquiries] = useState([]);

    const fetchEnquiries = async () => {
        try {
            const res = await axios.get("https://city-tourism-booking-guide.onrender.com/api/enquiries/all");
            setEnquiries(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const handleResponse = (enq) => {
        navigate("/admin/reply", { state: enq });
    };

    const deleteEnquiry = async (id) => {
        if (window.confirm("Delete this enquiry?")) {
            try {
                await axios.delete(`https://city-tourism-booking-guide.onrender.com/api/enquiries/delete/${id}`);
                setEnquiries(enquiries.filter(enq => enq.id !== id));
            } catch (err) {
                toast.error("Deletion failed");
            }
        }
    };

    return (
        <div className="admin-container">

            <h2 className="text-center">User Enquiries</h2>

            <div className="d-flex mb-2">
                <span className="badge bg-info text-dark">
                    Total: {enquiries.length}
                </span>
            </div>

            {/* ✅ CENTER TABLE */}
            <div className="d-flex justify-content-center">
                <div className="admin-card card shadow-sm mt-3">

                    <table className="table table-hover table-striped text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Subject</th>
                                <th>Message</th>
                                <th>Response</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {enquiries.length > 0 ? (
                                enquiries.map(enq => (
                                    <tr key={enq.id}>
                                        <td>#{enq.id}</td>

                                        <td>
                                            <strong>{enq.name}</strong><br />
                                            <small className="text-muted">{enq.email}</small>
                                        </td>

                                        <td>{enq.subject}</td>
                                        <td>{enq.message}</td>
                                        <td>{enq.response || "-"}</td>

                                        <td>
                                            <span className={`badge ${enq.status === 'New' ? 'bg-warning' : 'bg-info'}`}>
                                                {enq.status || 'Replied'}
                                            </span>
                                        </td>

                                        <td>
                                            <button className="btn btn-sm btn-outline-primary me-2" 
                                                onClick={() => handleResponse(enq)} title="Reply">
                                                <i className="fa fa-reply"></i>
                                            </button>
                                            <button 
                                                className="btn btn-sm btn-outline-danger" 
                                                onClick={() => deleteEnquiry(enq.id)}
                                                title="Delete"
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">No Data</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>

            {/* BUTTON */}
            <div className="text-center mt-4">
                <button className="btn back-to-dash" onClick={() => navigate("/admin/dashboard")}>
                  <i className='fa fa-chevron-left'></i> Dashboard
                </button>
            </div>

        </div>
    );
};

export default ManageEnquiries;