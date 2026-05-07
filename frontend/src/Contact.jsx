import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Backend API call
            const response = await axios.post("https://city-tourism-booking-guide.onrender.com/api/enquiries/send", formData);
            
            if(response.status === 200) {
                toast.success("Message Sent Successfully! We will contact you soon.");
                setFormData({ name: '', email: '', subject: '', message: '' }); // Form clear karein
            }
        } catch (error) {
            console.error("Error sending enquiry:", error);
            toast.error("Failed to send message.");
        }
        
    };

    return (
        <div className="contact-page">
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card contact-card shadow-lg border-0">
                            <div className="card-header contact-header"><h3 style={{fontFamily:'serif',fontWeight:'bold'}} className="mb-0">Contact Us</h3></div>
                            <div className="card-body">

                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-4">
                                                <label htmlFor="name" className="form-label">Name:</label>
                                                <input type="text" className="form-control custom-input" id="name"name="name" 
                                                placeholder="Enter your name" onChange={handleChange} required />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="email" className="form-label">Email:</label>
                                                <input type="email" className="form-control custom-input" id="email" name="email" 
                                                    placeholder="Enter your email"onChange={handleChange}  />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="subject" className="form-label">Subject:</label>
                                                <input type="text" className="form-control custom-input" id="subject" name="subject" 
                                                    placeholder="Enter enquiry subject" onChange={handleChange} required  />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-4 h-100 d-flex flex-column">
                                                <label htmlFor="message" className="form-label">Message:</label>
                                                <textarea className="form-control custom-input flex-grow-1" id="message" name="message" rows="7" 
                                                    placeholder="Write your message or enquiry here" onChange={handleChange}required>
                                                </textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center mt-4">
                                        <button type="submit" className="btn btn_custom px-5 py-2">Enquiry Now</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;