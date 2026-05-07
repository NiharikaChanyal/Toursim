import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './AdminProfile.css';

const Profile = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    const savedUser = JSON.parse(localStorage.getItem("user"));
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        mobile: "",
        address: "",
        profilePic: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    });

   //const userEmail = savedUser ? savedUser.email : null;
    useEffect(() => {
    if (!savedUser) {
        navigate("/login");
        return;
    }

    axios.get(`https://city-tourism-booking-guide.onrender.com/api/users/${savedUser.id}`)
    .then(res => {
        setUserData(prevState => ({
            ...prevState, // previous data
            name: res.data.name || "",
            email: res.data.email || "",
            mobile: res.data.mobile || "", 
            address: res.data.address || ""
        }));
    })
    .catch(err => console.log("Profile fetch error:", err));
}, []);

const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
};
   
   const handleSave = async () => {
    try {
        await axios.put(`https://city-tourism-booking-guide.onrender.com/api/users/update/${savedUser.id}`, userData);
        setIsEditing(false);
        toast.success("Profile Updated Permanently! ✅");
        
        // LocalStorage update with new name AND mobile
        localStorage.setItem("user", JSON.stringify({ 
            ...savedUser, 
            name: userData.name,
            mobile: userData.mobile 
        }));
    } catch (err) {
        toast.error("Update failed!");
        console.error(err);
    }
};
    return (
      
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-img-section">
                        <img src={userData.profilePic} alt="User Profile" />
                        <button className="edit-pic-btn"><i className="fa fa-camera"></i></button>
                    </div>
                    
                    {isEditing ? (
                        <input className="edit-input-name"name="name" 
                            value={userData.name} onChange={handleChange} />
                    ) : (
                        <h2>{userData.name}</h2>
                    )}
                    <p className="member-tag">Member Since: {userData.memberSince}</p>
                </div>

                <div className="profile-details-grid">
                    <div className="detail-item">
                        <label><i className="fa fa-envelope"></i> Email Address</label>
                        <p>{userData.email}</p> {/* Email usually non-editable */}
                    </div>
                    
                    <div className="detail-item">
                        <label><i className="fa fa-phone"></i> Phone Number</label>
                        {isEditing ? (
                            <input name="mobile" value={userData.mobile} onChange={handleChange} className="form-control" />
                        ) : (
                            <p>{userData.mobile}</p>
                        )}
                    </div>

                    <div className="detail-item">
                        <label><i className="fa fa-map-marker"></i> Location</label>
                        {isEditing ? (
                            <input name="address" value={userData.address} onChange={handleChange} className="form-control" />
                        ) : (
                            <p>{userData.address}</p>
                        )}
                    </div>
                </div>

                <div className="profile-actions">
                    {isEditing ? (
                        <button className="btn-save-profile" onClick={handleSave}>Save Changes</button>
                    ) : (
                        <button className="btn-edit-profile" onClick={() => setIsEditing(true)}>Edit Profile</button>
                    )}
                    
                    <button className="btn-logout-alt" onClick={() => {
                        localStorage.clear();navigate("/login");}}>Logout</button>
                </div>
            </div>
            <button className="back-to-dash " style={{background: '#2c3e50', color: 'white', border:' none'}} onClick={() => navigate('/admin/dashboard')}>
                <i className="fa fa-chevron-left"></i> Dashboard
            </button>
        </div>
    );
};

export default Profile;