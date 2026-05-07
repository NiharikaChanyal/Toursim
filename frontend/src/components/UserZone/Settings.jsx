import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Settings.css';

const Settings = () => {
    const navigate = useNavigate();
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if(newPass !== confirmPass){
            toast.error("Password Mismatch!");
            return;
        }
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
         if(!loggedInUser) {
             toast.error("User not found, please login again.");
             return;
        }
        
        try {
        const res = await axios.put(`https://city-tourism-booking-guide.onrender.com/api/users/update-password/${loggedInUser.id}`, 
            { oldPassword: oldPass, newPassword: newPass }
        );

        toast.success("Password updated successfully! 🎉");
        setOldPass('');
        setNewPass('');
        setConfirmPass('');
    } catch(err) {
        toast.error(err.response?.data || "Error in updating password");
    }
        
    };

    return (
        <div className="settings-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="panel panel-default settings-panel">
                            <div className="panel-heading">
                                <h3 className="panel-title"><i className="fa fa-cog"></i> Account Settings</h3>
                            </div>
                            <div className="panel-body">
                                
                                {/* Change Password Section */}
                                <form onSubmit={handlePasswordChange}>
                                    <h4 className="section-title">Change Password</h4>
                                    <div className="form-group">
                                        <label>Current Password</label>
                                        <input 
                                            type="password" 
                                            className="form-control settings-input" 
                                            value={oldPass}
                                            onChange={(e) => setOldPass(e.target.value)}
                                            required/>
                                    </div>
                                    <div className="form-group">
                                        <label>New Password</label>
                                        <input 
                                            type="password" 
                                            className="form-control settings-input" 
                                            value={newPass}
                                            onChange={(e) => setNewPass(e.target.value)}
                                            required/>
                                    </div>
                                    <div className="form-group mb-4">
                                        <label>Confirm New Password</label>
                                        <input type="password" 
                                            className="form-control" 
                                            value={confirmPass}
                                            onChange={(e) => setConfirmPass(e.target.value)}
                                            required />
                                    </div>                                    

                                    <button type="submit" className="btn btn-custom no-move">
                                        Update Password
                                    </button>
                                </form>

                                <hr className='my-4' />

                                {/* Preferences Section */}
                                <h4 className="section-title">Preferences</h4>
                                <div className="pref-item">
                                    <span>Email Notifications</span>
                                    <input type="checkbox" defaultChecked />
                                </div>
                                <div className="pref-item">
                                    <span>Public Profile Visibility</span>
                                    <input type="checkbox" />
                                </div>

                                <button className="btn btn-outline-danger w-100" style={{width: '100%', borderRadius: '5px'}}
                                    onClick={() => toast.success("Deactivate request sent.")} >
                                    Deactivate Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back Button */}
            <button className="back-btn-fixed" onClick={() => navigate('/userdash')}>
                <i className="fa fa-arrow-left"></i> Back
            </button>
        </div>
    );
};

export default Settings;
