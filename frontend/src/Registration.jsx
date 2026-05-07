import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Registration.css';
import axios from 'axios'; 

const Registration = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '', email: '', username: '', mobile: '',
        gender: '', dob: '', password: '', confirm: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => { 
        e.preventDefault();
        if (formData.password !== formData.confirm) {
            toast.error("Password and Confirm Password do not match!");
            return;
        }
        setLoading(true);
        try {
        const response = await axios.post("https://city-tourism-booking-guide.onrender.com/api/users/register", formData);
        toast.success(response.data);
        navigate("/login");
        } catch (error) {
              console.error("Error:", error);
            toast.error("Unable to save. The server might be slow, try again.");
            setLoading(false);
    }
    };

    return (
        <div className="registration-page">
            {/* Loading Overlay */}
            {loading && (
                <div className="loader-overlay">
                    <div className="spinner"></div>
                    <p className="loader-text">Registering you ! Keep patience. 🏛️</p>
                </div>
            )}

            <div className={`registration-card-wrapper ${loading ? 'blur' : ''}`}></div>

            <div className="reg-hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/assets/img/mahotsav.jpg')` }}>
                <div className="hero-text text-center w-100 mt-5">
                    <h1>WELCOME TO LUCKNOW TOURISM!</h1>
                    <h3>"City of Nawabs"</h3>
                </div>
            </div>

            <div className="container regi-cont d-flex justify-content-center">
                <div className="registration-card p-4">
                    <div className="text-center">
                        <h2 className="form-title">Registration Form</h2>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="mt-3">
                        <div className="mb-3">
                            <label htmlFor="name">Full Name : </label>
                            <input type="text" id="name" name="name" className="form-control" onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email">Email :</label>
                            <input type="email" id="email" name="email" className="form-control" onChange={handleChange} required/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="mobile">Mobile Number :</label>
                            <input maxLength="10" id="mobile" name="mobile" className="form-control" onChange={handleChange} required />
                        </div>

                         <div className="mb-3">
                            <label htmlFor="address">Address :</label>
                            <input type="text" id="address" name="address" className="form-control" onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="d-block mb-2">Gender :</label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="male" value="male" onChange={handleChange} />
                                <label className="form-check-label fix-label" htmlFor="male">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="female" value="female" onChange={handleChange} />
                                <label className="form-check-label fix-label" htmlFor="female">Female</label>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="dob">Date of Birth :</label>
                            <input type="date" id="dob" name="dob" className="form-control" onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password">Password :</label>
                            <input type="password" id="password" name="password" className="form-control" onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirm">Confirm Password :</label>
                            <input type="password" id="confirm" name="confirm" className="form-control" onChange={handleChange} required />
                        </div>

                        <div className="form-check mb-4">
                            <input type="checkbox" className="form-check-input" id="terms" required />
                            <label className="form-check-label" htmlFor="terms">I agree to the Terms & Conditions</label>
                        </div>

                        <button type="submit" className="btn-reg" disabled={loading}>{loading ?  "Processing" : "Register Now"}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;


