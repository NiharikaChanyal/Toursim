import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <>
            <footer className="main-footer">
                <div className="container">
                    <div className="row">
                        {/* About Lucknow */}
                        <div className="col-md-4 mb-4 text-left">
                            <h3 className="footer-heading"><i>About Lucknow</i></h3>
                            <p className="footer-text">
                                Lucknow "City of Nawabs" is well-known for its culture, heritage, monuments 
                                & hospitality and world renowned as "Awadhi Cuisine".
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="col-md-4 mb-4 text-left">
                            <h3 className="footer-heading"><i>Quick links</i></h3>
                            <ul className="list-unstyled footer-links">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/packages">Packages</Link></li>
                                <li><Link to="/about">Top Destinations</Link></li>
                                <li><Link to="/about">Food & Cuisine</Link></li>
                                <li><Link to="/gallery">Photo Gallery</Link></li>
                                <li><Link to="/contact">Contact Us</Link></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="col-md-4 mb-4 text-left">
                            <h3 className="footer-heading"><i>Contact</i></h3>
                            <div className="contact-info">
                                <p><i className="fa fa-map-marker"></i> Hazratganj, Lucknow, Uttar Pradesh</p>
                                <p><i className="fa fa-envelope"></i> info@lucknowuptourism.com</p>
                                <p><i className="fa fa-phone"></i> +91 9000000009</p>
                            </div>
                            <div className="social-icons mt-3">
                                <a href="#"><i className="fa fa-facebook"></i></a>
                                <a href="#"><i className="fa fa-instagram"></i></a>
                                <a href="#"><i className="fa fa-twitter"></i></a>
                                <a href="#"><i className="fa fa-youtube"></i></a>
                                <a href="#"><i className="fa fa-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <footertag className="text-center" style={{marginTop: '-30px',height: '30px', padding:'20px' 
                     ,background: 'linear-gradient(135deg, #43cea2, #185a9d)', position:'fixed' ,bottom: '0',left:'0',right:'0', width: '100%'}}>
    <p style={{color: 'whitesmoke', fontWeight: 'light'}}>&copy; 2026 Lucknow Tourism | All Rights Reserved</p>
  </footertag>
        </>
    );
};

export default Footer;