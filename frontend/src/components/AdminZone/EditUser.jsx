import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditUser = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    
    const [userToEdit, setUserToEdit] = useState(location.state?.userData || {
        name: "", mobile: "", address: "", email: ""
    });

    const handleChange = (e) => {
        setUserToEdit({ ...userToEdit, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://city-tourism-booking-guide.onrender.com/api/users/update/${id}`, userToEdit);
            toast.success("User Details Updated Successfully! ✅");
            navigate("/admin/users"); 
        } catch (err) {
            toast.error("Update failed!");
        }
    };

return    (
    <div className="edit-user-wrapper"> 
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg border-0" style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className="text-center mb-4" style={{ color: '#2c3e50', fontWeight: 'bold' }}>
                    Edit User Details
                </h2>
                
                <div className="mb-3">
                    <label className="form-label">User Email </label>
                    <input type="text" className="form-control bg-light" value={userToEdit.email} disabled />
                </div>

                <div className="mb-3">
                    <label>Full Name</label>
                    <input type="text" name="name" className="form-control" value={userToEdit.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label>Mobile Number</label>
                    <input type="text" name="mobile" className="form-control" value={userToEdit.mobile} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label>Address</label>
                    <textarea name="address" className="form-control" value={userToEdit.address} onChange={handleChange}></textarea>
                </div>


                <div className="d-flex gap-3 mt-4">
                    <button className="btn btn-success w-100 py-2" onClick={handleUpdate}>Update User</button>
                    <button className="btn btn-danger w-100 py-2" onClick={() => navigate("/admin/users")}>Cancel</button>
                </div>
            </div>
        </div>
    </div>
);
};

export default EditUser;
